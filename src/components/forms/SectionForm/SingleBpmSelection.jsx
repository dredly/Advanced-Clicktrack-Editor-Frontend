import { TextField } from '@mui/material'

const SingleBpmSelection = ({ defaultBpm }) => {
	const inputProps = {
		min: 20,
		max: 400
	}
	return (
		<TextField
			type="number"
			name="bpm"
			defaultValue={defaultBpm}
			label="bpm"
			inputProps={inputProps}
			required
		/>
	)
}

export default SingleBpmSelection