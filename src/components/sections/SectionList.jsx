import SectionDisplay from './SectionDisplay'
import { useSelector, useDispatch } from 'react-redux'
import { deleteSection } from '../../reducers/sectionReducer'
import { setFlash } from '../../reducers/uiReducer'
import { addToStartHelp } from '../../utils/helpText'
import SectionForm from '../forms/SectionForm/SectionForm'
import HelpIcon from '../HelpIcon'

import { Card, Button } from '@mui/material'
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd'

const SectionList = ({ showFormHere, hideForm }) => {
	const dispatch = useDispatch()

	const sections = useSelector(state => state.sections.sectionList)
	const formInfo = useSelector(state => state.sections.form)
	const showHelp = useSelector(state => state.ui.showHelp)

	const handleDelete = idx => {
		// Check that user is not currently editing section
		if (formInfo.type === 'edit' && formInfo.location - 1 === Number(idx)) {
			dispatch(setFlash({ message: 'You cannot delete this section while editing it', severity: 'error' }))
			setTimeout(() => {
				dispatch(setFlash(null))
			}, 3000)
			return
		}
		dispatch(deleteSection(Number(idx)))
	}

	return (
		<Card>
			<Button id="add-to-start" onClick={() => showFormHere(0, 'create')} variant="outlined" startIcon={<PlaylistAddIcon />}>
				Add to start
			</Button>
			{(showHelp
				? <HelpIcon content={addToStartHelp}/>
				: null
			)}
			{formInfo.location === 0
				? <>
					<SectionForm hideSelf={() => hideForm('create')}/>
				</>
				: null
			}
			{sections.map((section, idx) =>
				<SectionDisplay
					key={section.id}
					section={section}
					idx={idx}
					handlers={{ showFormHere, hideForm, handleDelete }}
				/>
			)}
		</Card>
	)
}

export default SectionList