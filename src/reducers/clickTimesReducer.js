import { createSlice } from '@reduxjs/toolkit'

const initialState = { clickTimes: [], status: 'not_created', playing: false }

const clickTimesSlice = createSlice({
	name: 'clickTimes',
	initialState,
	reducers: {
		addTimeArray(state, action) {
			console.log('PAYLOAD', action.payload)
			state.clickTimes.push(...action.payload)
		},
		changeStatus(state, action) {
			state.status = action.payload
		},
		togglePlaying(state) {
			state.playing = !state.playing
		},
		clear(state) {
			state.clickTimes = []
		}
	}
})

export const { addTimeArray, changeStatus, togglePlaying, clear } = clickTimesSlice.actions
export default clickTimesSlice.reducer