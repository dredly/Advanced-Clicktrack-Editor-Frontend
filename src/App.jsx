import * as Tone from 'tone'
import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { displayForm, deleteSection } from './reducers/sectionReducer'
import { addTimeArray, changeStatus, togglePlaying, clear } from './reducers/clickTimesReducer'
import clicktrackService from './services/clicktracks'
import makeBpmArray from './utils/tempoCurveCalculator'
import SectionForm from './components/SectionForm'
import SectionDisplay from './components/SectionDisplay'
import SampleDisplay from './components/SampleDisplay'
import DownloadLink from './components/DownloadLink'
import Guidance from './components/Guidance'
import SampleSelection from './components/SampleSelection'

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

	const strongPlayer = new Tone
		.Player('https://res.cloudinary.com/doemj9gq6/video/upload/v1651427128/Samples/Woodblock_oogia1.wav')
		.toDestination()

	const weakPlayer = new Tone
		.Player('https://res.cloudinary.com/doemj9gq6/video/upload/v1651427128/Samples/Woodblock_oogia1.wav')
		.toDestination()

	weakPlayer.volume.value = -8

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
					? { time, downBeat: true }
					: { time, downBeat: false }
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

	const playClickTrack = (times) => {
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

	const handleDelete = idx => {
		dispatch(deleteSection(idx))
		dispatch(changeStatus('edited'))
	}

	return (
		<>
			<Guidance />
			<SampleSelection />
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
				{sections.map((section, idx) =>
					<SectionDisplay
						key={section.id}
						section={section}
						idx={idx}
						handlers={{ showFormHere, hideForm, handleDelete }}
					/>
				)}
				<div className='med-top-margin'>
					{sections.length
						? status === 'ready'
							?	<>
								<button onClick={() => playClickTrack(clickTimes)}>Play click track</button>
								<DownloadLink />
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
