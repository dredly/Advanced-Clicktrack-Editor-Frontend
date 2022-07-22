const MeasuresInput = ({ defaultNumMeasures }) => {
	return (
		<div>
			<label>Select a number of measures
				<input
					key="measures"
					type="number"
					min={1} max={1000}
					name="numMeasures"
					defaultValue={defaultNumMeasures}
				/>
			</label>
		</div>
	)
}

export default MeasuresInput