import { useSelector } from 'react-redux'

const SampleDisplay = () => {
	const selectedSamples = useSelector(state => state.samples)

	if (!selectedSamples.strong || !selectedSamples.weak) {
		return <h3>No samples selected</h3>
	}

	const strongSample = JSON.parse(selectedSamples.strong)
	const weakSample = JSON.parse(selectedSamples.weak)

	return (
		<div>
			<h3>Currently selected samples</h3>
			<table>
				<tbody>
					<tr>
						<th>Strong beat</th>
						<th>Weak beat</th>
					</tr>
					<tr>
						<td>{strongSample.name}</td>
						<td>{weakSample.name}</td>
					</tr>
				</tbody>
			</table>
		</div>
	)
}

export default SampleDisplay