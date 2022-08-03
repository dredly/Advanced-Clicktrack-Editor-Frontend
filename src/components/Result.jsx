import { useSelector } from 'react-redux'
import DownloadLink from './DownloadLink'
import clicktrackService from '../services/clicktracks'

const Result = ({ playClickTrack, buildClickTrack }) => {
	const sections = useSelector(state => state.sections.sectionList)
	const clickTimes = useSelector(state => state.clickTimes.timeArray)
	const clickTimesNonPoly = useSelector(state => state.clickTimes.clickTimesNonPoly)
	const status = useSelector(state => state.clickTimes.status)
	const selectedSampleValue = useSelector(state => state.samples.samples.strong.value)

	const timeSigData = sections.map(s => ({ numMeasures: s.numMeasures, numBeats: s.numBeats }))

	const midiData = {
		timeSigData,
		// TODO: need to pass clicktime data only for the primary rhythm
		tempoData: clickTimesNonPoly.map(note => ({ bpm: note.bpm, downBeat: note.downBeat })),
		sectionData: sections
	}

	// Hardcode instrument for testing
	const wavData = {
		...midiData,
		instrument: selectedSampleValue
	}

	console.log('clickTimes', clickTimes)
	console.log('clickTimesNonPoly', clickTimesNonPoly)

	return (
		<div className='med-top-margin'>
			{sections.length
				? status === 'ready'
					?	<>
						<button onClick={() => playClickTrack(clickTimes)}>Play click track</button>
						<DownloadLink
							getFile={clicktrackService.getWav}
							fileFormat={'wav'}
							// Switch to sending midi data to test conversion on backend
							sendInfo={wavData}
						/>
						<DownloadLink
							getFile={clicktrackService.getMidi}
							fileFormat={'midi'}
							sendInfo={midiData}
						/>
					</>
					:   <button onClick={buildClickTrack}>{status === 'not_created'
						? 'Create click track'
						: 'Update click track'}
					</button>
				: null
			}
		</div>
	)
}

export default Result