import { createSlice } from "@reduxjs/toolkit"

const initialState = {
	sectionList: [
		{bpm: 120, numMeasures: 4, sectionInd: 1},
		{bpm: 140, numMeasures: 8, sectionInd: 2}
	],
	formLocation: NaN
}

const sectionSlice = createSlice({
	name: 'sections',
	initialState,
	reducers: {
		addSection(state, action) {
			const { bpm, numMeasures } = action.payload
			state.sectionList.push({bpm, numMeasures, sectionInd: state.sectionList.length + 1})
		},
		displayForm(state, action) {
			const newLocation = action.payload
			state.formLocation = newLocation
		}
	}
})

export const { addSection, displayForm } = sectionSlice.actions
export default sectionSlice.reducer