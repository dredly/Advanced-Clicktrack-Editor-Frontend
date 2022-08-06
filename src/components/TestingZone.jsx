import * as Tone from 'tone'

const TestingZone = () => {
	const player1 = new Tone
		.Player('https://res.cloudinary.com/doemj9gq6/video/upload/v1659709147/Samples/drum_metallic_rh2dze.ogg')
		.toDestination()

	const player2 = new Tone
		.Player('https://res.cloudinary.com/doemj9gq6/video/upload/v1659709148/Samples/woodblock_high_srygbo.ogg')
		.toDestination()

	const playTest = () => {
		Tone.start()
		player1.start(Tone.now())
		player2.start(Tone.now() + 0.00001)
	}

	return (
		<div>
			<h2>TESTING STUFF HERE</h2>
			<button onClick={playTest}>Play</button>
		</div>
	)
}

export default TestingZone