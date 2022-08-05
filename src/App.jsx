import * as Tone from 'tone'
import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { displayForm } from './reducers/sectionReducer'
import { addTimeArray, addTimeArrayNonPoly, changeStatus, togglePlaying, clear } from './reducers/clickTimesReducer'
import clicktrackService from './services/clicktracks'
import makeBpmArray from './utils/tempoCurveCalculator'
import SectionList from './components/SectionList'
import SectionForm from './components/forms/SectionForm/SectionForm'
import SampleChoices from './components/SampleChoices'
import Result from './components/Result'
import { toggleHelp } from './reducers/uiReducer'
import HelpIcon from './components/HelpIcon'
// import TestingZone from './components/TestingZone'
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

	const strongPlayer = new Tone.Player().toDestination()
	const weakPlayer = new Tone.Player().toDestination()
	const secondaryPlayer = new Tone.Player().toDestination()

	const buildClickTrackSection = (sectionData, startTime, isPolyrhythmic) => {
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
		if (isPolyrhythmic) {
			console.log('About to dispatch to poly array')
			dispatch(addTimeArray(clickTimeArray))
		} else {
			console.log('About to dispatch to non - poly array')
			dispatch(addTimeArrayNonPoly(clickTimeArray))
		}
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

		// Will need to do things differently if a second instrument is selected

		if (selectedSamples.length === 1) {
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

			dispatch(addTimeArray(clickTimeArray))
		} else if (selectedSamples.length === 2) {
			// For now downbeat will always be false, but need to figure out way of playing both samples at same time when they sync
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

			console.log('combinedArray', combinedArray)

			dispatch(addTimeArray(combinedArray))
		}
		return endTime
	}

	const buildClickTrackWithPolyrhythms = () => {
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
				const endTime = buildClickTrackSection(sections[i], startTime, true)
				startTime = endTime
			}
		}
	}

	// This is necessary for the midi processing to work in the backend
	// Could also be used for building click tracks in general if we detect that they contain
	// no polyrhythms
	const buildClickTrackWithoutPolyrhythms = () => {
		let startTime = 0
		for (let i = 0; i < sections.length; i++) {
			// Todo add isPolyrhythmic arg to buildClickTrackSection function so that it knows which
			// piece of state to dispatch to
			const endTime = buildClickTrackSection(sections[i], startTime, false)
			startTime = endTime
		}
	}

	const playClickTrack = async (times) => {
		let strongSampleUrl
		let weakSampleUrl

		//Check if there are polyrhythms and a second instrument has been chosen
		const numPolySections = sections.map(s => s.secondaryNumBeats).filter(snb => snb).length
		if (numPolySections && selectedSamples[1]) {
			strongSampleUrl = selectedSamples[0].strong.url
			weakSampleUrl = selectedSamples[0].weak.url
			const secondarySampleUrl = selectedSamples[1].strong.url
			await secondaryPlayer.load(secondarySampleUrl)
		} else {
			strongSampleUrl = selectedSamples[0].strong.url
			weakSampleUrl = selectedSamples[1] ? selectedSamples[1].strong.url : selectedSamples[0].weak.url
		}

		await strongPlayer.load(strongSampleUrl)
		await weakPlayer.load(weakSampleUrl)

		Tone.start()
		dispatch(togglePlaying())
		console.log('times',times)
		times.map(t => {
			return { ...t, time: t.time + Tone.now() }
		}).forEach(click => {
			if (click.downBeat) {
				strongPlayer.start(click.time)
			} else {
				if (click.secondInstrument) {
					secondaryPlayer.start(click.time)
				} else {
					weakPlayer.start(click.time)
				}
			}
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
			{/* <TestingZone /> */}
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
				<Result playClickTrack={playClickTrack} buildClickTrack={() => {
					dispatch(clear())
					buildClickTrackWithPolyrhythms()
					buildClickTrackWithoutPolyrhythms()
					dispatch(changeStatus('ready'))
				}}/>
			</div>
		</>
	)
}

export default App
