import allSamples from '../utils/sampleInfo'
import SampleChoice from './SampleChoice'

const SampleChoices = () => {
	return (
		<div className='med-top-margin'>
			<h3>Choose a sample for playback</h3>
			{allSamples.map(s => (
				<SampleChoice sample={s} key={s.strong.value}/>
			))}
		</div>
	)
}

export default SampleChoices