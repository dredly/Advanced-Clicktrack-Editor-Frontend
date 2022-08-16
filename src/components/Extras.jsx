import SampleChoices from './samples/SampleChoices'
import FileExport from './FileExport'
import ContentInAccordion from './ContentInAccordion'
import HelpIcon from './HelpIcon'
import { fileFormatsHelp } from '../utils/helpText'
import { useSelector } from 'react-redux'

const Extras = () => {
	const showHelp = useSelector(state => state.ui.showHelp)

	return (
		<div>
			<ContentInAccordion summaryText="Choose sample(s) for playback">
				<SampleChoices />
			</ContentInAccordion>
			<ContentInAccordion summaryText={
				<>
					<span>Export to a file</span>
					{showHelp
						? <HelpIcon content={fileFormatsHelp} />
						: null
					}
				</>
			}>
				<FileExport />
			</ContentInAccordion>
		</div>
	)
}

export default Extras