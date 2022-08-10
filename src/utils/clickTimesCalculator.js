import makeBpmArray from './tempoCurveCalculator'

const buildClickTrackSection = (startTime, sectionData) => {
	const bpmArray = makeBpmArray(sectionData)
	const intervalArray = bpmArray.map(bpm => 60/bpm)
	const timeArray = intervalArray.map((_interval, idx) => {
		return idx > 0
			? startTime + intervalArray.slice(0, idx).reduce((a, b) => a + b)
			: startTime
	})
	const accentArray = sectionData.accentedBeats

	const endTime = timeArray[timeArray.length - 1] //Last entry of the timeArray

	const sectionTimeArray = timeArray
		.slice(0, timeArray.length -1)
		.map((time, idx) => (
			accentArray.includes(idx % sectionData.numBeats)
				? { time, bpm: bpmArray[idx], downBeat: true }
				: { time, bpm: bpmArray[idx], downBeat: false }
		))

	return { sectionTimeArray, endTime }
}

const makePolyrhythmTimeArrays = (sectionDatas, startTime) => {
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

const combineTimeArrays = timeArrays => {

	// Combine the two time arrays into one
	const combinedArray = timeArrays
		.reduce((a, b) => a.concat(b))
		.sort((a, b) => a - b)
		// Round off the numbers to prevent weird floating point imprecisions
		.map(time => Math.round(time * 10 ** 6) / 10 ** 6)
		.filter(t => !isNaN(t)) // Remove the NaN weirdness from the end

	// stringify the clickTime objects so that they can be compared and the duplicates
	// can be deleted. Downbeats are when the times of two clicks are the same, as this
	// means that the polyrhythms are lining up
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

	//Remove duplicates
	const clickTimeArray = [... new Set(clickTimeArrayWithDuplicates)]
		.map(ct => JSON.parse(ct))
	return clickTimeArray
}

const buildPolyrhythmicSection = (startTime, sectionData) => {
	const data1 = {
		numMeasures: sectionData.numMeasures,
		numBeats: sectionData.numBeats,
		meanTempoCondition: sectionData.meanTempoCondition,
		bpm: sectionData.bpm,
		bpmEnd: sectionData.bpmEnd,
	}
	const data2 = {
		...data1,
		numBeats: sectionData.secondaryNumBeats,
		bpm: sectionData.secondaryBpm,
		bpmEnd: sectionData.secondaryBpmEnd
	}
	const timeArrays = makePolyrhythmTimeArrays([data1, data2], startTime)

	// Last entry of the first time array, since it is the primary rhythm
	const endTime = timeArrays[0][timeArrays[0].length - 1]

	// Remove the last entry of each timeArray
	timeArrays.forEach((ta, idx) => {
		ta.pop()
		const expectedLength = [data1, data2][idx].numMeasures * [data1, data2][idx].numBeats
		if (ta.length > expectedLength) {
			const lengthDiff = ta.length - expectedLength
			ta.splice(ta.length - lengthDiff, lengthDiff)
		}
	})

	// Combine the 2 time arrays together
	const sectionTimeArray = combineTimeArrays((timeArrays))

	return { sectionTimeArray, endTime }
}

export const getClickTimesNonPoly = sections => {
	const clickTimesNonPoly = []
	let startTime = 0

	for (let i = 0; i < sections.length; i++) {
		const { sectionTimeArray, endTime } = buildClickTrackSection(startTime, sections[i])
		clickTimesNonPoly.push(...sectionTimeArray)
		startTime = endTime
	}

	return clickTimesNonPoly
}

export const getClickTimesPoly = sections => {
	const clickTimesPoly = []
	let startTime = 0

	for (let i = 0; i < sections.length; i++) {
		const { sectionTimeArray, endTime } = sections[i].secondaryNumBeats
			? buildPolyrhythmicSection(startTime, sections[i])
			: buildClickTrackSection(startTime, sections[i])
		clickTimesPoly.push(...sectionTimeArray)
		startTime = endTime
	}

	return clickTimesPoly
}