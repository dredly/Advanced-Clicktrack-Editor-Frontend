import { deleteClicktrack } from '../reducers/userReducer'
import { useDispatch } from 'react-redux'

import DialogTitle from '@mui/material/DialogTitle'
import Dialog from '@mui/material/Dialog'
import { Button, ButtonGroup } from '@mui/material'

const DeleteConfirmation = ({ open, onClose, id }) => {
	const dispatch = useDispatch()

	const handleDelete = () => {
		console.log('Id inside handleDelete', id)
		console.log('Deleting')
		dispatch(deleteClicktrack(id))
		onClose()
	}

	return (
		<Dialog onClose={onClose} open={open}>
			<DialogTitle>Permanently delete this clicktrack?</DialogTitle>
			<ButtonGroup sx={{ display: 'flex', justifyContent: 'stretch' }}>
				<Button fullWidth variant="contained" color="error" onClick={handleDelete}>
                    Delete
				</Button>
				<Button fullWidth variant="contained" onClick={onClose}>
                    Cancel
				</Button>
			</ButtonGroup>
		</Dialog>
	)
}

export default DeleteConfirmation