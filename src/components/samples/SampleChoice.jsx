import * as Tone from 'tone'
import { useDispatch, useSelector } from 'react-redux'
import { changeSamples, addSecondSample } from '../../reducers/sampleReducer'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faVolumeHigh } from '@fortawesome/free-solid-svg-icons'

const SampleChoice = ({ sample }) => {
	const dispatch = useDispatch()
	const selectedSampleValues = useSelector(state => state.samples.samples.map(s => s.strong.value))

	const styleClass = selectedSampleValues.includes(sample.strong.value) ? 'selected-sample sample': 'sample'
	const previewPlayer = new Tone.Player(sample.strong.url).toDestination()

	const listen = () => {
		Tone.start()
		previewPlayer.start()
	}

	const chooseSample = (evt) => {
		if (evt.shiftKey) {
			dispatch(addSecondSample(sample.strong.value))
		} else {
			dispatch(changeSamples(sample.strong.value))
		}
	}

	return (
		<div className={styleClass}>
			<button onClick={chooseSample}>
				{sample.strong.name}
			</button>
			<button onClick={listen}>
				Listen
				<span className='small-left-margin'><FontAwesomeIcon icon={faVolumeHigh} /></span>
			</button>
		</div>
	)
}

export default SampleChoice