import { Menu, MenuItem, Button } from '@mui/material'
import { Link } from 'react-router-dom'

const NavbarMenu = ({ anchorEl, handleClose }) => {

	const handleLogout = () => {
		window.localStorage.removeItem('loggedInClicktrackUserToken')
	}

	return (
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
			<MenuItem onClick={handleClose}>
				<Button onClick={handleLogout}>Logout</Button>
			</MenuItem>
		</Menu>
	)
}

export default NavbarMenu