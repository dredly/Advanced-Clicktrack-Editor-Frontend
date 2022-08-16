import * as Tone from 'tone'
import { useSelector, useDispatch } from 'react-redux'
import { changeSamples, addSecondSample, removeSecondSample } from '../../reducers/sampleReducer'

import { MenuItem, IconButton } from '@mui/material'
import HearingIcon from '@mui/icons-material/Hearing'

const SampleChoice = ({ sample, isSecondary }) => {
	const dispatch = useDispatch()
	const selectedSampleValues = useSelector(state => state.samples.samples.map(s => s.strong.value))

	let bgColour = ''
	let hoverColour = ''
	if (isSecondary) {
		if (selectedSampleValues[1] === sample.strong.value) {
			bgColour = '#DE9AF6'
			hoverColour = '#EDC7FB'
		}
	} else {
		if (selectedSampleValues[0] === sample.strong.value) {
			bgColour = '#65C9F1'
			hoverColour = '#B0D5E5'
		}
	}

	const previewPlayer = new Tone.Player(sample.strong.url).toDestination()

	const listen = () => {
		Tone.start()
		previewPlayer.start()
	}

	const chooseSample = () => {
		if (isSecondary) {
			if (selectedSampleValues[1] === sample.strong.value) {
				dispatch(removeSecondSample())
			} else {
				dispatch(addSecondSample(sample.strong.value))
			}
		} else {
			dispatch(changeSamples(sample.strong.value))
		}
	}

	return (
		<MenuItem onClick={chooseSample} sx ={{
			backgroundColor: bgColour,
			'&:hover': {
				backgroundColor: hoverColour
			}
		}}>
			<>
				{sample.strong.name}
				<IconButton onClick={listen}><HearingIcon /></IconButton>
			</>
		</MenuItem>
	)
}

export default SampleChoice