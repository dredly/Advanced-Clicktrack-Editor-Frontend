import RegisterForm from '../components/forms/RegisterForm/RegisterForm'

import { Container, Typography } from '@mui/material'

const RegisterPage = () => {
	return (
		<Container>
			<Typography variant="h2">
				Register
				<RegisterForm />
			</Typography>
		</Container>
	)
}

export default RegisterPage