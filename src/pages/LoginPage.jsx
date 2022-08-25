import { Container, Typography } from '@mui/material'
import LoginForm from '../components/forms/LoginForm/LoginForm'

const LoginPage = () => {
	return (
		<Container>
			<Typography variant="h2" sx={{ marginBlock: '0.3em' }}>
				Login
			</Typography>
			<LoginForm />
		</Container>
	)
}

export default LoginPage