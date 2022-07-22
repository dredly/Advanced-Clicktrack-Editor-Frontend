import { addSection, updateSection } from '../../../reducers/sectionReducer'
import { changeStatus } from '../../../reducers/clickTimesReducer'
import { useDispatch, useSelector } from 'react-redux'
import { useState } from 'react'
import MeasuresInput from './MeasuresInput'
import SingleBpmSelection from './SingleBpmSelection'
import MultipleBpmSelection from './MultipleBpmSelection'
import AccentSelection from './AccentSelection'

const SectionForm = ({ hideSelf, existingData }) => {
	const [isTempoChange, setIsTempoChange] = useState(existingData && existingData.bpmEnd !== existingData.bpm ? true : false)
	const [accentOnOne, setAccentOnOne] = useState(
		// If there is existing data and any beats accented beats which aren't the first of a measure,
		// then set accentOnOne to false
		existingData && (existingData.accentedBeats.length !== 1 || existingData.accentedBeats[0] !== 0)
			? false
			: true
	)
	const dispatch = useDispatch()
	const formType = useSelector(state => state.sections.form.type)
	const status = useSelector(state => state.clickTimes.status)

	const defaults = {
		numMeasures: 4,
		bpm: 120,
		bpmEnd: 120,
		meanTempoCondition: 0.5,
		numBeats: 4,
		accentedBeats: [0]
	}

	const data = existingData || defaults

	const [currentNumBeats, setCurrentNumBeats] = useState(data.numBeats)

	const handleSubmit = (evt) => {
		evt.preventDefault()
		const numMeasures = evt.target.numMeasures.value
		const bpm = evt.target.bpm.value
		const bpmEnd = evt.target.bpmEnd ? evt.target.bpmEnd.value : bpm
		const meanTempoCondition = evt.target.meanTempoCondition
			? evt.target.meanTempoCondition.value
			: defaults.meanTempoCondition
		const numBeats = currentNumBeats
		const formFieldNames = Object.values(evt.target).map(val => val.name)
		// First remove all undefined field names to prevent an error when calling the includes method,
		// which expects a string
		const checkBoxFieldNames = formFieldNames.filter(name => name && name.includes('beatCheckBox'))
		const checkBoxData = checkBoxFieldNames.map(name => evt.target[name].checked)
		const strongBeats = checkBoxData.map((ele, idx) => ele ? idx : -1).filter(val => val >= 0)
		if (formType === 'create') {
			dispatch(addSection({
				bpm,
				bpmEnd,
				meanTempoCondition,
				numMeasures,
				numBeats,
				// by default the first beat of each measure (downbeat)
				// is accented
				accentedBeats: strongBeats.length ? strongBeats : [0],
			}))
			if (status !== 'not_created') {
				dispatch(changeStatus('edited'))
			}
		} else if (formType === 'edit') {
			dispatch(updateSection({
				numMeasures,
				bpm,
				bpmEnd,
				meanTempoCondition,
				numBeats,
				id: data.id,
				// by default the first beat of each measure (downbeat)
				// is accented
				accentedBeats: strongBeats.length ? strongBeats : [0],
			}))
			dispatch(changeStatus('edited'))
		}
		hideSelf()
	}

	return (
		<form onSubmit={handleSubmit}>
			<h3>{formType === 'create' ? 'Adding section' : 'Editing section'}</h3>
			<MeasuresInput defaultNumMeasures={data.numMeasures}/>
			<div>
				<div className="small-bottom-margin">
					<label>Tempo change
						<input
							key="toggletempochange"
							type="checkbox"
							checked={isTempoChange}
							onChange={() => setIsTempoChange(!isTempoChange)}
						/>
					</label>
				</div>
				{( isTempoChange
					? <MultipleBpmSelection
						defaultBpm={{ start: data.bpm, end: data.bpmEnd }}
						defaultMeanTempoCondition={data.meanTempoCondition}
					/>
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
						value={currentNumBeats}
						onChange={({ target }) => setCurrentNumBeats(Number(target.value))}
					/>
				</label>
			</div>
			<div>
				<label>Accent first beat?
					<input
						key="toggleaccentonone"
						type="checkbox"
						checked={accentOnOne}
						onChange={() => setAccentOnOne(!accentOnOne)}
					/>
				</label>
				{accentOnOne ? null : <AccentSelection numBeats={currentNumBeats} accentedBeats={data.accentedBeats}/>}
			</div>
			<button>
				{(existingData ? 'Save Changes' : 'Add this Section')}
			</button>
		</form>
	)
}

export default SectionForm