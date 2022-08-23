import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { toggleHelp } from '../reducers/uiReducer'

import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Switch from '@mui/material/Switch'
import { FormControlLabel, Typography, IconButton, Menu, MenuItem } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'

const Navbar = () => {
	const dispatch = useDispatch()
	const showHelp = useSelector(state => state.ui.showHelp)
	const [anchorEl, setAnchorEl] = useState(null)

	const handleMenu = (event) => {
		setAnchorEl(event.currentTarget)
	}

	const handleClose = () => {
		setAnchorEl(null)
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
				<Menu
					id="menu-appbar"
					anchorEl={anchorEl}
					keepMounted
					open={Boolean(anchorEl)}
					onClose={handleClose}
				>
					<MenuItem onClick={handleClose} sx={{ display: { sm: 'none' } }}>
						<Link to="/">Home</Link>
					</MenuItem>
					<MenuItem onClick={handleClose}>
						<Link to="/login">Login</Link>
					</MenuItem>
					<MenuItem onClick={handleClose}>
						<Link to="/register">Register</Link>
					</MenuItem>
				</Menu>
				<Typography
					variant="h6"
					noWrap
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