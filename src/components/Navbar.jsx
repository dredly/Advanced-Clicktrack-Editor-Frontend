import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { toggleHelp } from '../reducers/uiReducer'

import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Switch from '@mui/material/Switch'
import { FormControlLabel, Typography, IconButton } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import NavbarMenu from './NavbarMenu'
import { setCurrentlyEditing } from '../reducers/userReducer'
import { setSections } from '../reducers/sectionReducer'

const Navbar = () => {
	const dispatch = useDispatch()
	const showHelp = useSelector(state => state.ui.showHelp)
	const user = useSelector(state => state.user.user)
	const currentlyEditing = useSelector(state => state.user.currentlyEditing)

	const [anchorEl, setAnchorEl] = useState(null)

	const handleMenu = (event) => {
		setAnchorEl(event.currentTarget)
	}

	const handleClose = () => {
		setAnchorEl(null)
	}

	const handleHome = () => {
		if (user && currentlyEditing) {
			dispatch(setCurrentlyEditing(null))
			dispatch(setSections([]))
		}
	}

	return (
		<AppBar position="relative">
			<Toolbar>
				<IconButton
					size="large"
					edge="start"
					color="inherit"
					aria-label="menu"
					aria-controls="menu-appbar"
					aria-haspopup="true"
					sx={{ mr: 2 }}
					onClick={handleMenu}
				>
					<MenuIcon />
				</IconButton>
				<NavbarMenu anchorEl={anchorEl} handleClose={handleClose} handleHome={handleHome}/>
				<Typography
					variant="h6"
					noWrap
					onClick={handleHome}
					component={Link}
					to="/"
					sx={{ flexGrow: 1, color: 'white', textDecoration: 'none', display: { xs: 'none', sm: 'block' } }}
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