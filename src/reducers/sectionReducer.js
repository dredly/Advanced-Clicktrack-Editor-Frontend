import { createSlice } from '@reduxjs/toolkit'
import { v4 as uuidv4 } from 'uuid'


const initialState = {
	sectionList: [],
	formLocation: NaN
}

const sectionSlice = createSlice({
	name: 'sections',
	initialState,
	reducers: {
		addSection(state, action) {
			const { bpm, numMeasures } = action.payload
			const idx = state.formLocation
			//Insert the new section at the location specified by where the form was rendered
			state.sectionList.splice(idx, 0, { bpm, numMeasures, id: uuidv4() })
		},
		deleteSection(state, action) {
			const { idx } = action.payload
			state.sectionList.splice(idx, 1)
		},
		displayForm(state, action) {
			const newLocation = action.payload
			state.formLocation = newLocation
		}
	}
})

export const { addSection, deleteSection, displayForm } = sectionSlice.actions
export default sectionSlice.reducer