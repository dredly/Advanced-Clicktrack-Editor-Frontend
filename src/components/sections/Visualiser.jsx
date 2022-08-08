import { useDispatch, useSelector } from 'react-redux'
import { toggleVisualisation } from '../../reducers/uiReducer'
import FullTempoGraph from './FullTempoGraph'
import { getFullTempoData } from '../../utils/tempoCurveCalculator'

const Visualiser = () => {
	const dispatch = useDispatch()
	const showVisualisation = useSelector(state => state.ui.showVisualisation)
	const sections = useSelector(state => state.sections.sectionList)

	const fullTempoData = getFullTempoData(sections)
	console.log(fullTempoData)

	return (
		<div>
			<button onClick={() => {dispatch(toggleVisualisation())}}>Visualise tempo</button>
			{(showVisualisation
				? <>
					<h3>Tempo Visualisation</h3>
					<FullTempoGraph dataPoints={fullTempoData.dataPoints} sectionBoundaries={fullTempoData.sections}/>
				</>
				: null
			)}
		</div>
	)
}

export default Visualiser