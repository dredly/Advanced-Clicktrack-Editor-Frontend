
import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { displayForm } from './reducers/sectionReducer'
import { addTimeArray, changeStatus, clear } from './reducers/clickTimesReducer'
import clicktrackService from './services/clicktracks'
import SectionList from './components/SectionList'
import SectionForm from './components/forms/SectionForm/SectionForm'
import SampleChoices from './components/SampleChoices'
import Result from './components/Result'
import { toggleHelp } from './reducers/uiReducer'
import HelpIcon from './components/HelpIcon'
// import TestingZone from './components/TestingZone'
import { addToStartHelp } from './utils/helpText'
import { combineTimeArrays, buildClickTrackSection, makePolyrhythmTimeArrays } from './utils/clickTrackProcessing'

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

	const buildPolyrhythmicSection = (sectionDatas, startTime) => {

		const timeArrays = makePolyrhythmTimeArrays(sectionDatas, startTime)

		// Last entry of the first time array, since it is the primary rhythm
		const endTime = timeArrays[0][timeArrays[0].length - 1]

		// Remove the last entry of each timeArray
		timeArrays.forEach((ta, idx) => {
			ta.pop()
			const expectedLength = sectionDatas[idx].numMeasures * sectionDatas[idx].numBeats
			if (ta.length > expectedLength) {
				const lengthDiff = ta.length - expectedLength
				ta.splice(ta.length - lengthDiff, lengthDiff)
			}
		})

		// Combine the 2 time arrays together, slightly differently depending on whether they wil
		// be played by 1 or 2 instruments
		if (selectedSamples.length === 1) {
			const timeArray = combineTimeArrays(timeArrays, 1)
			dispatch(addTimeArray(timeArray))
		} else if (selectedSamples.length === 2) {
			const timeArray = combineTimeArrays(timeArrays, 2)
			dispatch(addTimeArray(timeArray))
		}
		return endTime
	}

	const buildClickTrackWithPolyrhythms = (samples) => {
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
				const endTime = buildPolyrhythmicSection([sectionData1, sectionData2], startTime, samples)
				startTime = endTime
			} else {
				const endTime = buildClickTrackSection(sections[i], startTime, true, dispatch)
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
			const endTime = buildClickTrackSection(sections[i], startTime, false, dispatch)
			startTime = endTime
		}
	}

	const showFormHere = (location, type) => {
		dispatch(displayForm({ location, type }))
	}

	const hideForm = type => {
		dispatch(displayForm({ location: NaN, type }))
	}

	const buildClickTrack = () => {
		dispatch(clear())
		buildClickTrackWithPolyrhythms()
		buildClickTrackWithoutPolyrhythms()
		dispatch(changeStatus('ready'))
	}

	console.log('selectedSamples', selectedSamples)

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
				<SampleChoices rebuild={buildClickTrack}/>
				<Result buildClickTrack={buildClickTrack}/>
			</div>
		</>
	)
}

export default App
