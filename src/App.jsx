import { useSelector, useDispatch } from 'react-redux'
import { addSection } from './reducers/sectionReducer'

const App = () => {
  const dispatch = useDispatch()
  const sections = useSelector(state => state.sections)

  const addDefault = () => {
    dispatch(addSection({bpm: 120, numMeasures: 4}))
  }

  return (
    <>
      {sections.map(section => 
        <p key={section.sectionInd}>
          {section.sectionInd} ...
          {section.bpm}bpm for {section.numMeasures} measures
        </p>
      )}
      <button onClick={addDefault}>Add section with default values</button>
    </>
  );
}

export default App;
