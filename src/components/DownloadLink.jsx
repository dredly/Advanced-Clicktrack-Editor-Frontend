import { useState } from 'react'
import { useSelector } from 'react-redux/es/exports'
import clicktrackService from '../services/clicktracks'

const DownloadLink = () => {
	const [url, setUrl] = useState('')

	const clickTimes = useSelector(state => state.clickTimes.clickTimes)

	const handleDownload = async () => {
		setUrl('...loading')
		const result = await clicktrackService.sendData(clickTimes)
		setUrl(result.url)
	}

	return (
		<div>
			<button onClick={handleDownload}>Export to wav file</button>
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