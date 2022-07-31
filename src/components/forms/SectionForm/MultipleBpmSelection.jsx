import { useState } from 'react'
import { useSelector } from 'react-redux'
import TempoCurveGraph from './TempoCurveGraph'
import HelpIcon from '../../HelpIcon'
import { mtcHelp } from '../../../utils/helpText'

const MultipleBpmSelection = ({ defaultBpm, defaultMeanTempoCondition }) => {
	const [currentMtc, setCurrentMtc] = useState(defaultMeanTempoCondition)
	const [currentStartBpm, setCurrentStartBpm] = useState(defaultBpm.start)
	const [currentEndBpm, setCurrentEndBpm] = useState(defaultBpm.end)

	const showHelp = useSelector(state => state.ui.showHelp)

	return (
		<>
			<label>Select a bpm for start of section
				<input
					key="changestartbpm"
					type="number"
					min={20} max={400}
					name="bpm"
					defaultValue={Number(defaultBpm.start)}
					onChange={({ target }) => setCurrentStartBpm(Number(target.value))}
				/>
			</label>
			<label>Select a bpm for end of section
				<input
					key="changeendbpm"
					type="number"
					min={20} max={400}
					name="bpmEnd"
					defaultValue={Number(defaultBpm.end)}
					onChange={({ target }) => setCurrentEndBpm(Number(target.value))}
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
				{(showHelp
					? <HelpIcon content={mtcHelp}/>
					: null
				)}
				<TempoCurveGraph dataPoints={[
					{ x: 0, y: currentStartBpm },
					{ x: currentMtc, y: currentStartBpm + 0.5 * (currentEndBpm - currentStartBpm) },
					{ x: 1, y: currentEndBpm },
				]}/>
			</div>
		</>
	)
}

export default MultipleBpmSelection