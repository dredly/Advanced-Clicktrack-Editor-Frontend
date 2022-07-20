import { useSelector } from 'react-redux'

const SampleDisplay = () => {
	const selectedSamples = useSelector(state => state.samples)
	const strongSample = JSON.parse(selectedSamples.strong)
	const weakSample = JSON.parse(selectedSamples.weak)
	console.log(strongSample,weakSample)

	return (
		<div>
			<h3>Currently selected samples</h3>
			<p>ADD A TABLE HERE</p>
		</div>
	)
}

export default SampleDisplay