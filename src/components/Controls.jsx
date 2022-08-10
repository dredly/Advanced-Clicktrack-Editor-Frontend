import * as Tone from 'tone'

import { useSelector } from 'react-redux'
import { getClickTimesNonPoly, getClickTimesPoly } from '../utils/clickTimesCalculator'

const Controls = () => {
	const sections = useSelector(state => state.sections.sectionList)
	const selectedSamples = useSelector(state => state.samples.samples)

	// eslint-disable-next-line no-unused-vars
	const clickTimesNonPoly = getClickTimesNonPoly(sections)
	const clickTimesPoly = getClickTimesPoly(sections, selectedSamples.length)

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

		Tone.start()
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

	return (
		<div className='med-top-margin'>
			<button onClick={playClickTrack}>Play</button>
		</div>
	)
}

export default Controls