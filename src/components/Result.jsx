import { useSelector } from 'react-redux'
import DownloadLink from './DownloadLink'
import HelpIcon from './HelpIcon'
import { fileFormatsHelp } from '../utils/helpText'

const Result = ({ playClickTrack, buildClickTrack }) => {
	const sections = useSelector(state => state.sections.sectionList)
	const clickTimes = useSelector(state => state.clickTimes.timeArray)
	const clickTimesNonPoly = useSelector(state => state.clickTimes.clickTimesNonPoly)
	const status = useSelector(state => state.clickTimes.status)
	const selectedSampleValues = useSelector(state => state.samples.samples.map(s => s.strong.value))
	const showHelp = useSelector(state => state.ui.showHelp)

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
		instruments: selectedSampleValues
	}

	const formats = ['wav', 'flac', 'ogg']

	console.log('clickTimes from Result.jsx', clickTimes)

	return (
		<div className='med-top-margin'>
			{sections.length
				? status === 'ready'
					?	<>
						<div className='small-bottom-margin'>
							<button onClick={() => playClickTrack(clickTimes)}>Play click track</button>
						</div>
						{(showHelp
							? <HelpIcon content={fileFormatsHelp}/>
							: null
						)}
						<div>
							<DownloadLink
								fileFormat={'midi'}
								sendInfo={midiData}
							/>
							{formats.map(f => (
								<DownloadLink fileFormat={f} sendInfo={audioData} key={f} />
							))}
						</div>
					</>
					:   <button onClick={() => buildClickTrack()}>{status === 'not_created'
						? 'Create click track'
						: 'Update click track'}
					</button>
				: null
			}
		</div>
	)
}

export default Result