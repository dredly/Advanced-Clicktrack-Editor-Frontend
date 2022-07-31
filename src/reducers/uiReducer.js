import { createSlice } from '@reduxjs/toolkit'

const initialState = {
	showHelp: true
}

const uiSlice = createSlice({
	name: 'ui',
	initialState,
	reducers: {
		toggleHelp(state) {
			state.showHelp = !state.showHelp
		}
	}
})

export const { toggleHelp } = uiSlice.actions
export default uiSlice.reducer