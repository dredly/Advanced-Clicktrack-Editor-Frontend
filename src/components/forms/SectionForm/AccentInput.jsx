import MusicNoteIcon from '@mui/icons-material/MusicNote'
import MusicNoteOutlinedIcon from '@mui/icons-material/MusicNoteOutlined'
import { Checkbox } from '@mui/material'

const AccentInput = ({ idx, isChecked }) => {
	return (
		<Checkbox
			defaultChecked={isChecked}
			name={`beatCheckBox${idx}`}
			value={idx}
			icon={<MusicNoteOutlinedIcon />}
			checkedIcon={<MusicNoteIcon/>}
		/>
	)
}

export default AccentInput