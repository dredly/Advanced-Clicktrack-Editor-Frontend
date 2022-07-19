import { useSelector } from 'react-redux'
import SectionForm from './SectionForm'

const SectionDisplay = ({ section, idx, handlers }) => {
	const formInfo = useSelector(state => state.sections.form)

	return (
		<div>
			<div className='click-track-section'>
				{( section.bpm === section.bpmEnd
					? <p>{section.bpm}bpm for {section.numMeasures} measures</p>
					: Number(section.bpm) < Number(section.bpmEnd)
						? <p>
							Acceleration from {section.bpm
							} to {section.bpmEnd} over {
								section.numMeasures
							} measures with mean tempo condition of {section.meanTempoCondition}
						</p>
						: <p>
							Deceleration from {section.bpm
							} to {section.bpmEnd} over {
								section.numMeasures
							} measures with mean tempo condition of {section.meanTempoCondition}
						</p>
				)}
				<p>Beats per measure: {section.numBeats}</p>
				{( section.accentedBeats.length > 1 || section.accentedBeats[0] !== 0
					// Add one to convert from array index (counting from 0)
					// to display index (counting from 1)
					? <p>Accents on beats {section.accentedBeats.map(beatIdx => beatIdx + 1).join(', ')}</p>
					: null
				)}
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