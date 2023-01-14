import SampleChoices from './samples/SampleChoices'
import FileExport from './FileExport'
import ContentInAccordion from './ContentInAccordion'
import HelpIcon from './HelpIcon'
import SaveForm from './forms/SaveForm'
import { fileFormatsHelp } from '../utils/helpText'
import { useSelector, useDispatch } from 'react-redux'
import savedClicktrackService from '../services/savedClicktracks'
import { setFlash } from '../reducers/uiReducer'

import { Typography, Button } from '@mui/material'
import { useNavigate } from 'react-router-dom'

const Extras = () => {
	const navigate = useNavigate()
	const dispatch = useDispatch()

	const showHelp = useSelector(state => state.ui.showHelp)
	const user = useSelector(state => state.user.user)
	const userSavedClicktracks = useSelector(state => state.user.savedClicktracks)
	const currentlyEditing = useSelector(state => state.user.currentlyEditing)
	const sections = useSelector(state => state.sections.sectionList)

	const handleSaveChanges = async () => {
		const clickTrackData = {
			// Keeps title the same
			title: userSavedClicktracks.find(usct => usct.id === currentlyEditing).title,
			sections
		}
		await savedClicktrackService.update(currentlyEditing, clickTrackData)
		navigate('/myclicktracks')
		dispatch(setFlash({ message: `Saved changes to ${clickTrackData.title}`, severity: 'success' }))
		setTimeout(() => {
			dispatch(setFlash(null))
		}, 3000)
	}

	return (
		<div>
			<ContentInAccordion summaryText={
				<Typography>
					Choose audio sample(s)
				</Typography>
			}>
				<SampleChoices />
			</ContentInAccordion>
			<ContentInAccordion summaryText={
				<Typography className="expand-file-export">
					<span>Export to a file</span>
					{showHelp
						? <HelpIcon content={fileFormatsHelp} />
						: null
					}
				</Typography>
			}>
				<FileExport />
			</ContentInAccordion>
			{user
				? currentlyEditing
					? <Button onClick={handleSaveChanges}>Save changes</Button>
					: <ContentInAccordion summaryText={
						<Typography>
							Save to account
						</Typography>
					}>
						<SaveForm />
					</ContentInAccordion>
				: null
			}
		</div>
	)
}

export default Extras