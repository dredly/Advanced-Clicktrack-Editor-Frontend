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
				<Button component={Link} to="/">
                    Home
				</Button>
			</MenuItem>
			<MenuItem onClick={handleClose}>
				<Button component={Link} to="/login">
                    Login
				</Button>
			</MenuItem>
			<MenuItem onClick={handleClose}>
				<Button component={Link} to="/register">
                    Register
				</Button>
			</MenuItem>
			<MenuItem onClick={handleClose}>
				<Button onClick={handleLogout}>Logout</Button>
			</MenuItem>
		</Menu>
	)
}

export default NavbarMenu