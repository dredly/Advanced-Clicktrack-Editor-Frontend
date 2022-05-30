import * as Tone from 'tone'
import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { displayForm } from './reducers/sectionReducer'
import NewSection from './components/NewSection'


const App = () => {
	const dispatch = useDispatch()
	const [started, setStarted] = useState(false)
	const sections = useSelector(state => state.sections.sectionList)
	const formLocation = useSelector(state => state.sections.formLocation)

	const woodblock1 = new Tone
		.Player('https://res.cloudinary.com/doemj9gq6/video/upload/v1651427128/Samples/Woodblock_oogia1.wav')
		.toDestination()

	const woodblock2 = new Tone
		.Player('https://res.cloudinary.com/doemj9gq6/video/upload/v1651427128/Samples/Woodblock_oogia1.wav')
		.toDestination()

	woodblock2.volume.value = -8

	const playClicktrack = () => {
		if (!started) {
			console.log('Starting')
			Tone.start()
			setStarted(true)
		}
		woodblock1.start(Tone.now())
		woodblock2.start(Tone.now() + 1)
	}

	const showFormHere = location => {
		dispatch(displayForm(location))
	}

	const hideForm = () => {
		dispatch(displayForm(NaN))
	}

	return (
		<>
			<button onClick={() => showFormHere(0)}>Add to start</button>
			{formLocation === 0
				? <>
					<NewSection hideSelf={hideForm}/>
					<button onClick={hideForm}>cancel</button>
				</>
				: null
			}
			{sections.map((section, idx) =>
				<div key={section.id}>
					{section.bpm}bpm for {section.numMeasures} measures
					<button onClick={() => showFormHere(idx + 1)}>Add after this section</button>
					{formLocation === idx + 1
						? <>
							<NewSection hideSelf={hideForm}/>
							<button onClick={hideForm}>cancel</button>
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
