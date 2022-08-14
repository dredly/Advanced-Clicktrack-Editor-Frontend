import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { displayForm } from './reducers/sectionReducer'
import clicktrackService from './services/clicktracks'
import SectionList from './components/sections/SectionList'
import Controls from './components/Controls'
// import TestingZone from './components/TestingZone'

import Visualiser from './components/sections/Visualiser'
import Navbar from './components/Navbar'
import Extras from './components/Extras'

import { Container, Grid } from '@mui/material'


const App = () => {
	useEffect(() => {
		clicktrackService.startUp()
	}, [])

	const dispatch = useDispatch()
	const numSections = useSelector(state => state.sections.sectionList.length)

	const showFormHere = (location, type) => {
		dispatch(displayForm({ location, type }))
	}

	const hideForm = type => {
		dispatch(displayForm({ location: NaN, type }))
	}

	return (
		<div>
			<Navbar />
			<Container>
				{/* <TestingZone /> */}
				<Controls/>
				<Grid container spacing={2} justifyContent="space-between">
					<Grid item s={9} sx={{ flexGrow: 1 }}>
						<SectionList showFormHere={showFormHere} hideForm={hideForm}/>
					</Grid>
					<Grid item s={3}>
						<Extras />
					</Grid>
				</Grid>
				{( numSections
					? <Visualiser />
					: null
				)}
			</Container>
		</div>
	)
}

export default App
