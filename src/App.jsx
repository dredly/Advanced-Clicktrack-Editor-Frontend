import * as Tone from 'tone'
import { useSelector, useDispatch } from 'react-redux'
import { displayForm, deleteSection } from './reducers/sectionReducer'
import { addTimeArray, changeStatus, clear } from './reducers/clickTimesReducer'
import SectionForm from './components/SectionForm'
import SectionDisplay from './components/SectionDisplay'


const App = () => {
	const dispatch = useDispatch()
	const sections = useSelector(state => state.sections.sectionList)
	const createFormLocation = useSelector(state => state.sections.createFormLocation)
	const editFormLocation = useSelector(state => state.sections.editFormLocation)
	const clickTimes = useSelector(state => state.clickTimes.clickTimes)
	const status = useSelector(state => state.clickTimes.status)

	const woodblock1 = new Tone
		.Player('https://res.cloudinary.com/doemj9gq6/video/upload/v1651427128/Samples/Woodblock_oogia1.wav')
		.toDestination()

	const woodblock2 = new Tone
		.Player('https://res.cloudinary.com/doemj9gq6/video/upload/v1651427128/Samples/Woodblock_oogia1.wav')
		.toDestination()

	woodblock2.volume.value = -8

	const buildClickTrackSection = (sectionData, startTime) => {
		console.log('SECTION DATA', sectionData)
		const numNotes = sectionData.numMeasures * sectionData.numBeats
		const bpmIncrement = (sectionData.bpmEnd - sectionData.bpm) / numNotes
		const bpmArray = Array.from({ length: numNotes + 1 }, (x, i) => {
			return Number(sectionData.bpm) + i * bpmIncrement
		})
		const intervalArray = bpmArray.map(bpm => 60/bpm)
		const timeArray = intervalArray.map((interval, idx) => {
			return idx > 0
				? startTime + intervalArray.slice(0, idx).reduce((a, b) => a + b)
				: startTime
		})
		console.log('START TIME', startTime)
		console.log('BPM ARRAY', bpmArray)
		console.log('INTERVAL ARRAY', intervalArray)
		console.log('TIME ARRAY', timeArray)
		const endTime = timeArray[timeArray.length - 1] //Last entry of the timeArray
		const clickTimeArray = timeArray
			.slice(0, timeArray.length -1)
			.map((time, idx) => (
				idx % sectionData.numBeats === 0
					? { time, downBeat: true }
					: { time }
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
		console.log('times', times)
		times.map(t => {
			return { ...t, time: t.time + Tone.now() }
		}).forEach(click => {
			if (click.downBeat) {
				woodblock1.start(click.time)
			} else woodblock2.start(click.time)
		})
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
			<button onClick={() => showFormHere(0, 'create')}>Add to start</button>
			{createFormLocation === 0
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
					formLocations={{ createFormLocation, editFormLocation }}
				/>
			)}
			<div className='med-top-margin'>
				{sections.length
					? status === 'ready'
						?	<>
							<button onClick={() => playClickTrack(clickTimes)}>Play click track</button>
							<button>Download click track</button>
						</>
						:   <button onClick={buildClickTrack}>{status === 'not_created'
							? 'Create click track'
							: 'Update click track'}
						</button>
					: null
				}
			</div>

		</>
	)
}

export default App
