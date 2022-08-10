import { useDispatch, useSelector } from 'react-redux'
import { toggleVisualisation } from '../../reducers/uiReducer'
import FullTempoGraph from './FullTempoGraph'
import { getFullTempoDataSymbolic, getFullTempoDataPhysical } from '../../utils/tempoCurveCalculator'

const Visualiser = () => {
	const dispatch = useDispatch()
	const showVisualisation = useSelector(state => state.ui.showVisualisation)
	const sections = useSelector(state => state.sections.sectionList)

	const fullTempoDataSymbolic = getFullTempoDataSymbolic(sections)
	const fullTempoDataPhysical = getFullTempoDataPhysical(sections)
	console.log('fullTempoDataPhysical', fullTempoDataPhysical)

	return (
		<div>
			<button onClick={() => {dispatch(toggleVisualisation())}}>Visualise tempo</button>
			{(showVisualisation
				? <>
					<h3>Tempo Visualisation</h3>
					<h4>Symbolic Time (notes)</h4>
					<FullTempoGraph dataPoints={fullTempoDataSymbolic.dataPoints} sectionBoundaries={fullTempoDataSymbolic.sections}/>
					<h4>Physical Time (seconds)</h4>
					{/* <FullTempoGraph dataPoints={fullTempoData.dataPoints} sectionBoundaries={fullTempoData.sections}/> */}
				</>
				: null
			)}
		</div>
	)
}

export default Visualiser