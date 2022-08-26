import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import savedClicktrackService from '../../services/savedClicktracks'

import { TextField, Button } from '@mui/material'

const SaveForm = () => {
	const navigate = useNavigate()

	const sections = useSelector(state => state.sections.sectionList)

	const handleSave = async (evt) => {
		evt.preventDefault()
		const clickTrackData = {
			title: evt.target.title.value,
			sections
		}
		await savedClicktrackService.save(clickTrackData)
		navigate('/myclicktracks')
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