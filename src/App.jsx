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
import FileExport from './components/FileExport'
import Visualiser from './components/sections/Visualiser'


const App = () => {
	useEffect(() => {
		clicktrackService.startUp()
	}, [])

	const dispatch = useDispatch()
	const formInfo = useSelector(state => state.sections.form)
	const playing = useSelector(state => state.ui.playing)
	const showHelp = useSelector(state => state.ui.showHelp)
	const numSections = useSelector(state => state.sections.sectionList.length)

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
			<Controls/>
			<div className='med-top-margin flex-row-container-responsive' inert={playing ? 'true' : undefined}>
				<div>
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
				</div>
				<div>
					<SampleChoices />
					<FileExport />
				</div>
			</div>
			{( numSections
				? <Visualiser />
				: null
			)}
		</>
	)
}

export default App
