import makeBpmArray from './tempoCurveCalculator'
import { addTimeArray, addTimeArrayNonPoly } from '../reducers/clickTimesReducer'

export const combineTimeArrays = (timeArrays, numInstruments) => {
	if (numInstruments === 1) {
		// Combine the two time arrays into one
		const combinedArray = timeArrays
			.reduce((a, b) => a.concat(b))
			.sort((a, b) => a - b)
			// Round off the numbers to prevent weird floating point imprecisions
			.map(time => Math.round(time * 10 ** 6) / 10 ** 6)
			.filter(t => !isNaN(t)) // Remove the NaN weirdness from the end

		// Instead just delete duplicates
		const clickTimeArrayWithDuplicates = combinedArray.map((time, idx) => {
			// Check if time is equal to the next time
			if (idx < combinedArray.length - 1 && time === combinedArray[idx + 1]) {
				return JSON.stringify({ time, downBeat: true })
			}

			// Check if time is equal to previous time
			if (idx > 0 &&  time === combinedArray[idx - 1]) {
				return JSON.stringify({ time, downBeat: true })
			}

			return JSON.stringify({ time, downBeat: false })
		})

		const clickTimeArray = [... new Set(clickTimeArrayWithDuplicates)]
			.map(ct => JSON.parse(ct))
		return clickTimeArray

	} else if (numInstruments === 2) {
		const strongClickArray = timeArrays[0].map(time => {
			return { time, secondInstrument: false, downBeat: false }
		})
		const weakClickArray = timeArrays[1].map(time => {
			return { time, secondInstrument: true, downBeat: false }
		})
		const combinedArray = [strongClickArray, weakClickArray]
			.reduce((a, b) => a.concat(b))
			.sort((a, b) => a.time - b.time)
		// Round off the numbers to prevent weird floating point imprecisions
			.map(click => {
				return { ...click, time: Math.round(click.time * 10 ** 6) / 10 ** 6 }
			})
			.filter(click => !isNaN(click.time)) // Remove the NaN weirdness from the end
		// Add 0.00001 to the times of all downbeats on the second instrument, to prevent
		// ToneJS from throwing an error
			.map((click, idx, arr) => {
				if (idx > 0 && click.time === arr[idx -1].time) {
					return { ...click, time: click.time + 0.00001 }
				}
				return click
			})

		return combinedArray
	}
}

export const buildClickTrackSection = (sectionData, startTime, isPolyrhythmic, dispatch) => {
	const bpmArray = makeBpmArray(sectionData)
	const intervalArray = bpmArray.map(bpm => 60/bpm)
	const timeArray = intervalArray.map((_interval, idx) => {
		return idx > 0
			? startTime + intervalArray.slice(0, idx).reduce((a, b) => a + b)
			: startTime
	})
	const accentArray = sectionData.accentedBeats
	const endTime = timeArray[timeArray.length - 1] //Last entry of the timeArray
	const clickTimeArray = timeArray
		.slice(0, timeArray.length -1)
		.map((time, idx) => (
			accentArray.includes(idx % sectionData.numBeats)
				? { time, bpm: bpmArray[idx], downBeat: true }
				: { time, bpm: bpmArray[idx], downBeat: false }
		))
	if (isPolyrhythmic) {
		console.log('About to dispatch to poly array')
		dispatch(addTimeArray(clickTimeArray))
	} else {
		console.log('About to dispatch to non - poly array')
		dispatch(addTimeArrayNonPoly(clickTimeArray))
	}
	return endTime
}

export const makePolyrhythmTimeArrays = (sectionDatas, startTime) => {
	// sectionDatas is an array of rhythms, with sectionDatas[0] being the primary rhythm
	const bpmArrays = sectionDatas.map(sd => makeBpmArray(sd))
	const intervalArrays = bpmArrays.map(bpma => bpma.map(bpm => 60/bpm))
	const timeArrays = intervalArrays.map(ia => ia.map((interval, idx) => {
		return idx > 0
			? startTime + ia.slice(0, idx).reduce((a, b) => a + b)
			: startTime
	}))

	// Slightly adjust the second time array so that downbeats properly line up with
	// the first
	for (let i=0; i < timeArrays[1].length; i += sectionDatas[1].numBeats) {
		const secondaryDownBeat = timeArrays[1][i]
		const primaryDownBeat = timeArrays[0][(i / sectionDatas[1].numBeats) * sectionDatas[0].numBeats]
		const difference = primaryDownBeat - secondaryDownBeat
		if (difference) {
			for (let j=i; j < i + sectionDatas[1].numBeats - 1; j++) {
				timeArrays[1][j] += difference
			}
		}
	}
	return timeArrays
}