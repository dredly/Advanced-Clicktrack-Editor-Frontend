import * as Tone from 'tone'

import { useSelector, useDispatch } from 'react-redux'
import { getClickTimesPoly } from '../utils/clickTimesCalculator'
import { toggleVisualisation } from '../reducers/uiReducer'

import { ButtonGroup } from '@mui/material'
import { Button } from '@mui/material'
import { Box } from '@mui/system'
import StopIcon from '@mui/icons-material/Stop'
import PlayArrowIcon from '@mui/icons-material/PlayArrow'
import TimelineIcon from '@mui/icons-material/Timeline'

const Controls = () => {
	const dispatch = useDispatch()

	const sections = useSelector(state => state.sections.sectionList)
	const selectedSamples = useSelector(state => state.samples.samples)
	const showVisualisation = useSelector(state => state.ui.showVisualisation)

	const clickTimesPoly = getClickTimesPoly(sections, selectedSamples.length)

	const strongPlayer = new Tone.Player().toDestination()
	const weakPlayer = new Tone.Player().toDestination()
	const secondaryPlayer = new Tone.Player().toDestination()

	const playClickTrack = async () => {
		let strongSampleUrl
		let weakSampleUrl

		//Check if there are polyrhythms and a second instrument has been chosen
		const numPolySections = sections.map(s => s.rhythms.length > 1).filter(val => val).length
		if (numPolySections && selectedSamples[1]) {
			strongSampleUrl = selectedSamples[0].strong.url
			weakSampleUrl = selectedSamples[0].weak.url
			const secondarySampleUrl = selectedSamples[1].strong.url
			await secondaryPlayer.load(secondarySampleUrl)
		} else {
			strongSampleUrl = selectedSamples[0].strong.url
			weakSampleUrl = selectedSamples[1] ? selectedSamples[1].strong.url : selectedSamples[0].weak.url
		}

		await strongPlayer.load(strongSampleUrl)
		await weakPlayer.load(weakSampleUrl)

		await Tone.start()

		clickTimesPoly.map(ct => {
			return { ...ct, time: ct.time + Tone.now() }
		}).forEach(click => {
			if (click.downBeat) {
				strongPlayer.start(click.time)
			} else {
				if (click.secondInstrument) {
					secondaryPlayer.start(click.time)
				} else {
					weakPlayer.start(click.time)
				}
			}
		})
	}

	const stopPlayBack = () => {
		[strongPlayer, weakPlayer, secondaryPlayer].forEach(p => {
			p.stop()
		})
	}

	const toggleTempoVisualisation = () => {
		dispatch(toggleVisualisation())
		if (!showVisualisation) {
			setTimeout(() => {
				window.scrollTo({
					top: document.documentElement.scrollHeight,
					behavior: 'auto'
				})
			}, 10)
		}
	}

	return (
		<Box sx={{ marginBlock: '0.5rem' }}>
			<ButtonGroup variant="contained" aria-label="outlined primary button group" sx={{ marginInlineEnd: '0.8rem' }}>
				<Button
					disabled={!sections.length}
					onClick={playClickTrack}
					color="success"
					startIcon={<PlayArrowIcon/>}
					id='play-button'
				>
					Play
				</Button>
				<Button disabled={!sections.length} onClick={stopPlayBack} color="error" startIcon={<StopIcon/>}>
					Stop
				</Button>
			</ButtonGroup>
			<ButtonGroup variant="contained">
				<Button
					disabled={!sections.length}
					color="secondary"
					startIcon={<TimelineIcon/>}
					onClick={toggleTempoVisualisation}
				>
					Visualise Tempo
				</Button>
			</ButtonGroup>
		</Box>
	)
}

export default Controls