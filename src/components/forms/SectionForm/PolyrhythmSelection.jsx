const PolyrhythmSelection = ({ numerator, denominator }) => {
	const numerators = [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]
	const denominators = [2, 4, 8]

	return (
		<label>Choose a time signature for the second rhythm
			<select defaultValue={numerator} >
				{numerators.map(n => (
					<option value={n} key={n}>{n}</option>
				))}
			</select>
			:
			<select name="secondaryDenominator" defaultValue={denominator}>
				{denominators.map(d => (
					<option value={d} key={d}>{d}</option>
				))}
			</select>
		</label>
	)
}

export default PolyrhythmSelection