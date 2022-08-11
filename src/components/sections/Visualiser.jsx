import { useDispatch, useSelector } from 'react-redux'
import { toggleVisualisation } from '../../reducers/uiReducer'
import FullTempoGraphSymbolic from './FullTempoGraphSymbolic'
import FullTempoGraphPhysical from './FullTempoGraphPhysical'
import { getFullTempoDataSymbolic, getFullTempoDataPhysical } from '../../utils/tempoCurveCalculator'
import { getClickTimesNonPoly } from '../../utils/clickTimesCalculator'

const Visualiser = () => {
	const dispatch = useDispatch()
	const showVisualisation = useSelector(state => state.ui.showVisualisation)
	const sections = useSelector(state => state.sections.sectionList)

	const fullTempoDataSymbolic = getFullTempoDataSymbolic(sections)

	const clickTimesNonPoly = getClickTimesNonPoly(sections, true)
	const fullTempoDataPhysical = getFullTempoDataPhysical(clickTimesNonPoly, sections)
	console.log('fullTempoDataPhysical', fullTempoDataPhysical)

	return (
		<div>
			<button onClick={() => {dispatch(toggleVisualisation())}}>Visualise tempo</button>
			{(showVisualisation
				? <>
					<h3>Tempo Visualisation</h3>
					<h4>Symbolic Time (notes)</h4>
					<FullTempoGraphSymbolic dataPoints={fullTempoDataSymbolic.dataPoints} sectionBoundaries={fullTempoDataSymbolic.sections}/>
					<h4>Physical Time (seconds)</h4>
					<FullTempoGraphPhysical dataPoints={fullTempoDataPhysical.dataPoints} sectionBoundaries={fullTempoDataPhysical.sections} />
				</>
				: null
			)}
		</div>
	)
}

export default Visualiser