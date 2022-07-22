import { useSelector } from 'react-redux'
import DownloadLink from './DownloadLink'
import clicktrackService from '../services/clicktracks'

const Result = ({ playClickTrack, buildClickTrack }) => {
	const sections = useSelector(state => state.sections.sectionList)
	const clickTimes = useSelector(state => state.clickTimes.clickTimes)
	const status = useSelector(state => state.clickTimes.status)

	return (
		<div className='med-top-margin'>
			{sections.length
				? status === 'ready'
					?	<>
						<button onClick={() => playClickTrack(clickTimes)}>Play click track</button>
						<DownloadLink getFile={clicktrackService.getWav} fileFormat={'wav'}/>
						<DownloadLink getFile={clicktrackService.getMidi} fileFormat={'midi'}/>
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