import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import { Menu, MenuItem, Button } from '@mui/material'

const NavbarMenu = ({ anchorEl, handleClose, handleHome, handleLogout }) => {

	const user = useSelector(state => state.user.user)

	return (
		<Menu
			id="menu-appbar"
			anchorEl={anchorEl}
			keepMounted
			open={Boolean(anchorEl)}
			onClose={handleClose}
		>
			<MenuItem onClick={handleClose} sx={{ display: { sm: 'none' } }}>
				<Button onClick={handleHome} component={Link} to="/">
                    Home
				</Button>
			</MenuItem>
			{user
				? <div>
					<MenuItem onClick={handleClose}>
						<Button component={Link} to="/myclicktracks">
                            My Clicktracks
						</Button>
					</MenuItem>
					<MenuItem onClick={handleClose}><Button onClick={handleLogout}>Logout</Button></MenuItem>
				</div>
				: <div>
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
				</div>
			}
		</Menu>
	)
}

export default NavbarMenu