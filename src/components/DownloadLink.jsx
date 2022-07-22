import { useState } from 'react'
import { useSelector } from 'react-redux'

const DownloadLink = ({ getFile, fileFormat }) => {
	const [url, setUrl] = useState('')

	const clickTimes = useSelector(state => state.clickTimes.clickTimes)

	const handleDownload = async () => {
		setUrl('...loading')
		// The backend needs times for making a wav file, but bpm for making
		// a midi file
		const result = await getFile(clickTimes.map(note => {
			if (fileFormat === 'wav') {
				return { time: note.time, downBeat: note.downBeat }
			}
			if (fileFormat === 'midi') {
				return { bpm: note.bpm, downBeat: note.downBeat }
			}
		}))
		setUrl(result.url)
	}

	return (
		<div>
			<button onClick={handleDownload}>Export to {fileFormat} file</button>
			{url
				? url === '...loading'
					? <p>...loading</p>
					: <div>
						<a href={url} target="_blank" rel="noopener noreferrer">{url}</a>
					</div>
				: null
			}
		</div>
	)
}

export default DownloadLink