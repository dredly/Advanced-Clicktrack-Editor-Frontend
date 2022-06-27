import { configureStore } from '@reduxjs/toolkit'
import sectionReducer from './reducers/sectionReducer'
import clickTimesReducer from './reducers/clickTimesReducer'

const store = configureStore({
	reducer: {
		sections: sectionReducer,
		clickTimes: clickTimesReducer
	}
})

export default store