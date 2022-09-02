import { useSelector, useDispatch } from 'react-redux'

import { displayForm } from '../reducers/sectionReducer'

import SectionList from '../components/sections/SectionList'
import Controls from '../components/Controls'
import Extras from '../components/Extras'
import Visualiser from '../components/sections/Visualiser'

import { Container, Grid, Box } from '@mui/material'

const MainPage = () => {
	const dispatch = useDispatch()

	const showVisualisation = useSelector(state => state.ui.showVisualisation)

	const showFormHere = (location, type) => {
		dispatch(displayForm({ location, type }))
	}

	const hideForm = type => {
		dispatch(displayForm({ location: NaN, type }))
	}

	return (
		<>
			<Container>
				<Controls/>
				<Grid container spacing={2} justifyContent="space-between">
					<Grid item s={9} sx={{ flexGrow: 1 }}>
						<SectionList showFormHere={showFormHere} hideForm={hideForm}/>
					</Grid>
					<Grid item s={3}>
						<Extras />
					</Grid>
				</Grid>
			</Container>
			<Box sx={{ display: 'flex', justifyContent: 'center' }}>
				{showVisualisation
					? <Visualiser />
					: null
				}
			</Box>
		</>
	)
}

export default MainPage