import { addSection } from '../reducers/sectionReducer'
import { useDispatch } from 'react-redux'

const NewSection = ({ hideSelf }) => {
	const dispatch = useDispatch()
	const [defaultMeasures, defaultBpm] = [4, 120]

	const addNewSection = evt => {
		evt.preventDefault()
		const numMeasures = evt.target.numMeasures.value
		const bpm = evt.target.bpm.value
		dispatch(addSection({ bpm, numMeasures }))
		hideSelf()
	}

	return (
		<form onSubmit={addNewSection} >
			<label>Select a number of measures
				<input key="measures" type="number" min={1} max={1000} name="numMeasures" defaultValue={defaultMeasures}/>
			</label>
			<label>Select a bpm
				<input key="changebpm" type="number" min={20} max={400} name="bpm" defaultValue={defaultBpm}/>
			</label>
			<button>Add this section</button>
		</form>
	)
}

export default NewSection