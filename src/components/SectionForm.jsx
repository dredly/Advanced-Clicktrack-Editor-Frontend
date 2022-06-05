import { addSection, updateSection } from '../reducers/sectionReducer'
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

	const editSection = evt => {
		evt.preventDefault()
		console.log('Supposedly updating')
		const numMeasures = evt.target.numMeasures.value
		const bpm = evt.target.bpm.value
		const numBeats = evt.target.numBeats.value
		dispatch(updateSection({
			numMeasures,
			bpm,
			numBeats,
			id: data.id
		}))
		hideSelf()
	}

	return (
		<form onSubmit={(
			existingData
				? editSection
				: addNewSection
		)} >
			<label>Select a number of measures
				<input
					key="measures"
					type="number"
					min={1} max={1000}
					name="numMeasures"
					defaultValue={data.numMeasures}
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
			<button>
				{(existingData
					? 'Save Changes'
					: 'Add new Section'
				)}
			</button>
		</form>
	)
}

export default SectionForm