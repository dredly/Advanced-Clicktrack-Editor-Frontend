import { createSlice } from '@reduxjs/toolkit'

const initialState = { clickTimes: [], status: 'not_created' }

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
		clear(state) {
			state.clickTimes = []
		}
	}
})

export const { addTimeArray, changeStatus, clear } = clickTimesSlice.actions
export default clickTimesSlice.reducer