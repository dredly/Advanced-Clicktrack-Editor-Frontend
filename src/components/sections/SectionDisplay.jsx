import { useSelector } from 'react-redux'
import SectionForm from '../forms/SectionForm/SectionForm'
import SectionTable from './SectionTable'
import ContentInAccordion from '../ContentInAccordion'

import { ButtonGroup, Button, Card, CardActions, CardContent, Box, Typography } from '@mui/material'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd'

const SectionDisplay = ({ section, idx, handlers }) => {
	const formInfo = useSelector(state => state.sections.form)

	return (
		<div>
			<Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'flex-start' }}>
				<Card variant='elevation' elevation={3} sx={{ width: 'fit-content', minWidth: '360px' }}>
					{/* <CardHeader title={`Section ${idx + 1}`} /> */}
					<CardContent>
						<ContentInAccordion expand={true} summaryText={
							<Typography variant='h5'>
								{`Section ${idx + 1}`}
							</Typography>
						}>
							<SectionTable section={section}/>
						</ContentInAccordion>
					</CardContent>
					<CardActions>
						<ButtonGroup>
							<Button
								onClick={() => handlers.showFormHere(idx + 1, 'edit')}
								variant="outlined"
								color="secondary"
								startIcon={<EditIcon />}
							>
						Edit
							</Button>
							<Button
								onClick={idx => handlers.handleDelete(idx)}
								variant="outlined"
								color="error"
								startIcon={<DeleteIcon />}
							>
						Delete
							</Button>
						</ButtonGroup>
					</CardActions>
				</Card>
				<div>
					{formInfo.location === idx + 1
						? formInfo.type === 'create'
							?
							<SectionForm hideSelf={() => handlers.hideForm('create')} />
							:
							<SectionForm
								hideSelf={() => handlers.hideForm('edit')}
								existingData={section}
							/>
						: null
					}
				</div>
			</Box>
			<Button onClick={() => handlers.showFormHere(idx + 1, 'create')} variant="outlined" startIcon={<PlaylistAddIcon />}>
				Add here
			</Button>
		</div>
	)
}

export default SectionDisplay