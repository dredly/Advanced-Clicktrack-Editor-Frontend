import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import savedClicktrackService from '../../services/savedClicktracks'
import { setFlash } from '../../reducers/uiReducer'

import { TextField, Button } from '@mui/material'

const SaveForm = () => {
	const navigate = useNavigate()
	const dispatch = useDispatch()

	const sections = useSelector(state => state.sections.sectionList)

	const handleSave = async (evt) => {
		evt.preventDefault()
		const clickTrackData = {
			title: evt.target.title.value,
			sections
		}
		await savedClicktrackService.save(clickTrackData)
		navigate('/myclicktracks')
		dispatch(setFlash({ message: `Saved new click track: ${clickTrackData.title}`, severity: 'success' }))
		setTimeout(() => {
			dispatch(setFlash(null))
		}, 3000)
	}

	return (
		<form onSubmit={handleSave}>
			<TextField
				fullWidth
				required
				label="Title"
				name="title"
			/>
			<Button type="submit" variant="outlined" sx={{ marginTop: '0.5em' }}>Save</Button>
		</form>
	)
}

export default SaveForm