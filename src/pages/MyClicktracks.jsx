import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { initialiseCurrentClicktrack } from '../reducers/sectionReducer'
import { initialiseSavedClicktracks, setCurrentlyEditing } from '../reducers/userReducer'
import { useNavigate, Link } from 'react-router-dom'
import DeleteConfirmation from '../components/DeleteConfirmation'

import { Container, Typography, List, ListItem, ListItemText, Button, ButtonGroup } from '@mui/material'

const MyClicktracks = () => {
	const dispatch = useDispatch()
	const navigate = useNavigate()
	const user = useSelector(state => state.user.user)
	const savedClicktracks = useSelector(state => state.user.savedClicktracks)
	const [open, setOpen] = useState(false)
	const [id, setId] = useState(null)

	useEffect(() => {
		if (!user) {
			navigate('/login')
		} else {
			dispatch(initialiseSavedClicktracks())
		}
	}, [dispatch])

	const fetchClicktrack = id => {
		console.log(`Fetching clicktrack with id = ${id}`)
		dispatch(initialiseCurrentClicktrack(id))
		dispatch(setCurrentlyEditing(id))
	}

	const handleDeleteDialogue = (id) => {
		setOpen(true)
		setId(id)
	}

	const handleClose = () => {
		setOpen(false)
	}

	return (
		<Container>
			<Typography variant="h2" sx={{ marginBlock: '0.3em' }}>
                My Click Tracks
			</Typography>
			<List>
				{
					savedClicktracks.map(sct => (
						<ListItem key={sct.id} secondaryAction={
							<ButtonGroup edge="end">
								<Button color="error" onClick={() => handleDeleteDialogue(sct.id)}>
									Delete
								</Button>
								<Button
									aria-label="edit-button"
									component={Link}
									to={`/myclicktracks/${sct.id}`}
									onClick={() => fetchClicktrack(sct.id)}
								>
									Edit
								</Button>
							</ButtonGroup>
						}>
							<ListItemText primary={sct.title}/>
						</ListItem>
					))
				}
			</List>
			<DeleteConfirmation open={open} onClose={handleClose} id={id}/>
		</Container>
	)
}

export default MyClicktracks