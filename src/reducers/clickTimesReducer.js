import { createSlice } from '@reduxjs/toolkit'

//Initial state just for testing
const initialState = { clickTimes: [] }

const clickTimesSlice = createSlice({
	name: 'clickTimes',
	initialState,
	reducers: {
		addTimeArray(state, action) {
			console.log('PAYLOAD', action.payload)
			state.clickTimes.push(...action.payload)
		}
	}
})

export const { addTimeArray } = clickTimesSlice.actions
export default clickTimesSlice.reducer