import { TextField, Box } from '@mui/material'

const MeasuresInput = ({ defaultNumMeasures }) => {
	const inputProps = {
		min: 1,
		max: 1000
	}
	return (
		<Box sx={{ flexGrow: 1, minWidth: '10em', marginRight: '0.3em' }}>
			<TextField
				fullWidth
				type="number"
				name="numMeasures"
				defaultValue={defaultNumMeasures}
				label="Number of measures"
				inputProps={inputProps}
				className="num-measures-input"
				required
			/>
		</Box>
	)
}

export default MeasuresInput