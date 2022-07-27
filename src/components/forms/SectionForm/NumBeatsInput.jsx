const NumBeatsInput = ({ currentNumBeats, setCurrentNumBeats }) => {
	return (
		<label>Select a number of beats per measure
			<input
				key="changetimesig"
				type="number"
				min={2} max={9}
				name="numBeats"
				value={currentNumBeats}
				onChange={({ target }) => setCurrentNumBeats(Number(target.value))}
			/>
		</label>
	)
}

export default NumBeatsInput