import { createSlice } from '@reduxjs/toolkit'

const initialState = {
	showHelp: true, showVisualisation: false
}

const uiSlice = createSlice({
	name: 'ui',
	initialState,
	reducers: {
		toggleHelp(state) {
			state.showHelp = !state.showHelp
		},
		toggleVisualisation(state) {
			state.showVisualisation = !state.showVisualisation
		}
	}
})

export const { toggleHelp, toggleVisualisation } = uiSlice.actions
export default uiSlice.reducer