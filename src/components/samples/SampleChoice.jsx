import * as Tone from 'tone'
import { useDispatch, useSelector } from 'react-redux'
import { changeSamples, addSecondSample } from '../../reducers/sampleReducer'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faVolumeHigh } from '@fortawesome/free-solid-svg-icons'

const SampleChoice = ({ sample, isSecondary }) => {
	const dispatch = useDispatch()
	const selectedSampleValues = useSelector(state => state.samples.samples.map(s => s.strong.value))

	let styleClass = 'sample'
	if (isSecondary) {
		if (selectedSampleValues[1] === sample.strong.value) {
			styleClass = 'secondary-selected-sample sample'
		}
	} else {
		if (selectedSampleValues[0] === sample.strong.value) {
			styleClass = 'selected-sample sample'
		}
	}
	const previewPlayer = new Tone.Player(sample.strong.url).toDestination()

	const listen = () => {
		Tone.start()
		previewPlayer.start()
	}

	const chooseSample = () => {
		if (isSecondary) {
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