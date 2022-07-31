import { useSelector } from 'react-redux'
import DownloadLink from './DownloadLink'
import clicktrackService from '../services/clicktracks'

const Result = ({ playClickTrack, buildClickTrack }) => {
	const sections = useSelector(state => state.sections.sectionList)
	const clickTimes = useSelector(state => state.clickTimes.clickTimes)
	const status = useSelector(state => state.clickTimes.status)
	// const selectedSamples = useSelector(state => state.samples.samples)

	// const strongSampleUrl = JSON.parse(selectedSamples.strong).url
	// const weakSampleUrl = JSON.parse(selectedSamples.weak).url

	const timeSigData = sections.map(s => ({ numMeasures: s.numMeasures, numBeats: s.numBeats }))

	// const wavData = {
	// 	sampleData: { strongUrl: strongSampleUrl, weakUrl: weakSampleUrl },
	// 	timeData: clickTimes.map(note => ({ time: note.time, downBeat: note.downBeat }))
	// }

	const midiData = {
		timeSigData,
		tempoData: clickTimes.map(note => ({ bpm: note.bpm, downBeat: note.downBeat }))
	}

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
							sendInfo={midiData}
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