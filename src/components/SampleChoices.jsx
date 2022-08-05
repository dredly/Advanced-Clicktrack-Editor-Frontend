import allSamples from '../utils/sampleInfo'
import SampleChoice from './SampleChoice'

const SampleChoices = () => {
	return (
		<details className='med-top-margin'>
			<summary>Choose a sample for playback</summary>
			{allSamples.map(s => (
				<SampleChoice sample={s} key={s.strong.value}/>
			))}
		</details>
	)
}

export default SampleChoices