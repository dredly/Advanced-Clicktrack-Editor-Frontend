import allSamples from '../../utils/sampleInfo'
import SampleChoice from './SampleChoice'
import { useSelector } from 'react-redux'

const SampleChoices = () => {
	const selectedSamplePrimary = useSelector(state => state.samples.samples[0])
	const allSamplesExceptSelected = allSamples.filter(s => s.strong.value !== selectedSamplePrimary.strong.value)

	return (
		<details>
			{/* TODO: Find good way for mobile users to select second sample */}
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
					{allSamplesExceptSelected.map(s => (
						<SampleChoice sample={s} isSecondary={true} key={s.strong.value}/>
					))}
				</div>
			</div>
		</details>
	)
}

export default SampleChoices