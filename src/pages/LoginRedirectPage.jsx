import { Container, Typography } from '@mui/material'
import { Link } from 'react-router-dom'

const LoginRedirectPage = () => {
	return (
		<Container>
			<Typography variant="h3" sx={{ marginBlock: '0.3em' }}>
					You need to be logged in for this.
			</Typography>
			<Typography variant="h6">
				<Link to="/login">Login Now</Link>
			</Typography>
		</Container>
	)
}

export default LoginRedirectPage