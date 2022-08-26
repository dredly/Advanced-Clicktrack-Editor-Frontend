import SampleChoices from './samples/SampleChoices'
import FileExport from './FileExport'
import ContentInAccordion from './ContentInAccordion'
import HelpIcon from './HelpIcon'
import SaveForm from './forms/SaveForm'
import { fileFormatsHelp } from '../utils/helpText'
import { useSelector } from 'react-redux'

import { Typography } from '@mui/material'

const Extras = () => {
	const showHelp = useSelector(state => state.ui.showHelp)
	const user = useSelector(state => state.user.user)

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
				<Typography>
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
				? <ContentInAccordion summaryText={
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