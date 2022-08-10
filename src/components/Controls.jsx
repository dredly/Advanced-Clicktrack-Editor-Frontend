import * as Tone from 'tone'

import { useSelector } from 'react-redux'
import { getClickTimesNonPoly, getClickTimesPoly } from '../utils/clickTimesCalculator'

const Controls = () => {
	const sections = useSelector(state => state.sections.sectionList)
	const selectedSamples = useSelector(state => state.samples.samples)

	// eslint-disable-next-line no-unused-vars
	const clickTimesNonPoly = getClickTimesNonPoly(sections)
	const clickTimesPoly = getClickTimesPoly(sections)

	const strongPlayer = new Tone.Player(selectedSamples[0].strong.url).toDestination()
	const weakPlayer = new Tone.Player(selectedSamples[0].weak.url).toDestination()

	const playClickTrack = () => {
		Tone.start()
		clickTimesPoly.map(ct => {
			return { ...ct, time: ct.time + Tone.now() }
		}).forEach(click => {
			if (click.downBeat) {
				strongPlayer.start(click.time)
			} else {
				weakPlayer.start(click.time)
			}
		})
	}

	return (
		<div>
			<button onClick={playClickTrack}>Play</button>
		</div>
	)
}

export default Controls