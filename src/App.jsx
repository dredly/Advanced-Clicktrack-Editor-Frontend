import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { displayForm } from './reducers/sectionReducer'
import clicktrackService from './services/clicktracks'
import SectionList from './components/sections/SectionList'
import SectionForm from './components/forms/SectionForm/SectionForm'
import SampleChoices from './components/samples/SampleChoices'
import { toggleHelp } from './reducers/uiReducer'
import HelpIcon from './components/HelpIcon'
import Controls from './components/Controls'
// import TestingZone from './components/TestingZone'
import { addToStartHelp } from './utils/helpText'


const App = () => {
	useEffect(() => {
		clicktrackService.startUp()
	}, [])

	const dispatch = useDispatch()
	const formInfo = useSelector(state => state.sections.form)
	const playing = useSelector(state => state.ui.playing)
	const showHelp = useSelector(state => state.ui.showHelp)

	const showFormHere = (location, type) => {
		dispatch(displayForm({ location, type }))
	}

	const hideForm = type => {
		dispatch(displayForm({ location: NaN, type }))
	}

	return (
		<>
			{/* <TestingZone /> */}
			<div className="med-top-margin">
				<button onClick={() => dispatch(toggleHelp())}>
					{showHelp ? 'Hide help tooltips' : 'Show help tooltips'}
				</button>
			</div>
			<div className='med-top-margin' inert={playing ? 'true' : undefined}>
				<button onClick={() => showFormHere(0, 'create')}>Add to start</button>
				{(showHelp
					? <HelpIcon content={addToStartHelp}/>
					: null
				)}
				{formInfo.location === 0
					? <>
						<SectionForm hideSelf={() => hideForm('create')}/>
						<button onClick={() => hideForm('create')}>cancel</button>
					</>
					: null
				}
				<SectionList showFormHere={showFormHere} hideForm={hideForm}/>
				<SampleChoices />
				<Controls/>
			</div>
		</>
	)
}

export default App
