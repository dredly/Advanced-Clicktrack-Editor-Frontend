import RegisterForm from '../components/forms/RegisterForm/RegisterForm'

import { Container, Typography } from '@mui/material'

const RegisterPage = () => {
	return (
		<Container>
			<Typography variant="h2" sx={{ marginBlock: '0.3em' }}>
				Register
			</Typography>
			<RegisterForm />
		</Container>
	)
}

export default RegisterPage