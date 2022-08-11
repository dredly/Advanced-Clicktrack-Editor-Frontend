import DownloadLink from './DownloadLink'
import HelpIcon from './HelpIcon'
import { useSelector } from 'react-redux'
import { getClickTimesNonPoly } from '../utils/clickTimesCalculator'
import { fileFormatsHelp } from '../utils/helpText'

const FileExport = () => {
	const sections = useSelector(state => state.sections.sectionList)
	const selectedSampleValues = useSelector(state => state.samples.samples.map(s => s.strong.value))
	const showHelp = useSelector(state => state.ui.showHelp)

	const timeSigData = sections.map(s => ({ numMeasures: s.numMeasures, numBeats: s.numBeats }))
	const clickTimesNonPoly = getClickTimesNonPoly(sections)

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

	const audioFormats = ['wav', 'flac', 'ogg']

	return (
		<details>
			<summary>Export to file</summary>
			{showHelp
				? <HelpIcon content={fileFormatsHelp} />
				: null
			}
			<DownloadLink fileFormat='midi' sendInfo={midiData}/>
			{audioFormats.map(af => (
				<DownloadLink fileFormat={af} sendInfo={audioData} key={af} />
			))}
		</details>
	)
}

export default FileExport