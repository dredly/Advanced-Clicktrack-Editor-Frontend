import { useSelector, useDispatch } from 'react-redux'
import { displayForm } from './reducers/sectionReducer'
import NewSection from './components/NewSection'


const App = () => {
	const dispatch = useDispatch()
	const sections = useSelector(state => state.sections.sectionList)
	const formLocation = useSelector(state => state.sections.formLocation)

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
		</>
	)
}

export default App
