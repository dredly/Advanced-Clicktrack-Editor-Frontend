import { useState } from 'react'

const DownloadLink = ({ getFile, fileFormat, sendInfo }) => {
	const [url, setUrl] = useState('')

	const handleDownload = async () => {
		setUrl('...loading')
		const result = await getFile(sendInfo)
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