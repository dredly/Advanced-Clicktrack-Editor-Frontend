import { configureStore } from '@reduxjs/toolkit'
import sectionReducer from './reducers/sectionReducer'

const store = configureStore({
	reducer: {
		sections: sectionReducer
	}
})

export default store