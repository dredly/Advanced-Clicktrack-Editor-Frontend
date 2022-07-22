import SectionDisplay from './SectionDisplay'
import { useSelector, useDispatch } from 'react-redux'
import { deleteSection } from '../reducers/sectionReducer'
import { changeStatus } from '../reducers/clickTimesReducer'

const SectionList = ({ showFormHere, hideForm }) => {
	const dispatch = useDispatch()

	const sections = useSelector(state => state.sections.sectionList)

	const handleDelete = idx => {
		dispatch(deleteSection(idx))
		dispatch(changeStatus('edited'))
	}

	return (
		<>
			{sections.map((section, idx) =>
				<SectionDisplay
					key={section.id}
					section={section}
					idx={idx}
					handlers={{ showFormHere, hideForm, handleDelete }}
				/>
			)}
		</>
	)
}

export default SectionList