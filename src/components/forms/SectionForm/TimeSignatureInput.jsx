import { TextField, Typography, Box, MenuItem } from '@mui/material'

const TimeSignatureInput = ({ currentNumBeats, setCurrentNumBeats, currentDenominator, setCurrentDenominator }) => {
	const numerators = [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]
	const denominators = [2, 4, 8]

	return (
		<Box sx={{
			flexGrow: 1
		}}>
			<Typography>
				Choose a time signature
			</Typography>
			<Box sx={{ display: 'flex' }}>
				<TextField
					fullWidth
					select
					value={currentNumBeats}
					onChange={({ target }) => setCurrentNumBeats(Number(target.value))}
				>
					{numerators.map(n => (
						<MenuItem value={n} key={n}>{n}</MenuItem>
					))}
				</TextField>
				<TextField
					fullWidth
					select
					value={currentDenominator}
					onChange={({ target }) => setCurrentDenominator(Number(target.value))}
					className='denominator-selection'
				>
					{denominators.map(d => (
						<MenuItem value={d} key={d} className={`option${d}`}>{d}</MenuItem>
					))}
				</TextField>
			</Box>
		</Box>
	)
}

export default TimeSignatureInput