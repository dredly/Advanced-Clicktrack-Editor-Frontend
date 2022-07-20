import { configureStore } from '@reduxjs/toolkit'
import sectionReducer from './reducers/sectionReducer'
import clickTimesReducer from './reducers/clickTimesReducer'
import sampleReducer from './reducers/sampleReducer'

const store = configureStore({
	reducer: {
		sections: sectionReducer,
		clickTimes: clickTimesReducer,
		samples: sampleReducer,
	}
})

export default store