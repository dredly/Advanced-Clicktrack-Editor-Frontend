import { createSlice } from "@reduxjs/toolkit"

const initialState = [
	{bpm: 120, numMeasures: 4, sectionInd: 0},
	{bpm: 140, numMeasures: 8, sectionInd: 1}
]

const sectionSlice = createSlice({
	name: 'sections',
	initialState,
	reducers: {
		addSection(state, action) {
			const { bpm, numMeasures } = action.payload
			state.push({bpm, numMeasures, sectionInd: state.length})
		}
	}
})

export const { addSection } = sectionSlice.actions
export default sectionSlice.reducer