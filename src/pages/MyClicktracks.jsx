import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { initialiseSavedClicktracks } from '../reducers/userReducer'
import { useNavigate } from 'react-router-dom'

import { Container, Typography, List, ListItem, ListItemText, Button } from '@mui/material'

const MyClicktracks = () => {
	const dispatch = useDispatch()
	const navigate = useNavigate()
	const user = useSelector(state => state.user.user)
	const savedClicktracks = useSelector(state => state.user.savedClicktracks)

	useEffect(() => {
		if (!user) {
			navigate('/login')
		} else {
			dispatch(initialiseSavedClicktracks())
		}
	}, [dispatch])

	return (
		<Container>
			<Typography variant="h2" sx={{ marginBlock: '0.3em' }}>
                My Click Tracks
			</Typography>
			<List>
				{
					savedClicktracks.map(sct => (
						<ListItem key={sct.id} secondaryAction={
							<Button edge="end" aria-label="edit-button">
								Edit
							</Button>
						}>
							<ListItemText primary={sct.title}/>
						</ListItem>
					))
				}
			</List>
		</Container>
	)
}

export default MyClicktracks