import DownloadLink from './DownloadLink'
import { useSelector } from 'react-redux'
import { getClickTimesNonPoly } from '../utils/clickTimesCalculator'

const FileExport = () => {
	const sections = useSelector(state => state.sections.sectionList)
	const selectedSampleValues = useSelector(state => state.samples.samples.map(s => s.strong.value))

	const clickTimesNonPoly = getClickTimesNonPoly(sections)

	const midiData = {
		noteBpms: clickTimesNonPoly.map(note => note.bpm),
		sectionData: sections
	}

	// For files with actual audio data, i.e. wav and ogg, the backend needs to know which
	// instrument to use for synthesis
	const audioData = {
		...midiData,
		instruments: selectedSampleValues
	}

	const audioFormats = ['wav', 'flac']

	return (
		<>
			<DownloadLink fileFormat='midi' sendInfo={midiData}/>
			{audioFormats.map(af => (
				<DownloadLink fileFormat={af} sendInfo={audioData} key={af} />
			))}
		</>
	)
}

export default FileExport