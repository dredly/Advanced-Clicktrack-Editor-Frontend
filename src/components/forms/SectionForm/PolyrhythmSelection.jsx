import { Typography, Box, TextField, MenuItem } from '@mui/material'

const PolyrhythmSelection = ({ numerator, denominator }) => {
	const numerators = [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]
	const denominators = [2, 4, 8]

	return (
		<>
			<Typography>
				Choose second time signature
			</Typography>
			<Box sx={{ display: 'flex', maxWidth: '50%' }}>
				<TextField
					fullWidth
					select
					name="secondaryNumerator"
					defaultValue={numerator}
				>
					{numerators.map(n => (
						<MenuItem value={n} key={n}>{n}</MenuItem>
					))}
				</TextField>
				<TextField
					fullWidth
					select
					name="secondaryDenominator"
					value={denominator}
					className="secondary-denominator-selection"
				>
					{denominators.map(d => (
						<MenuItem value={d} key={d} className={`option${d}`}>{d}</MenuItem>
					))}
				</TextField>
			</Box>
		</>
	)
}

export default PolyrhythmSelection