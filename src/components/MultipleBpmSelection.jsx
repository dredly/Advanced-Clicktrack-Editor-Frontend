const MultipleBpmSelection = ({ defaultBpm }) => (
	<>
		<label>Select a bpm for start of section
			<input
				key="changestartbpm"
				type="number"
				min={20} max={400}
				name="bpm"
				defaultValue={defaultBpm}
			/>
		</label>
		<label>Select a bpm for end of section
			<input
				key="changeendbpm"
				type="number"
				min={20} max={400}
				name="bpmEnd"
				defaultValue={defaultBpm}
			/>
		</label>
	</>
)

export default MultipleBpmSelection