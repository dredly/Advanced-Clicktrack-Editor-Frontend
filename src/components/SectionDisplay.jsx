import SectionForm from './SectionForm'

const SectionDisplay = ({ section, idx, handlers, formLocations }) => {
	return (
		<div>
			{( section.bpm === section.bpmEnd
				? <p>{section.bpm}bpm for {section.numMeasures} measures</p>
				: Number(section.bpm) < Number(section.bpmEnd)
					? <p>Acceleration from {section.bpm} to {section.bpmEnd} over {section.numMeasures} measures</p>
					: <p>Deceleration from {section.bpm} to {section.bpmEnd} over {section.numMeasures} measures</p>
			)}
			<p>Beats per measure: {section.numBeats}</p>
			<button onClick={() => handlers.showFormHere(idx + 1, 'edit')}>Edit</button>
			<button onClick={idx => handlers.handleDelete(idx)}>Delete</button>
			<button onClick={() => handlers.showFormHere(idx + 1, 'create')}>
						Add after this section
			</button>
			{formLocations.createFormLocation === idx + 1
				? <>
					<SectionForm hideSelf={() => handlers.hideForm('create')} />
					<button onClick={() => handlers.hideForm('create')}>cancel</button>
				</>
				: null
			}
			{formLocations.editFormLocation === idx + 1
				? <>
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