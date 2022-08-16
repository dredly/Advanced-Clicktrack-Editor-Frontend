import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt'

const SectionTable = ({ section }) => {
	const isPolyrhythm = section.rhythms.length > 1
	const isTempoChange = section.rhythms[0].bpms[0] !== section.rhythms[0].bpms[1]
	const showAccents = !isPolyrhythm && section.rhythms[0].accentedBeats.toString() !== '0'

	return (
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
								</>
								: `${section.rhythms[0].bpms[0] * (4 / section.rhythms[0].timeSig[1])}bpm`
							}
						</TableCell>
					</TableRow>
					{isTempoChange
						? <TableRow>
							<TableCell component="th" variant='head' scope="row">
								MTC
							</TableCell>
							<TableCell align="right">
								{section.overallData.mtc}
							</TableCell>
						</TableRow>
						: null
					}
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
	)
}

export default SectionTable