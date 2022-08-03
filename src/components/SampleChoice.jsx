import * as Tone from 'tone'
import { useDispatch, useSelector } from 'react-redux'
import { changeSamples } from '../reducers/sampleReducer'

const SampleChoice = ({ sample }) => {
	const dispatch = useDispatch()
	const selectedSampleValue = useSelector(state => state.samples.samples.strong.value)

	const styleClass = selectedSampleValue === sample.strong.value ? 'selected-sample sample': 'sample'
	const previewPlayer = new Tone.Player(sample.strong.url).toDestination()

	const listen = () => {
		Tone.start()
		previewPlayer.start()
	}

	const chooseSample = () => {
		dispatch(changeSamples(sample.strong.value))
	}

	return (
		<div className={styleClass}>
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