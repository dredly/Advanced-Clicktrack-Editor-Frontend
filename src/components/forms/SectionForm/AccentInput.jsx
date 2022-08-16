import MusicNoteIcon from '@mui/icons-material/MusicNote'
import MusicNoteOutlinedIcon from '@mui/icons-material/MusicNoteOutlined'
import { Checkbox } from '@mui/material'

const AccentInput = ({ idx, isChecked }) => {
	return (
		// <input type="checkbox" name={`beatCheckBox${idx}`} value={idx} defaultChecked={isChecked} />
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