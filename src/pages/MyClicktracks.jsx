import { Container, Typography } from '@mui/material'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const MyClicktracks = () => {
	const navigate = useNavigate()
	const user = useSelector(state => state.user.user)

	useEffect(() => {
		if (!user) {
			navigate('/login')
		}
	}, [])

	return (
		<Container>
			<Typography variant="h2" sx={{ marginBlock: '0.3em' }}>
                My Click Tracks
			</Typography>
		</Container>
	)
}

export default MyClicktracks