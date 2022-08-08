import * as Tone from 'tone'
import { useSelector, useDispatch } from 'react-redux'
import DownloadLink from './DownloadLink'
import HelpIcon from './HelpIcon'
import { fileFormatsHelp } from '../utils/helpText'
import { togglePlaying } from '../reducers/clickTimesReducer'

const Result = ({ buildClickTrack }) => {
	const dispatch = useDispatch()

	const sections = useSelector(state => state.sections.sectionList)
	const clickTimes = useSelector(state => state.clickTimes.timeArray)
	const clickTimesNonPoly = useSelector(state => state.clickTimes.clickTimesNonPoly)
	const status = useSelector(state => state.clickTimes.status)
	const selectedSamples = useSelector(state => state.samples.samples)
	const selectedSampleValues = useSelector(state => state.samples.samples.map(s => s.strong.value))
	const showHelp = useSelector(state => state.ui.showHelp)

	const timeSigData = sections.map(s => ({ numMeasures: s.numMeasures, numBeats: s.numBeats }))

	const strongPlayer = new Tone.Player().toDestination()
	const weakPlayer = new Tone.Player().toDestination()
	const secondaryPlayer = new Tone.Player().toDestination()

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

	const playClickTrack = async (times) => {
		let strongSampleUrl
		let weakSampleUrl

		console.log('selectedSamples inside playClickTrack', selectedSamples)

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
		dispatch(togglePlaying())
		console.log('times',times)
		times.map(t => {
			return { ...t, time: t.time + Tone.now() }
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
		const bpmAtEnd = sections[sections.length - 1].bpm
		const finalInterval = 60 / bpmAtEnd
		const finalTime = times[times.length - 1].time
		setTimeout(() => {
			dispatch(togglePlaying())
		}, (finalTime + finalInterval) * 1000) //Convert to ms
	}

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