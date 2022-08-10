import { configureStore } from '@reduxjs/toolkit'
import sectionReducer from './reducers/sectionReducer'
import sampleReducer from './reducers/sampleReducer'
import uiReducer from './reducers/uiReducer'

const store = configureStore({
	reducer: {
		sections: sectionReducer,
		samples: sampleReducer,
		ui: uiReducer,
	},
})

export default store