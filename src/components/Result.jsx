import { useSelector } from 'react-redux'
import DownloadLink from './DownloadLink'

const Result = ({ playClickTrack, buildClickTrack }) => {
	const sections = useSelector(state => state.sections.sectionList)
	const clickTimes = useSelector(state => state.clickTimes.timeArray)
	const clickTimesNonPoly = useSelector(state => state.clickTimes.clickTimesNonPoly)
	const status = useSelector(state => state.clickTimes.status)
	const selectedSampleValue = useSelector(state => state.samples.samples.strong.value)

	const timeSigData = sections.map(s => ({ numMeasures: s.numMeasures, numBeats: s.numBeats }))

	const midiData = {
		timeSigData,
		tempoData: clickTimesNonPoly.map(note => ({ bpm: note.bpm, downBeat: note.downBeat })),
		sectionData: sections
	}

	// For files with actual audio data, i.e. wav and ogg, the backend needs to know which
	// instrument to use for synthesis
	const audioData = {
		...midiData,
		instrument: selectedSampleValue
	}

	const formats = ['wav', 'flac', 'ogg']

	return (
		<div className='med-top-margin'>
			{sections.length
				? status === 'ready'
					?	<>
						<button onClick={() => playClickTrack(clickTimes)}>Play click track</button>
						<DownloadLink
							fileFormat={'midi'}
							sendInfo={midiData}
						/>
						{formats.map(f => (
							<DownloadLink fileFormat={f} sendInfo={audioData} key={f} />
						))}
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