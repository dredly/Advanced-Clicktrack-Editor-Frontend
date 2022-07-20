import { useEffect, useState } from 'react'
import sampleService from '../services/samples'

const SampleSelection = () => {
	const [samples, setSamples] = useState([])
	useEffect(() => {
		sampleService.getSamples().then(result => setSamples(result.data))
		console.log(samples)
	}, [])

	const handleSubmit =evt => {
		evt.preventDefault()
	}

	return (
		<form onSubmit={handleSubmit}>
			<div>
				<label>Select sample for strong beats
					<input type="text" />
				</label>
			</div>
			<div>
				<label>Select sample for weak beats
					<input type="text" />
				</label>
			</div>
			<button type="submit">Confirm</button>
		</form>
	)
}

export default SampleSelection