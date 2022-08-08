import allSamples from '../../utils/sampleInfo'
import SampleChoice from './SampleChoice'
import HelpIcon from '../HelpIcon'
import { useSelector } from 'react-redux'
import { multipleSamplesHelp } from '../../utils/helpText'

const SampleChoices = ({ rebuild }) => {
	const showHelp = useSelector(state => state.ui.showHelp)

	return (
		<details className='med-top-margin'>
			{/* TODO: Find good way for mobile users to select second sample */}
			<summary>Choose a sample for playback</summary>
			You can select up to 2 samples. Shift-click to select a second sample.
			{(showHelp
				? <HelpIcon content={multipleSamplesHelp}/>
				: null
			)}
			{allSamples.map(s => (
				<SampleChoice sample={s} rebuild={rebuild} key={s.strong.value}/>
			))}
		</details>
	)
}

export default SampleChoices