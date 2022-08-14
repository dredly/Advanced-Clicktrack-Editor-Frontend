import Tippy from '@tippyjs/react'
import { IconButton } from '@mui/material'
import HelpOutlineIcon from '@mui/icons-material/HelpOutline'

const HelpIcon = ({ content }) => {
	return (
		<Tippy content={content}>
			<IconButton aria-label="help" color="primary">
				<HelpOutlineIcon />
			</IconButton>
		</Tippy>
	)
}

export default HelpIcon