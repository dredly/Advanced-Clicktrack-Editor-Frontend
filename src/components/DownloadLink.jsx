import { useState } from 'react'
import clicktrackService from '../services/clicktracks'

import { Button, LinearProgress, Link } from '@mui/material'

const DownloadLink = ({ fileFormat, sendInfo }) => {
	const [url, setUrl] = useState('')

	const handleDownload = async () => {
		setUrl('...loading')
		const result = await clicktrackService.getFile(sendInfo, fileFormat)
		setUrl(result.url)
	}

	return (
		<div>
			<Button onClick={handleDownload}>{fileFormat}</Button>
			{url
				? url === '...loading'
					? <LinearProgress />
					: <span>
						<Link href={url} target="_blank" rel="noopener noreferrer">Download {fileFormat}</Link>
					</span>
				: null
			}
		</div>
	)
}

export default DownloadLink