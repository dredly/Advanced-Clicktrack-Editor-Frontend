const MultipleBpmSelection = ({ defaultBpm }) => (
	<>
		<label>Select a bpm for start of section
			<input
				key="changestartbpm"
				type="number"
				min={20} max={400}
				name="bpm"
				defaultValue={defaultBpm.start}
			/>
		</label>
		<label>Select a bpm for end of section
			<input
				key="changeendbpm"
				type="number"
				min={20} max={400}
				name="bpmEnd"
				defaultValue={defaultBpm.end}
			/>
		</label>
	</>
)

export default MultipleBpmSelection