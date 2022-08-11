import { addSection, updateSection } from '../../../reducers/sectionReducer'
import { useDispatch, useSelector } from 'react-redux'
import { useState } from 'react'
import getSecondBpm from '../../../utils/polyrhythmCalculator'
import MeasuresInput from './MeasuresInput'
import SingleBpmSelection from './SingleBpmSelection'
import MultipleBpmSelection from './MultipleBpmSelection'
import AccentSelection from './AccentSelection'
import PolyrhythmSelection from './PolyrhythmSelection'
import HelpIcon from '../../HelpIcon'
import { accentSelectionHelp, polyrhythmHelp } from '../../../utils/helpText'
import { defaults } from '../../../config/sectionDefaults'
import TimeSignatureInput from './TimeSignatureInput'

const SectionForm = ({ hideSelf, existingData }) => {
	const [isTempoChange, setIsTempoChange] = useState(existingData && existingData.bpmEnd !== existingData.bpm ? true : false)
	const [accentOnOne, setAccentOnOne] = useState(
		// If there is existing data and any beats accented beats which aren't the first of a measure,
		// then set accentOnOne to false
		existingData && (existingData.accentedBeats.length !== 1 || existingData.accentedBeats[0] !== 0)
			? false
			: true
	)
	const [isPolyrhythm, setIsPolyrhythm] = useState(existingData && existingData.secondaryBpm ? true : false)
	const dispatch = useDispatch()
	const formType = useSelector(state => state.sections.form.type)
	const showHelp = useSelector(state => state.ui.showHelp)

	const data = existingData || defaults

	const [currentNumBeats, setCurrentNumBeats] = useState(data.timeSig[0])
	const [secondaryNumBeats, setSecondaryNumBeats] = useState(data.secondaryNumBeats)

	const handleSubmit = (evt) => {
		evt.preventDefault()
		const numMeasures = evt.target.numMeasures.value
		const numBeats = currentNumBeats
		const denominator = evt.target.denominator.value
		const bpm = evt.target.bpm.value
		const bpmEnd = evt.target.bpmEnd ? evt.target.bpmEnd.value : bpm
		const secondaryBpm = secondaryNumBeats && isPolyrhythm
			? getSecondBpm(bpm, numBeats, secondaryNumBeats)
			: null
		const secondaryBpmEnd = secondaryNumBeats && isPolyrhythm
			? getSecondBpm(bpmEnd, numBeats, secondaryNumBeats)
			: null
		const meanTempoCondition = evt.target.meanTempoCondition
			? evt.target.meanTempoCondition.value
			: defaults.meanTempoCondition
		const formFieldNames = Object.values(evt.target).map(val => val.name)
		// First remove all undefined field names to prevent an error when calling the includes method,
		// which expects a string
		const checkBoxFieldNames = formFieldNames.filter(name => name && name.includes('beatCheckBox'))
		const checkBoxData = checkBoxFieldNames.map(name => evt.target[name].checked)
		const strongBeats = checkBoxData.map((ele, idx) => ele ? idx : -1).filter(val => val >= 0)
		const newSection = {
			numMeasures, numBeats, denominator, bpm, bpmEnd, meanTempoCondition,
			secondaryNumBeats: isPolyrhythm ? secondaryNumBeats: '',
			secondaryBpm: isPolyrhythm ? secondaryBpm: null,
			secondaryBpmEnd: isPolyrhythm ? secondaryBpmEnd: null,
			// by default the first beat of each measure (downbeat)
			// is accented
			accentedBeats: strongBeats.length ? strongBeats : [0],
		}
		const editedSection = { ...newSection, id: data.id }

		if (formType === 'create') {
			dispatch(addSection(newSection))
		} else if (formType === 'edit') {
			dispatch(updateSection(editedSection))
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
						defaultBpm={{ start: Number(data.bpm), end: Number(data.bpmEnd) }}
						defaultMeanTempoCondition={data.meanTempoCondition}
					/>
					: <SingleBpmSelection defaultBpm={data.bpm} />
				)}
			</div>
			<div>
				<TimeSignatureInput
					currentNumBeats={currentNumBeats}
					setCurrentNumBeats={setCurrentNumBeats}
					denominator={data.timeSig[1]}
				/>
			</div>
			<div className="small-bottom-margin">
				<label>Polyrhythm?
					<input
						key="togglepolyrhythm"
						type="checkbox"
						checked={isPolyrhythm}
						onChange={() => setIsPolyrhythm(!isPolyrhythm)}
					/>
				</label>
				{(showHelp
					? <HelpIcon content={polyrhythmHelp}/>
					: null
				)}
			</div>
			{( isPolyrhythm
				? <PolyrhythmSelection
					currentNumBeats={secondaryNumBeats}
					setCurrentNumBeats={setSecondaryNumBeats}
				/>
				: null
			)}
			<div>
				<label>Accent first beat?
					<input
						key="toggleaccentonone"
						type="checkbox"
						checked={accentOnOne}
						onChange={() => setAccentOnOne(!accentOnOne)}
					/>
				</label>
				{(showHelp
					? <HelpIcon content={accentSelectionHelp}/>
					: null
				)}
				{accentOnOne ? null : <AccentSelection numBeats={currentNumBeats} accentedBeats={data.accentedBeats}/>}
			</div>
			<button>
				{(existingData ? 'Save Changes' : 'Add this Section')}
			</button>
		</form>
	)
}

export default SectionForm