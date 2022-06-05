import * as Tone from 'tone'
import { useSelector, useDispatch } from 'react-redux'
import { displayForm, deleteSection } from './reducers/sectionReducer'
import SectionForm from './components/SectionForm'


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
		const numMeasures = sectionData.numMeasures
		const beatsPerMeasure = sectionData.numBeats
		Tone.start()
		Tone.Transport.bpm.value = sectionData.bpm
		Tone.Transport.start()
		for (let i = 0; i < numMeasures; i++) {
			const startOfMeasure = startTime + i * Tone.Time('4n').toSeconds() * beatsPerMeasure
			woodblock1.start(startOfMeasure)
			for (let j = 1; j < beatsPerMeasure; j++) {
				woodblock2.start(startOfMeasure + j * Tone.Time('4n').toSeconds())
			}
		}
		return startTime + numMeasures * Tone.Time('4n').toSeconds() * beatsPerMeasure
	}

	const playClicktrack = () => {
		if (sections.length) {
			let nextStartTime = Tone.now()
			for (let section of sections) {
				nextStartTime = playClicktrackSection(section, nextStartTime)
			}
			console.log('NEXT START TIME', nextStartTime)
		}
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
				<div key={section.id}>
					<p>{section.bpm}bpm for {section.numMeasures} measures</p>
					<p>Beats per measure: {section.numBeats}</p>
					<button onClick={() => showFormHere(idx + 1, 'edit')}>Edit</button>
					<button onClick={idx => handleDelete(idx)}>Delete</button>
					<button onClick={() => showFormHere(idx + 1, 'create')}>
						Add after this section
					</button>
					{createFormLocation === idx + 1
						? <>
							<SectionForm hideSelf={() => hideForm('create')} />
							<button onClick={() => hideForm('create')}>cancel</button>
						</>
						: null
					}
					{editFormLocation === idx + 1
						? <>
							<SectionForm
								hideSelf={() => hideForm('edit')}
								existingData={section}
							/>
							<button onClick={() => hideForm('edit')}>cancel</button>
						</>
						: null
					}
				</div>
			)}
			<button onClick={playClicktrack}>Play</button>
		</>
	)
}

export default App
