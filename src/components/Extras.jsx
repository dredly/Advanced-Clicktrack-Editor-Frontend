import SampleChoices from './samples/SampleChoices'
import FileExport from './FileExport'
import ContentInAccordion from './ContentInAccordion'

const Extras = () => {
	return (
		<div>
			<ContentInAccordion summaryText="Choose sample(s) for playback">
				<SampleChoices />
			</ContentInAccordion>
			<ContentInAccordion summaryText="Export to a file">
				<FileExport />
			</ContentInAccordion>
		</div>
	)
}

export default Extras