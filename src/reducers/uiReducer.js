import { createSlice } from '@reduxjs/toolkit'

const initialState = {
	showHelp: true,
	showVisualisation: false,
	flash: null
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
		},
		setFlash(state, action) {
			state.flash = action.payload
		}
	}
})

export const { toggleHelp, toggleVisualisation, setFlash } = uiSlice.actions
export default uiSlice.reducer