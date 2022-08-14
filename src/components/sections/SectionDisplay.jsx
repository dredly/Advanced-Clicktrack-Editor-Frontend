import { useSelector } from 'react-redux'
import SectionForm from '../forms/SectionForm/SectionForm'

const SectionDisplay = ({ section, idx, handlers }) => {
	const formInfo = useSelector(state => state.sections.form)

	const isPolyrhythm = section.rhythms.length > 1
	const isTempoChange = section.rhythms[0].bpms[0] !== section.rhythms[0].bpms[1]

	return (
		<div>
			<div className='click-track-section'>
				<div>
					<h3>{section.overallData.numMeasures} measures</h3>
					<h4>{section.rhythms[0].timeSig[0]}:{section.rhythms[0].timeSig[1]} time</h4>
					<p>Accents on beats {section.rhythms[0].accentedBeats.map(beatIdx => beatIdx + 1).join(', ')}</p>
					{isPolyrhythm
						? <p>secondary rhythm in {section.rhythms[1].timeSig[0]}:{section.rhythms[1].timeSig[1]} time</p>
						: null
					}
					{isTempoChange
						? <>
							<p>
								Tempo change from
								{section.rhythms[0].bpms[0] * (4 / section.rhythms[0].timeSig[1])}bpm to
								{section.rhythms[0].bpms[1] * (4 / section.rhythms[0].timeSig[1])}bpm
							</p>
							<p>
								Mean tempo condition = {section.overallData.mtc}
							</p>
						</>
						: `tempo = ${section.rhythms[0].bpms[0] * (4 / section.rhythms[0].timeSig[1])}bpm`
					}
				</div>
				<button onClick={() => handlers.showFormHere(idx + 1, 'edit')}>Edit</button>
				<button onClick={idx => handlers.handleDelete(idx)}>Delete</button>
				<button onClick={() => handlers.showFormHere(idx + 1, 'create')}>
					Add after this section
				</button>
			</div>
			{formInfo.location === idx + 1
				? formInfo.type === 'create'
					?	<>
						<SectionForm hideSelf={() => handlers.hideForm('create')} />
						<button onClick={() => handlers.hideForm('create')}>cancel</button>
					</>
					: <>
						<SectionForm
							hideSelf={() => handlers.hideForm('edit')}
							existingData={section}
						/>
						<button onClick={() => handlers.hideForm('edit')}>cancel</button>
					</>
				: null
			}
		</div>
	)
}

export default SectionDisplay