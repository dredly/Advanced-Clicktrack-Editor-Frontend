import { useDispatch, useSelector } from 'react-redux'
import { toggleVisualisation } from '../../reducers/uiReducer'
import FullTempoGraphSymbolic from './FullTempoGraphSymbolic'
import FullTempoGraphPhysical from './FullTempoGraphPhysical'
import { getFullTempoDataSymbolic, getFullTempoDataPhysical } from '../../utils/tempoCurveCalculator'
import { getClickTimesNonPoly } from '../../utils/clickTimesCalculator'
import HelpIcon from '../HelpIcon'
import { symbolicTimeHelp, physicalTimeHelp } from '../../utils/helpText'

const Visualiser = () => {
	const dispatch = useDispatch()
	const showVisualisation = useSelector(state => state.ui.showVisualisation)
	const sections = useSelector(state => state.sections.sectionList)
	const showHelp = useSelector(state => state.ui.showHelp)

	const fullTempoDataSymbolic = getFullTempoDataSymbolic(sections)
	console.log('fullTempoDataSymbolic', fullTempoDataSymbolic)

	const clickTimesNonPoly = getClickTimesNonPoly(sections, true)
	const fullTempoDataPhysical = getFullTempoDataPhysical(clickTimesNonPoly, sections)
	console.log('fullTempoDataPhysical', fullTempoDataPhysical)

	return (
		<div>
			<button onClick={() => {dispatch(toggleVisualisation())}}>Visualise tempo</button>
			{(showVisualisation
				? <>
					<h3>Tempo Visualisation</h3>
					<div className='flex-row-container-responsive center-aligned-flex'>
						<h4 className='small-right-margin'>Symbolic Time (notes)</h4>
						{showHelp
							? <HelpIcon content={symbolicTimeHelp}/>
							: null
						}
					</div>
					<FullTempoGraphSymbolic
						dataPoints={fullTempoDataSymbolic.dataPoints}
						sectionBoundaries={fullTempoDataSymbolic.sections}
						measureData={fullTempoDataSymbolic.measures}
					/>
					<div className='flex-row-container-responsive center-aligned-flex'>
						<h4 className='small-right-margin'>Physical Time (seconds)</h4>
						{showHelp
							? <HelpIcon content={physicalTimeHelp}/>
							: null
						}
					</div>
					<FullTempoGraphPhysical
						dataPoints={fullTempoDataPhysical.dataPoints}
						sectionBoundaries={fullTempoDataPhysical.sections}
					/>
				</>
				: null
			)}
		</div>
	)
}

export default Visualiser