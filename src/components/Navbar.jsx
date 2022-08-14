import { useSelector, useDispatch } from 'react-redux'
import { toggleHelp } from '../reducers/uiReducer'

import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Switch from '@mui/material/Switch'
import { FormControlLabel } from '@mui/material'
import { Typography } from '@mui/material'

const Navbar = () => {
	const dispatch = useDispatch()
	const showHelp = useSelector(state => state.ui.showHelp)

	return (
		<AppBar>
			<Toolbar>
				<Typography
					variant="h6"
					noWrap
					component="div"
					sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
				>
					Advanced Click Track Editor
				</Typography>
				<FormControlLabel
					control={
						<Switch
							checked={showHelp}
							aria-label="login switch"
							onChange={() => dispatch(toggleHelp())}
							color="secondary"
						/>
					}
					label='Toggle Help'
				/>

			</Toolbar>
		</AppBar>
	)
}

export default Navbar