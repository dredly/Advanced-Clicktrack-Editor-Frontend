import allSamples from '../../utils/sampleInfo'
import SampleChoice from './SampleChoice'
import HelpIcon from '../HelpIcon'
import { multipleSamplesHelp } from '../../utils/helpText'
import { useSelector } from 'react-redux'

const SampleChoices = () => {
	const selectedSamplePrimary = useSelector(state => state.samples.samples[0])
	const showHelp = useSelector(state => state.ui.showHelp)

	const allSamplesExceptSelected = allSamples.filter(s => s.strong.value !== selectedSamplePrimary.strong.value)

	return (
		<details>
			<summary>Choose sample(s) for playback</summary>
			<div className='flex-row-container-responsive'>
				<div>
					<h4>Choose primary sample</h4>
					{allSamples.map(s => (
						<SampleChoice sample={s} isSecondary={false} key={s.strong.value}/>
					))}
				</div>
				<div>
					<h4>Choose secondary sample (optional)</h4>
					{showHelp
						? <HelpIcon content={multipleSamplesHelp}/>
						: null
					}
					{allSamplesExceptSelected.map(s => (
						<SampleChoice sample={s} isSecondary={true} key={s.strong.value}/>
					))}
				</div>
			</div>
		</details>
	)
}

export default SampleChoices