import SampleChoices from './samples/SampleChoices'
import FileExport from './FileExport'
import ContentInAccordion from './ContentInAccordion'
import HelpIcon from './HelpIcon'
import { fileFormatsHelp } from '../utils/helpText'
import { useSelector } from 'react-redux'

import { Typography } from '@mui/material'

const Extras = () => {
	const showHelp = useSelector(state => state.ui.showHelp)

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
		</div>
	)
}

export default Extras