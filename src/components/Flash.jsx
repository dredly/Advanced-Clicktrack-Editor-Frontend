import { Alert } from '@mui/material'

const Flash = ({ message, severity }) => {
	return <Alert severity={severity}>{message}</Alert>
}

export default Flash