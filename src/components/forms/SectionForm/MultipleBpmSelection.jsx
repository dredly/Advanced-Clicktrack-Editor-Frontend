import { useState } from 'react'
import TempoCurveGraph from './TempoCurveGraph'

const MultipleBpmSelection = ({ defaultBpm, defaultMeanTempoCondition }) => {
	const [currentMtc, setCurrentMtc] = useState(defaultMeanTempoCondition)

	return (
		<>
			<label>Select a bpm for start of section
				<input
					key="changestartbpm"
					type="number"
					min={20} max={400}
					name="bpm"
					defaultValue={defaultBpm.start}
				/>
			</label>
			<label>Select a bpm for end of section
				<input
					key="changeendbpm"
					type="number"
					min={20} max={400}
					name="bpmEnd"
					defaultValue={defaultBpm.end}
				/>
			</label>
			<div>
				<label>Adjust the mean tempo condition
					<input
						key="changemtc"
						name="meanTempoCondition"
						type="range"
						min="0.05"
						max="0.95"
						step="0.05"
						defaultValue={defaultMeanTempoCondition}
						onChange={({ target }) => setCurrentMtc(target.value)}
					/>
				</label>
				<TempoCurveGraph dataPoints={[
					{ x: 0, y: 0 },
					{ x: currentMtc, y: 0.5 },
					{ x: 1, y: 1 },
				]}/>
			</div>
		</>
	)
}

export default MultipleBpmSelection