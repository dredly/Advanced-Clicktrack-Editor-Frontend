import SectionForm from './SectionForm'

const SectionDisplay = ({ section, idx, handlers, formLocations }) => {
	return (
		<div>
			<p>{section.bpm}bpm for {section.numMeasures} measures</p>
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