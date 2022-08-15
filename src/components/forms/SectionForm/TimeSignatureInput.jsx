import { TextField, Typography, Box, MenuItem } from '@mui/material'

const TimeSignatureInput = ({ currentNumBeats, setCurrentNumBeats, denominator }) => {
	const numerators = [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]
	const denominators = [2, 4, 8]

	//To shut eslint up
	//console.log(currentNumBeats, setCurrentNumBeats, denominator, numerators, denominators)

	return (
		// <label>Choose a time signature
		// 	<select value={currentNumBeats} onChange={({ target }) => setCurrentNumBeats(Number(target.value))}>
		// 		{numerators.map(n => (
		// 			<option value={n} key={n}>{n}</option>
		// 		))}
		// 	</select>
		// 	:
		// 	<select name="denominator" defaultValue={denominator}>
		// 		{denominators.map(d => (
		// 			<option value={d} key={d}>{d}</option>
		// 		))}
		// 	</select>
		// </label>
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
					name="denominator"
					defaultValue={denominator}
				>
					{denominators.map(d => (
						<MenuItem value={d} key={d}>{d}</MenuItem>
					))}
				</TextField>
			</Box>
		</Box>
	)
}

export default TimeSignatureInput