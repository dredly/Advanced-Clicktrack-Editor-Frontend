import * as Tone from 'tone'
import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { displayForm } from './reducers/sectionReducer'
import { addTimeArray, changeStatus, togglePlaying, clear } from './reducers/clickTimesReducer'
import clicktrackService from './services/clicktracks'
import makeBpmArray from './utils/tempoCurveCalculator'
import SectionList from './components/SectionList'
import SectionForm from './components/forms/SectionForm/SectionForm'
import SampleChoices from './components/SampleChoices'
import Result from './components/Result'
import { toggleHelp } from './reducers/uiReducer'
import HelpIcon from './components/HelpIcon'
import { addToStartHelp } from './utils/helpText'

const App = () => {
	useEffect(() => {
		clicktrackService.startUp()
	}, [])

	const dispatch = useDispatch()
	const sections = useSelector(state => state.sections.sectionList)
	const formInfo = useSelector(state => state.sections.form)
	const playing = useSelector(state => state.clickTimes.playing)
	const selectedSamples = useSelector(state => state.samples.samples)
	const showHelp = useSelector(state => state.ui.showHelp)

	const strongPlayer = new Tone
		.Player()
		.toDestination()

	const weakPlayer = new Tone
		.Player()
		.toDestination()

	const buildClickTrackSection = (sectionData, startTime) => {
		const bpmArray = makeBpmArray(sectionData)
		const intervalArray = bpmArray.map(bpm => 60/bpm)
		const timeArray = intervalArray.map((interval, idx) => {
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
		dispatch(addTimeArray(clickTimeArray))
		return endTime
	}

	const buildPolyrhythmicSection = (sectionDatas, startTime) => {
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

		console.log('time arrays', timeArrays)

		// Last entry of the first time array, since it is the primary rhythm
		const endTime = timeArrays[0][timeArrays[0].length - 1]
		console.log('endTime', endTime)

		// Remove the last entry of each timeArray
		timeArrays.forEach((ta, idx) => {
			ta.pop()
			const expectedLength = sectionDatas[idx].numMeasures * sectionDatas[idx].numBeats
			if (ta.length > expectedLength) {
				const lengthDiff = ta.length - expectedLength
				ta.splice(ta.length - lengthDiff, lengthDiff)
			}
		})

		// TODO: If either array is longer than expected cut off the extra elements
		// -> May not need to filter out the NaNs in next step?

		// Combine the two time arrays into one
		// This solution should work for wav, but will need different solution for midi
		const combinedArray = timeArrays
			.reduce((a, b) => a.concat(b))
			.sort((a, b) => a - b)
			// Round off the numbers to prevent weird floating point imprecisions
			.map(time => Math.round(time * 10 ** 6) / 10 ** 6)
			.filter(t => !isNaN(t)) // Remove the NaN weirdness from the end

		console.log('combinedArray', combinedArray)

		// Instead just delete duplicates
		const clickTimeArrayWithDuplicates = combinedArray.map((time, idx) => {
			// Check if time is equal to the next time
			if (idx < combinedArray.length - 1 && time === combinedArray[idx + 1]) {
				return JSON.stringify({ time, downBeat: true })
			}

			// Check if time is equal to previous time
			if (idx > 0 &&  time === combinedArray[idx - 1]) {
				// Add a tiny increment to the time so that ToneJS does not throw an error
				// from being asked to play two notes perfectly simultaneously
				return JSON.stringify({ time, downBeat: true })
			}

			return JSON.stringify({ time, downBeat: false })
		})

		const clickTimeArray = [... new Set(clickTimeArrayWithDuplicates)]
			.map(ct => JSON.parse(ct))

		console.log('clickTimeArray', clickTimeArray)

		dispatch(addTimeArray(clickTimeArray))
		return endTime
	}

	const buildClickTrack = () => {
		dispatch(clear())
		let startTime = 0
		for (let i = 0; i < sections.length; i++) {
			if (sections[i].secondaryBpm) {
				const sectionData1 = {
					numMeasures: sections[i].numMeasures,
					numBeats: sections[i].numBeats,
					meanTempoCondition: sections[i].meanTempoCondition,
					bpm: sections[i].bpm,
					bpmEnd: sections[i].bpmEnd,
				}
				const sectionData2 = {
					...sectionData1,
					numBeats: sections[i].secondaryNumBeats,
					bpm: sections[i].secondaryBpm,
					bpmEnd: sections[i].secondaryBpmEnd
				}
				const endTime = buildPolyrhythmicSection([sectionData1, sectionData2], startTime)
				startTime = endTime
			} else {
				const endTime = buildClickTrackSection(sections[i], startTime)
				startTime = endTime
			}
		}
		dispatch(changeStatus('ready'))
	}

	const playClickTrack = async (times) => {
		const strongSampleUrl = selectedSamples.strong.url
		const weakSampleUrl = selectedSamples.weak.url

		await strongPlayer.load(strongSampleUrl)
		await weakPlayer.load(weakSampleUrl)

		Tone.start()
		dispatch(togglePlaying())
		times.map(t => {
			return { ...t, time: t.time + Tone.now() }
		}).forEach(click => {
			if (click.downBeat) {
				strongPlayer.start(click.time)
			} else weakPlayer.start(click.time)
		})
		const bpmAtEnd = sections[sections.length - 1].bpm
		const finalInterval = 60 / bpmAtEnd
		const finalTime = times[times.length - 1].time
		setTimeout(() => {
			dispatch(togglePlaying())
		}, (finalTime + finalInterval) * 1000) //Convert to ms
	}

	const showFormHere = (location, type) => {
		dispatch(displayForm({ location, type }))
	}

	const hideForm = type => {
		dispatch(displayForm({ location: NaN, type }))
	}

	return (
		<>
			<div className="med-top-margin">
				<button onClick={() => dispatch(toggleHelp())}>
					{showHelp ? 'Hide help tooltips' : 'Show help tooltips'}
				</button>
			</div>
			<div className='med-top-margin' inert={playing ? 'true' : undefined}>
				<button onClick={() => showFormHere(0, 'create')}>Add to start</button>
				{(showHelp
					? <HelpIcon content={addToStartHelp}/>
					: null
				)}
				{formInfo.location === 0
					? <>
						<SectionForm hideSelf={() => hideForm('create')}/>
						<button onClick={() => hideForm('create')}>cancel</button>
					</>
					: null
				}
				<SectionList showFormHere={showFormHere} hideForm={hideForm}/>
				<SampleChoices />
				<Result playClickTrack={playClickTrack} buildClickTrack={buildClickTrack}/>
			</div>
		</>
	)
}

export default App
