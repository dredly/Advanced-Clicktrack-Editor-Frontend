const SingleBpmSelection = ({ defaultBpm }) => (
	<label>Select a bpm
		<input
			key="changebpm"
			type="number"
			min={20} max={400}
			name="bpm"
			defaultValue={defaultBpm}
		/>
	</label>
)

export default SingleBpmSelection