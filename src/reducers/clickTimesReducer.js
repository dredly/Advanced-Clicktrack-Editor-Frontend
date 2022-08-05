import { createSlice } from '@reduxjs/toolkit'

const initialState = { timeArray: [], clickTimesNonPoly: [], status: 'not_created', playing: false }

const clickTimesSlice = createSlice({
	name: 'clickTimes',
	initialState,
	reducers: {
		addTimeArray(state, action) {
			state.timeArray.push(...action.payload)
		},
		addTimeArrayNonPoly(state, action) {
			state.clickTimesNonPoly.push(...action.payload)
		},
		changeStatus(state, action) {
			state.status = action.payload
		},
		togglePlaying(state) {
			state.playing = !state.playing
		},
		clear(state) {
			state.timeArray = []
			state.clickTimesNonPoly = []
		}
	}
})

export const { addTimeArray, addTimeArrayNonPoly, changeStatus, togglePlaying, clear } = clickTimesSlice.actions
export default clickTimesSlice.reducer