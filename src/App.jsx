import * as Tone from 'tone'
import { useSelector, useDispatch } from 'react-redux'
import { displayForm, deleteSection } from './reducers/sectionReducer'
import tempoChangeTime from './utils/tempoChangeTime'
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

	const playClicktrackSection = (sectionData, startTime) => {
		const bpm = sectionData.bpm
		const bpmEnd = sectionData.bpmEnd
		const numMeasures = sectionData.numMeasures
		const beatsPerMeasure = sectionData.numBeats
		const numNotes = numMeasures * beatsPerMeasure
		const endTime = startTime + tempoChangeTime(numNotes, bpm, bpmEnd)
		const loop = new Tone.Loop(time => {
			woodblock1.start(time)
		}, '4n').start(startTime).stop(endTime)
		return {
			loop,
			endTime,
			numMeasures,
			beatsPerMeasure,
			bpm,
			bpmEnd
		}
	}

	const playClickTrack = () => {
		Tone.start()
		const section1 = playClicktrackSection(sections[0], 0)
		Tone.Transport.bpm.value = section1.bpm
		Tone.Transport.timeSignature = section1.beatsPerMeasure
		if (section1.bpmEnd !== section1.bpm) {
			console.log('NOT EQUAL')
			const numNotes = section1.numMeasures * section1.beatsPerMeasure
			const endTime = tempoChangeTime(numNotes, section1.bpm, section1.bpmEnd)
			Tone.Transport.bpm.linearRampTo(section1.bpmEnd, endTime)
		}
		let previousSection = section1
		let currentSectionIdx = 1
		while (currentSectionIdx < sections.length) {
			const startTime = previousSection.endTime
			console.log('startTime', startTime)
			const currentSection = playClicktrackSection(sections[currentSectionIdx], startTime)
			setTimeout(() => {
				Tone.Transport.bpm.value = currentSection.bpm
				Tone.Transport.timeSignature = currentSection.beatsPerMeasure
			}, startTime * 1000) // Convert from seconds to milliseconds
			currentSectionIdx++
			previousSection = currentSection
		}
		Tone.Transport.start()
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
