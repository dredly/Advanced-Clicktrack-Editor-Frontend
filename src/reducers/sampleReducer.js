import { createSlice } from '@reduxjs/toolkit'

const initialState = { strong: null, weak: null }

const samplesSlice = createSlice({
	name: 'samples',
	initialState,
	reducers: {
		changeSamples(state, action) {
			const { strongBeatSample, weakBeatSample } = action.payload
			state.strong = strongBeatSample
			state.weak = weakBeatSample
		}
	}
})

export const { changeSamples } = samplesSlice.actions
export default samplesSlice.reducer