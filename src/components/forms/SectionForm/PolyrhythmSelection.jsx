const PolyrhythmSelection = ({ currentNumBeats, setCurrentNumBeats }) => {
	return (
		<label>Select a number of beats for the secondary rhythm
			<input
				key="changesecondarytimesig"
				type="number"
				min={2} max={9}
				name="numBeatsSecondary"
				value={currentNumBeats}
				onChange={({ target }) => setCurrentNumBeats(Number(target.value))}
			/>
		</label>
	)
}

export default PolyrhythmSelection