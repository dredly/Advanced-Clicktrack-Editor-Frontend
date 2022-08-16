import allSamples from '../../utils/sampleInfo'
import SampleChoice from './SampleChoice'
import HelpIcon from '../HelpIcon'
import { multipleSamplesHelp } from '../../utils/helpText'
import { useSelector } from 'react-redux'
import { useState } from 'react'

import { Menu, Button } from '@mui/material'

const SampleChoices = () => {
	const selectedSamplePrimary = useSelector(state => state.samples.samples[0])
	const showHelp = useSelector(state => state.ui.showHelp)

	const [anchorEl1, setAnchorEl1] = useState(null)
	const open1 = Boolean(anchorEl1)
	const handleClick1 = (event) => {
		setAnchorEl1(event.currentTarget)
	}
	const handleClose1 = () => {
		setAnchorEl1(null)
	}

	const [anchorEl2, setAnchorEl2] = useState(null)
	const open2 = Boolean(anchorEl2)
	const handleClick2 = (event) => {
		setAnchorEl2(event.currentTarget)
	}
	const handleClose2 = () => {
		setAnchorEl2(null)
	}

	const allSamplesExceptSelected = allSamples.filter(s => s.strong.value !== selectedSamplePrimary.strong.value)

	return (
		<div>
			<div>
				<Button
					id="basic-button1"
					aria-controls={open1 ? 'basic-menu1' : undefined}
					aria-haspopup="true"
					aria-expanded={open1 ? 'true' : undefined}
					onClick={handleClick1}
				>
					Primary
				</Button>
				{showHelp
					? <HelpIcon content={multipleSamplesHelp}/>
					: null
				}
				<Menu
					id="basic-menu1"
					anchorEl={anchorEl1}
					open={open1}
					onClose={handleClose1}
					MenuListProps={{
						'aria-labelledby': 'basic-button1',
					}}
				>
					{allSamples.map(s => (
						<SampleChoice key={s.strong.value} sample={s} isSecondary={false}/>
					))}
				</Menu>
			</div>
			<div>
				<Button
					id="basic-button2"
					aria-controls={open2 ? 'basic-menu2' : undefined}
					aria-haspopup="true"
					aria-expanded={open2 ? 'true' : undefined}
					onClick={handleClick2}
				>
					Secondary (Optional)
				</Button>
				<Menu
					id="basic-menu2"
					anchorEl={anchorEl2}
					open={open2}
					onClose={handleClose2}
					MenuListProps={{
						'aria-labelledby': 'basic-button2',
					}}
				>
					{allSamplesExceptSelected.map(s => (
						<SampleChoice key={s.strong.value} sample={s} isSecondary={true}/>
					))}
				</Menu>
			</div>
		</div>
	)
}

export default SampleChoices