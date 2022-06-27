import { createSlice } from '@reduxjs/toolkit'

//Initial state just for testing
const initialState = { clickTimes: [], readyToPlay: false }

const clickTimesSlice = createSlice({
	name: 'clickTimes',
	initialState,
	reducers: {
		addTimeArray(state, action) {
			console.log('PAYLOAD', action.payload)
			state.clickTimes.push(...action.payload)
		},
		makeReady(state) {
			state.readyToPlay = true
		}
	}
})

export const { addTimeArray, makeReady } = clickTimesSlice.actions
export default clickTimesSlice.reducer