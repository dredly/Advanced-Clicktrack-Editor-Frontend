import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux/es/exports'
import MeasuresInput from './MeasuresInput'
import SingleBpmSelection from './SingleBpmSelection'
import MultipleBpmSelection from './MultipleBpmSelection'
import AccentSelection from './AccentSelection'
import PolyrhythmSelection from './PolyrhythmSelection'
import HelpIcon from '../../HelpIcon'
import { polyrhythmHelp, accentSelectionHelp } from '../../../utils/helpText'
import { defaults } from '../../../config/sectionDefaults'
import TimeSignatureInput from './TimeSignatureInput'
import getSecondBpm from '../../../utils/polyrhythmCalculator'
import { addSection, updateSection } from '../../../reducers/sectionReducer'

import { Card, CardActions, CardContent, CardHeader, Box, Button, FormControlLabel, Switch } from '@mui/material'
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd'
import SaveIcon from '@mui/icons-material/Save'

const SectionForm = ({ hideSelf, existingData }) => {
	const dispatch = useDispatch()

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
	const [currentDenominator, setCurrentDenominator] = useState(data.rhythms[0].timeSig[1])

	const allBpms = data.rhythms.map(r => r.bpms)
	const allDenominators = data.rhythms.map(r => r.timeSig).map(ts => ts[1])
	const displayBpms = allBpms.map((bpma, idx) => bpma.map(bpm => bpm * (4 / allDenominators[idx])))

	const handleSubmit = (evt) => {
		evt.preventDefault()

		const formFieldNames = Object.values(evt.target).map(val => val.name)
		// First remove all undefined field names to prevent an error when calling the includes method,
		// which expects a string
		const checkBoxFieldNames = formFieldNames.filter(name => name && name.includes('beatCheckBox'))
		const checkBoxData = checkBoxFieldNames.map(name => evt.target[name].checked)
		const strongBeats = checkBoxData.map((ele, idx) => ele ? idx : -1).filter(val => val >= 0)

		const newSection ={
			overallData: {
				numMeasures: Number(evt.target.numMeasures.value),
				mtc: evt.target.meanTempoCondition
					? Number(evt.target.meanTempoCondition.value)
					: defaults.overallData.mtc
			},
			rhythms: [
				{
					bpms: [
						Number(evt.target.bpm.value),
						evt.target.bpmEnd
							? Number(evt.target.bpmEnd.value)
							: Number(evt.target.bpm.value)
					],
					timeSig: [currentNumBeats, currentDenominator],
					accentedBeats: strongBeats.length ? strongBeats : [0]
				}
			]
		}

		if (isPolyrhythm) {
			const secondaryBpms = newSection.rhythms[0].bpms
				.map(bpm => getSecondBpm(bpm, newSection.rhythms[0].timeSig[0], Number(evt.target.secondaryNumerator.value)))
			newSection.rhythms = newSection.rhythms.concat({
				bpms: secondaryBpms,
				timeSig: [
					Number(evt.target.secondaryNumerator.value),
					Number(evt.target.secondaryDenominator.value)
				],
				accentedBeats: [0]
			})
		}

		// Modify the bpms so that all notes can be considered as quarter notes
		for (let i = 0; i < newSection.rhythms.length; i++) {
			const denominator = newSection.rhythms[i].timeSig[1]
			newSection.rhythms[i].bpms = newSection.rhythms[i].bpms
				.map(bpm => bpm * (denominator / 4))
		}

		if (formType === 'create') {
			dispatch(addSection(newSection))
		} else if (formType === 'edit') {
			dispatch(updateSection({ ...newSection, id: data.id }))
		}
		hideSelf()
	}

	return (
		<Card variant='elevation' elevation={3}>
			<form onSubmit={handleSubmit}>
				<CardHeader title={formType === 'create' ? 'Adding section' : 'Editing section'}/>
				<CardContent>
					<Box sx={{
						display: 'flex',
						flexWrap: 'wrap',
						alignItems: 'end',
						marginBottom: '0.8em'
					}}>
						<MeasuresInput defaultNumMeasures={data.overallData.numMeasures}/>
						<TimeSignatureInput
							currentNumBeats={currentNumBeats}
							setCurrentNumBeats={setCurrentNumBeats}
							currentDenominator={currentDenominator}
							setCurrentDenominator={setCurrentDenominator}
						/>
					</Box>
					<div>
						<FormControlLabel
							control={
								<Switch
									checked={isTempoChange}
									aria-label="tempo change switch"
									onChange={() => setIsTempoChange(!isTempoChange)}
									color="primary"
								/>
							}
							label='Tempo Change'
						/>
						{( isTempoChange
							? <MultipleBpmSelection
								defaultBpm={{
									start: Number(displayBpms[0][0]),
									end: Number(displayBpms[0][1])
								}}
								defaultMeanTempoCondition={data.overallData.mtc}
							/>
							: <SingleBpmSelection defaultBpm={displayBpms[0][0]} />
						)}
					</div>
					<div>
						<FormControlLabel
							control={
								<Switch
									checked={isPolyrhythm}
									aria-label="polyrhythm switch"
									onChange={() => setIsPolyrhythm(!isPolyrhythm)}
									color="primary"
								/>
							}
							label='Polyrhythm ?'
							className="polyrhythm-switch"
						/>
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
							denominator={currentDenominator}
						/>
						: null
					)}
					<div>
						{(isPolyrhythm
							? null
							: <>
								<FormControlLabel
									control={
										<Switch
											checked={accentOnOne}
											aria-label="accent switch"
											onChange={() => setAccentOnOne(!accentOnOne)}
											color="primary"
										/>
									}
									label='Accent first beat?'
									className='accent-checkbox'
								/>
								{(showHelp
									? <HelpIcon content={accentSelectionHelp}/>
									: null
								)}
								{accentOnOne ? null : <AccentSelection numBeats={currentNumBeats} accentedBeats={data.rhythms[0].accentedBeats}/>}
							</>
						)}
					</div>
				</CardContent>
				<CardActions>
					<Button type="submit" startIcon={existingData ? <SaveIcon /> : <PlaylistAddIcon />} className="section-form-submit">
						{(existingData ? 'Save Changes' : 'Add this Section')}
					</Button>
					<Button type="reset" onClick={hideSelf} color="warning" className="section-form-cancel">
						Cancel
					</Button>
				</CardActions>
			</form>
		</Card>
	)
}

export default SectionForm
