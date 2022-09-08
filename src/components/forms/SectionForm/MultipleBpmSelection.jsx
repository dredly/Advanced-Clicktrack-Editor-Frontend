import { useState } from 'react'
import { useSelector } from 'react-redux'
import TempoCurveGraph from './TempoCurveGraph'
import HelpIcon from '../../HelpIcon'
import { mtcHelp } from '../../../utils/helpText'
import { Box, TextField, Slider, Typography } from '@mui/material'

const MultipleBpmSelection = ({ defaultBpm, defaultMeanTempoCondition }) => {
	const [currentMtc, setCurrentMtc] = useState(defaultMeanTempoCondition)
	const [currentStartBpm, setCurrentStartBpm] = useState(defaultBpm.start)
	const [currentEndBpm, setCurrentEndBpm] = useState(defaultBpm.end)

	const showHelp = useSelector(state => state.ui.showHelp)

	const inputProps = {
		min: 20,
		max: 400
	}

	return (
		<Box sx={{ display: 'block', marginTop: '0.6em' }}>
			<TextField
				type="number"
				name="bpm"
				defaultValue={Number(defaultBpm.start)}
				onChange={({ target }) => setCurrentStartBpm(Number(target.value))}
				inputProps={inputProps}
				label="bpm start"
				required
			/>
			<TextField
				type="number"
				name="bpmEnd"
				defaultValue={Number(defaultBpm.end)}
				onChange={({ target }) => setCurrentEndBpm(Number(target.value))}
				inputProps={inputProps}
				label="bpm end"
				required
			/>
			<div>
				<Typography id="input-slider" sx={{ marginTop: '0.4em' }}>
					Mean Tempo Condition
					{(showHelp
						? <HelpIcon content={mtcHelp}/>
						: null
					)}
				</Typography>
				<Slider
					name="meanTempoCondition"
					min={0.05}
					max={0.95}
					step={0.05}
					valueLabelDisplay="auto"
					defaultValue={defaultMeanTempoCondition}
					onChange={({ target }) => setCurrentMtc(target.value)}
					aria-labelledby="input-slider"
				/>
				<Box sx={{ display: 'flex', justifyContent: 'center' }}>
					<TempoCurveGraph dataPoints={[
						{ x: 0, y: currentStartBpm },
						{ x: currentMtc, y: currentStartBpm + 0.5 * (currentEndBpm - currentStartBpm) },
						{ x: 1, y: currentEndBpm },
					]}/>
				</Box>
			</div>
		</Box>
	)
}

export default MultipleBpmSelection