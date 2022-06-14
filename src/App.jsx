import * as Tone from 'tone'
import { useSelector, useDispatch } from 'react-redux'
import { displayForm, deleteSection } from './reducers/sectionReducer'
import SectionForm from './components/SectionForm'
import SectionDisplay from './components/SectionDisplay'


const App = () => {
	const dispatch = useDispatch()
	const sections = useSelector(state => state.sections.sectionList)
	const createFormLocation = useSelector(state => state.sections.createFormLocation)
	const editFormLocation = useSelector(state => state.sections.editFormLocation)

	const woodblock1 = new Tone
		.Player('https://res.cloudinary.com/doemj9gq6/video/upload/v1651427128/Samples/Woodblock_oogia1.wav')
		.toDestination()

	const woodblock2 = new Tone
		.Player('https://res.cloudinary.com/doemj9gq6/video/upload/v1651427128/Samples/Woodblock_oogia1.wav')
		.toDestination()

	woodblock2.volume.value = -8

	const playClicktrackSection = sectionData => {
		const numMeasures = sectionData.numMeasures
		const beatsPerMeasure = sectionData.numBeats
		const endTime = Tone.Time('4n').toSeconds() * numMeasures * beatsPerMeasure
		const loop = new Tone.Loop(time => {
			const currentBeats = Tone.Time(time).toBarsBeatsSixteenths().split(':')[1]
			// Play the louder version of the sound on the first beat of each measure
			if (Number(currentBeats) === 0) {
				woodblock1.start(time)
			} else {
				woodblock2.start(time)
			}
		}, '4n').start(0).stop(endTime)
		return {
			loop,
			startTime: 0,
			endTime
		}
	}

	const playClickTrack = () => {
		Tone.start()
		const section1 = playClicktrackSection(sections[0])
		console.log(section1)
	}

	const showFormHere = (location, type) => {
		dispatch(displayForm({ location, type }))
	}

	const hideForm = type => {
		dispatch(displayForm({ location: NaN, type }))
	}

	const handleDelete = idx => {
		dispatch(deleteSection(idx))
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
			{/* Play just the first section for now to test */}
			<button onClick={playClickTrack}>Play</button>
		</>
	)
}

export default App
