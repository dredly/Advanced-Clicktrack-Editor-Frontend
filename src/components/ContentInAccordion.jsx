import Accordion from '@mui/material/Accordion'
import AccordionSummary from '@mui/material/AccordionSummary'
import AccordionDetails from '@mui/material/AccordionDetails'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'

const ContentInAccordion = (props) => {
	return (
		<Accordion defaultExpanded={props.expand}>
			<AccordionSummary expandIcon={<ExpandMoreIcon className="accordion-icon"/>}>
				{props.summaryText}
			</AccordionSummary>
			<AccordionDetails>
				{props.children}
			</AccordionDetails>
		</Accordion>
	)
}

export default ContentInAccordion