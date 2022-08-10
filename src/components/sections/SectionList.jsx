import SectionDisplay from './SectionDisplay'
import { useSelector, useDispatch } from 'react-redux'
import { deleteSection } from '../../reducers/sectionReducer'
import Visualiser from './Visualiser'

const SectionList = ({ showFormHere, hideForm }) => {
	const dispatch = useDispatch()

	const sections = useSelector(state => state.sections.sectionList)

	const handleDelete = idx => {
		dispatch(deleteSection(Number(idx)))
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
			{( sections.length
				? <Visualiser />
				: null
			)}
		</>
	)
}

export default SectionList