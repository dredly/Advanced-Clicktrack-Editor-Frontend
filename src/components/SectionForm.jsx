import { addSection } from '../reducers/sectionReducer'
import { useDispatch } from 'react-redux'

const SectionForm = ({ hideSelf, existingData }) => {
	const dispatch = useDispatch()

	const defaults = {
		numMeasures: 4,
		bpm: 120,
		numBeats: 4
	}

	const data = existingData || defaults

	const addNewSection = evt => {
		evt.preventDefault()
		const numMeasures = evt.target.numMeasures.value
		const bpm = evt.target.bpm.value
		const numBeats = evt.target.numBeats.value
		dispatch(addSection({ bpm, numMeasures, numBeats }))
		hideSelf()
	}

	return (
		<form onSubmit={addNewSection} >
			<label>Select a number of measures
				<input
					key="measures"
					type="number"
					min={1} max={1000}
					name="numMeasures"
					defaultValue={data.numBeats}
				/>
			</label>
			<label>Select a bpm
				<input
					key="changebpm"
					type="number"
					min={20} max={400}
					name="bpm"
					defaultValue={data.bpm}
				/>
			</label>
			<label>Select a number of beats per measure
				<input
					key="changetimesig"
					type="number"
					min={2} max={9}
					name="numBeats"
					defaultValue={data.numBeats}
				/>
			</label>
			<button>Add this section</button>
		</form>
	)
}

export default SectionForm