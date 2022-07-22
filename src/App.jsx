import * as Tone from 'tone'
import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { displayForm } from './reducers/sectionReducer'
import { addTimeArray, changeStatus, togglePlaying, clear } from './reducers/clickTimesReducer'
import clicktrackService from './services/clicktracks'
import makeBpmArray from './utils/tempoCurveCalculator'
import SectionList from './components/SectionList'
import SectionForm from './components/forms/SectionForm'
import SampleDisplay from './components/SampleDisplay'
import DownloadLink from './components/DownloadLink'
import Guidance from './components/Guidance'
import SampleSelection from './components/forms/SampleSelection'

const App = () => {
	useEffect(() => {
		clicktrackService.startUp()
	}, [])

	const dispatch = useDispatch()
	const sections = useSelector(state => state.sections.sectionList)
	const formInfo = useSelector(state => state.sections.form)
	const clickTimes = useSelector(state => state.clickTimes.clickTimes)
	const status = useSelector(state => state.clickTimes.status)
	const playing = useSelector(state => state.clickTimes.playing)
	const selectedSamples = useSelector(state => state.samples.samples)
	const showSampleForm = useSelector(state => state.samples.showSampleForm)

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

	const buildClickTrack = () => {
		dispatch(clear())
		let startTime = 0
		for (let i = 0; i < sections.length; i++) {
			const endTime = buildClickTrackSection(sections[i], startTime)
			startTime = endTime
		}
		dispatch(changeStatus('ready'))
	}

	const playClickTrack = async (times) => {
		const strongSampleUrl = JSON.parse(selectedSamples.strong).url
		const weakSampleUrl = JSON.parse(selectedSamples.weak).url

		console.log('sample urls', strongSampleUrl, weakSampleUrl)
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
			<Guidance />
			{showSampleForm
				? <SampleSelection />
				: null
			}
			<SampleDisplay />
			<div inert={playing ? 'true' : undefined}>
				<button onClick={() => showFormHere(0, 'create')}>Add to start</button>
				{formInfo.location === 0
					? <>
						<SectionForm hideSelf={() => hideForm('create')}/>
						<button onClick={() => hideForm('create')}>cancel</button>
					</>
					: null
				}
				<SectionList showFormHere={showFormHere} hideForm={hideForm}/>
				<div className='med-top-margin'>
					{sections.length
						? status === 'ready'
							?	<>
								<button onClick={() => playClickTrack(clickTimes)}>Play click track</button>
								<DownloadLink getFile={clicktrackService.getWav} fileFormat={'wav'}/>
								<DownloadLink getFile={clicktrackService.getMidi} fileFormat={'midi'}/>
							</>
							:   <button onClick={buildClickTrack}>{status === 'not_created'
								? 'Create click track'
								: 'Update click track'}
							</button>
						: null
					}
				</div>

			</div>
		</>
	)
}

export default App
