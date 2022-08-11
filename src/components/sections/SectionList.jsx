import SectionDisplay from './SectionDisplay'
import { useSelector, useDispatch } from 'react-redux'
import { deleteSection } from '../../reducers/sectionReducer'

const SectionList = ({ showFormHere, hideForm }) => {
	const dispatch = useDispatch()

	const sections = useSelector(state => state.sections.sectionList)

	const handleDelete = idx => {
		dispatch(deleteSection(Number(idx)))
	}

	return (
		<div>
			{sections.map((section, idx) =>
				<SectionDisplay
					key={section.id}
					section={section}
					idx={idx}
					handlers={{ showFormHere, hideForm, handleDelete }}
				/>
			)}
		</div>
	)
}

export default SectionList