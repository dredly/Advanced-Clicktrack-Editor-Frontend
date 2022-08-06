import { useState } from 'react'
import clicktrackService from '../services/clicktracks'

const DownloadLink = ({ fileFormat, sendInfo }) => {
	const [url, setUrl] = useState('')

	const handleDownload = async () => {
		setUrl('...loading')
		const result = await clicktrackService.getFile(sendInfo, fileFormat)
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