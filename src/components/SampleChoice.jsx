import * as Tone from 'tone'

const SampleChoice = ({ sample }) => {

	const previewPlayer = new Tone.Player(sample.strong.url).toDestination()

	const listen = () => {
		Tone.start()
		previewPlayer.start()
	}

	const chooseSample = () => {
		// TODO: add this functionality with use dispatch
		console.log('Gonna choose this sample')
	}

	return (
		<div>
			<button onClick={chooseSample}>
				{sample.strong.name}
			</button>
			<button onClick={listen}>
				Listen
			</button>
		</div>
	)
}

export default SampleChoice