import { configureStore } from '@reduxjs/toolkit'
import sectionReducer from './reducers/sectionReducer'
import clickTimesReducer from './reducers/clickTimesReducer'
import sampleReducer from './reducers/sampleReducer'
import uiReducer from './reducers/uiReducer'

const store = configureStore({
	reducer: {
		sections: sectionReducer,
		clickTimes: clickTimesReducer,
		samples: sampleReducer,
		ui: uiReducer,
	}
})

export default store