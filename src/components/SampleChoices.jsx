import allSamples from '../utils/sampleInfo'
import SampleChoice from './SampleChoice'

const SampleChoices = () => {
	return (
		<details className='med-top-margin'>
			{/* TODO: Find good way for mobile users to select second sample */}
			<summary>Choose a sample for playback</summary>
			You can select up to 2 samples. The second sample will be used for the weak beats. Shift-click to select a second one.
			{allSamples.map(s => (
				<SampleChoice sample={s} key={s.strong.value}/>
			))}
		</details>
	)
}

export default SampleChoices