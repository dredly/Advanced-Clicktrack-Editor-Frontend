import { useSelector } from 'react-redux'
import FullTempoGraphSymbolic from './FullTempoGraphSymbolic'
import FullTempoGraphPhysical from './FullTempoGraphPhysical'
import { getFullTempoDataSymbolic, getFullTempoDataPhysical } from '../../utils/tempoCurveCalculator'
import { getClickTimesNonPoly } from '../../utils/clickTimesCalculator'
import HelpIcon from '../HelpIcon'
import { symbolicTimeHelp, physicalTimeHelp } from '../../utils/helpText'
import { Box, Typography } from '@mui/material'

const Visualiser = () => {
	const showVisualisation = useSelector(state => state.ui.showVisualisation)
	const sections = useSelector(state => state.sections.sectionList)
	const showHelp = useSelector(state => state.ui.showHelp)

	const fullTempoDataSymbolic = getFullTempoDataSymbolic(sections)

	const clickTimesNonPoly = getClickTimesNonPoly(sections, true)
	const fullTempoDataPhysical = getFullTempoDataPhysical(clickTimesNonPoly, sections)

	return (
		<Box sx={{ width: '90%', marginTop: '1rem' }}>
			{(showVisualisation
				? <>
					<Typography variant="h4">Tempo Visualisation</Typography>
					<div className='flex-row-container-responsive center-aligned-flex'>
						<Typography variant="h6">
							<span>Symbolic Time</span>
							{showHelp
								? <HelpIcon content={symbolicTimeHelp}/>
								: null
							}
						</Typography>
					</div>
					<FullTempoGraphSymbolic
						dataPoints={fullTempoDataSymbolic.dataPoints}
						sectionBoundaries={fullTempoDataSymbolic.sections}
						measureData={fullTempoDataSymbolic.measures}
					/>
					<div className='flex-row-container-responsive center-aligned-flex'>
						<Typography variant="h6">
							<span>Physical Time (seconds)</span>
							{showHelp
								? <HelpIcon content={physicalTimeHelp}/>
								: null
							}
						</Typography>
					</div>
					<FullTempoGraphPhysical
						dataPoints={fullTempoDataPhysical.dataPoints}
						sectionBoundaries={fullTempoDataPhysical.sections}
					/>
				</>
				: null
			)}
		</Box>
	)
}

export default Visualiser