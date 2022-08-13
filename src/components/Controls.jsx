import * as Tone from 'tone'

import { useSelector } from 'react-redux'
import { getClickTimesPoly } from '../utils/clickTimesCalculator'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlay, faStop } from '@fortawesome/free-solid-svg-icons'

const Controls = () => {
	const sections = useSelector(state => state.sections.sectionList)
	const selectedSamples = useSelector(state => state.samples.samples)

	const clickTimesPoly = getClickTimesPoly(sections, selectedSamples.length)
	console.log('clickTimesPoly', clickTimesPoly)

	const strongPlayer = new Tone.Player().toDestination()
	const weakPlayer = new Tone.Player().toDestination()
	const secondaryPlayer = new Tone.Player().toDestination()

	const playClickTrack = async () => {
		let strongSampleUrl
		let weakSampleUrl

		//Check if there are polyrhythms and a second instrument has been chosen
		const numPolySections = sections.map(s => s.secondaryNumBeats).filter(snb => snb).length
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

	return (
		<div className='med-top-margin'>
			<button onClick={playClickTrack}><FontAwesomeIcon icon={faPlay} />  Play</button>
			<button onClick={stopPlayBack}><FontAwesomeIcon icon={faStop} />Stop</button>
		</div>
	)
}

export default Controls