import { createSlice } from '@reduxjs/toolkit'

const initialState = { timeArray: [], clickTimesNonPoly: [], status: 'not_created', playing: false }

const clickTimesSlice = createSlice({
	name: 'clickTimes',
	initialState,
	reducers: {
		addTimeArray(state, action) {
			console.log('Hit the reducer for addTimeArray')
			console.log('addTimeArray payload', action.payload)
			console.log('state.clickTimes before', state.clickTimes)
			state.timeArray.push(...action.payload)
		},
		addTimeArrayNonPoly(state, action) {
			console.log('Hit the reducer for addTimeArrayNonPoly')
			console.log('addTimeArrayNonPoly payload', action.payload)
			console.log('state.clickTimesNonPoly before', state.clickTimesNonPoly)
			state.clickTimesNonPoly.push(...action.payload)
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

export const { addTimeArray, addTimeArrayNonPoly, changeStatus, togglePlaying, clear } = clickTimesSlice.actions
export default clickTimesSlice.reducer