import { addSection, updateSection } from '../reducers/sectionReducer'
import { useDispatch } from 'react-redux'
import { useState } from 'react'
import SingleBpmSelection from './SingleBpmSelection'
import MultipleBpmSelection from './MultipleBpmSelection'

const SectionForm = ({ hideSelf, existingData }) => {
	const [isTempoChange, setIsTempoChange] = useState(false)
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
		const bpmEnd = evt.target.bpmEnd ? evt.target.bpmEnd.value : bpm
		console.log('BPM AT END', bpmEnd)
		const numBeats = evt.target.numBeats.value
		dispatch(addSection({ bpm, bpmEnd, numMeasures, numBeats }))
		hideSelf()
	}

	const editSection = evt => {
		evt.preventDefault()
		console.log('Supposedly updating')
		const numMeasures = evt.target.numMeasures.value
		const bpm = evt.target.bpm.value
		const bpmEnd = evt.target.bpmEnd ? evt.target.bpmEnd.value : bpm
		const numBeats = evt.target.numBeats.value
		dispatch(updateSection({
			numMeasures,
			bpm,
			bpmEnd,
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
			<div>
				<label>Select a number of measures
					<input
						key="measures"
						type="number"
						min={1} max={1000}
						name="numMeasures"
						defaultValue={data.numMeasures}
					/>
				</label>
			</div>
			<div>
				<label>Tempo change
					<input
						key="toggletempochange"
						type="checkbox"
						onChange={() => setIsTempoChange(!isTempoChange)}
					/>
				</label>
				{( isTempoChange
					? <MultipleBpmSelection defaultBpm={data.bpm} />
					: <SingleBpmSelection defaultBpm={data.bpm} />
				)}
			</div>
			<div>
				<label>Select a number of beats per measure
					<input
						key="changetimesig"
						type="number"
						min={2} max={9}
						name="numBeats"
						defaultValue={data.numBeats}
					/>
				</label>
			</div>
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