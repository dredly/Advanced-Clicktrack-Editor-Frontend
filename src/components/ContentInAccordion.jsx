import Accordion from '@mui/material/Accordion'
import AccordionSummary from '@mui/material/AccordionSummary'
import AccordionDetails from '@mui/material/AccordionDetails'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import { Typography } from '@mui/material'

const ContentInAccordion = (props) => {
	return (
		<Accordion>
			<AccordionSummary expandIcon={<ExpandMoreIcon />}>
				<Typography>
					{props.summaryText}
				</Typography>
			</AccordionSummary>
			<AccordionDetails>
				{props.children}
			</AccordionDetails>
		</Accordion>
	)
}

export default ContentInAccordion