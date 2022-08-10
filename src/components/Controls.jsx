import * as Tone from 'tone'

import { useSelector } from 'react-redux'
import { getClickTimesNonPoly } from '../utils/clickTimesCalculator'

const Controls = () => {
	const sections = useSelector(state => state.sections.sectionList)
	const selectedSamples = useSelector(state => state.samples.samples)

	const clickTimesNonPoly = getClickTimesNonPoly(sections)

	const strongPlayer = new Tone.Player(selectedSamples[0].strong.url).toDestination()
	const weakPlayer = new Tone.Player(selectedSamples[0].weak.url).toDestination()

	const playClickTrack = () => {
		Tone.start()
		clickTimesNonPoly.map(ct => {
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