import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import { Typography } from '@mui/material'

const Navbar = () => {
	return (
		<AppBar>
			<Toolbar>
				<Typography
					variant="h6"
					noWrap
					component="div"
					sx={{ flexGrow: 1, display: { sm: 'block' } }}
				>
            Advanced Click Track Editor
				</Typography>
			</Toolbar>
		</AppBar>
	)
}

export default Navbar