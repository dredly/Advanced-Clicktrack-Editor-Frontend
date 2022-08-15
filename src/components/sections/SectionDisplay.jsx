import { useSelector } from 'react-redux'
import SectionForm from '../forms/SectionForm/SectionForm'

import { ButtonGroup, Button, Card, CardActions, CardContent, CardHeader, Box } from '@mui/material'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd'
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt'

const SectionDisplay = ({ section, idx, handlers }) => {
	const formInfo = useSelector(state => state.sections.form)

	const isPolyrhythm = section.rhythms.length > 1
	const isTempoChange = section.rhythms[0].bpms[0] !== section.rhythms[0].bpms[1]
	const showAccents = !isPolyrhythm && section.rhythms[0].accentedBeats.toString() !== '0'

	return (
		<div>
			<Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
				<Card variant='elevation' elevation={3} sx={{ width: 'fit-content', minWidth: '360px' }}>
					<CardHeader title={`Section ${idx + 1}`} />
					<CardContent>
						{/* <div>
							{section.overallData.numMeasures} measures
							{section.rhythms[0].timeSig[0]}:{section.rhythms[0].timeSig[1]} time
							Accents on beats {section.rhythms[0].accentedBeats.map(beatIdx => beatIdx + 1).join(', ')}
							{isPolyrhythm
								? <p>secondary rhythm in {section.rhythms[1].timeSig[0]}:{section.rhythms[1].timeSig[1]} time</p>
								: null
							}
							{isTempoChange
								? <>
									<p>
								Tempo change from
										{section.rhythms[0].bpms[0] * (4 / section.rhythms[0].timeSig[1])}bpm to
										{section.rhythms[0].bpms[1] * (4 / section.rhythms[0].timeSig[1])}bpm
									</p>
									<p>
								Mean tempo condition = {section.overallData.mtc}
									</p>
								</>
								: `tempo = ${section.rhythms[0].bpms[0] * (4 / section.rhythms[0].timeSig[1])}bpm`
							}
						</div> */}
						<TableContainer component={Paper}>
							<Table aria-label="simple table">
								<TableBody>
									{showAccents
										? <TableRow>
											<TableCell component="th" variant='head' scope="row">
											Accented beats
											</TableCell>
											<TableCell align="right">
												{section.rhythms[0].accentedBeats.map(ab => ab + 1).join(', ')}
											</TableCell>
										</TableRow>
										: null
									}
									<TableRow>
										<TableCell component="th" variant='head' scope="row">
											Length
										</TableCell>
										<TableCell align="right">{section.overallData.numMeasures} measures</TableCell>
									</TableRow>
									<TableRow>
										<TableCell component="th" variant='head' scope="row">
											Time Signature
										</TableCell>
										<TableCell align="right">
											{section.rhythms[0].timeSig[0]}:{section.rhythms[0].timeSig[1]} time
										</TableCell>
									</TableRow>
									<TableRow>
										<TableCell component="th" variant='head' scope="row">
											Tempo
										</TableCell>
										<TableCell align="right">
											{isTempoChange
												? <>
													<p>
														<span>{section.rhythms[0].bpms[0] * (4 / section.rhythms[0].timeSig[1])}bpm</span>
														<ArrowRightAltIcon sx={{
															transform: 'translate(0, 0.25em)'
														}} />
														<span>{section.rhythms[0].bpms[1] * (4 / section.rhythms[0].timeSig[1])}bpm</span>
													</p>
													<p>mtc = {section.overallData.mtc}</p>
												</>
												: `${section.rhythms[0].bpms[0] * (4 / section.rhythms[0].timeSig[1])}bpm`
											}
										</TableCell>
									</TableRow>
									{isPolyrhythm
										? <TableRow>
											<TableCell component="th" variant='head' scope="row">
											Polyrhythm
											</TableCell>
											<TableCell align="right">
												{section.rhythms[1].timeSig[0]}:{section.rhythms[1].timeSig[1]} time
											</TableCell>
										</TableRow>
										: null
									}
								</TableBody>
							</Table>
						</TableContainer>
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