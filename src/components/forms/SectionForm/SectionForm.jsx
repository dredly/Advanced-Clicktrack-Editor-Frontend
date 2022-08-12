import { useState } from 'react'
import { useSelector } from 'react-redux/es/exports'
import MeasuresInput from './MeasuresInput'
import SingleBpmSelection from './SingleBpmSelection'
import MultipleBpmSelection from './MultipleBpmSelection'
import AccentSelection from './AccentSelection'
import PolyrhythmSelection from './PolyrhythmSelection'
import HelpIcon from '../../HelpIcon'
import { polyrhythmHelp, accentSelectionHelp } from '../../../utils/helpText'
import { defaults } from '../../../config/sectionDefaults'
import TimeSignatureInput from './TimeSignatureInput'

const SectionForm = ({ hideSelf, existingData }) => {

	const formType = useSelector(state => state.sections.form.type)
	const showHelp = useSelector(state => state.ui.showHelp)

	const data = existingData || defaults

	const [isTempoChange, setIsTempoChange] = useState(
		data.rhythms[0].bpms[0] !== data.rhythms[0].bpms[1]
			? true
			: false
	)

	const [isPolyrhythm, setIsPolyrhythm] = useState(data.rhythms.length > 1 ? true : false)

	const [accentOnOne, setAccentOnOne] = useState(data.rhythms[0].accentedBeats.toString() === '0' ? true : false)

	const [currentNumBeats, setCurrentNumBeats] = useState(data.rhythms[0].timeSig[0])

	const allBpms = data.rhythms.map(r => r.bpms)
	const allDenominators = data.rhythms.map(r => r.timeSig).map(ts => ts[1])
	const displayBpms = allBpms.map((bpma, idx) => bpma.map(bpm => bpm * (4 / allDenominators[idx])))

	console.log('displayBpms', displayBpms)

	const handleSubmit = (evt) => {
		evt.preventDefault()
		console.log('Fake submit')
		hideSelf()
	}

	return (
		<form onSubmit={handleSubmit}>
			<h3>{formType === 'create' ? 'Adding section' : 'Editing section'}</h3>
			<MeasuresInput defaultNumMeasures={data.overallData.numMeasures}/>
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
						defaultBpm={{
							start: Number(displayBpms[0][0]),
							end: Number(displayBpms[0][1])
						}}
						defaultMeanTempoCondition={data.mtc}
					/>
					: <SingleBpmSelection defaultBpm={displayBpms[0][0]} />
				)}
			</div>
			<div>
				<TimeSignatureInput
					currentNumBeats={currentNumBeats}
					setCurrentNumBeats={setCurrentNumBeats}
					denominator={data.rhythms[0].timeSig[1]}
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
				// If not editing an already existing polyrhythm, then default the time signature to the same as
				// that of the primary rhythm
				? <PolyrhythmSelection
					numerator={data.rhythms.length > 1 ? data.rhythms[1].timeSig[0] : data.rhythms[0].timeSig[0]}
					denominator={data.rhythms.length > 1 ? data.rhythms[1].timeSig[1] : data.rhythms[0].timeSig[1]}
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
				{accentOnOne ? null : <AccentSelection numBeats={currentNumBeats} accentedBeats={data.rhythms[0].accentedBeats}/>}
			</div>
			<button>
				{(existingData ? 'Save Changes' : 'Add this Section')}
			</button>
		</form>
	)
}

export default SectionForm