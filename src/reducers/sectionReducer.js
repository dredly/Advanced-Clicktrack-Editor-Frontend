import { createSlice } from '@reduxjs/toolkit'
import { v4 as uuidv4 } from 'uuid'


const initialState = {
	sectionList: [],
	form: { type: 'create', location: NaN }
}

const sectionSlice = createSlice({
	name: 'sections',
	initialState,
	reducers: {
		addSection(state, action) {
			const { bpm, bpmEnd, numMeasures, numBeats, accentedBeats } = action.payload
			const idx = state.createFormLocation
			//Insert the new section at the location specified by where the form was rendered
			state.sectionList.splice(idx, 0, { bpm, bpmEnd, numMeasures, numBeats, accentedBeats, id: uuidv4() })
		},
		updateSection(state, action) {
			const data  = action.payload
			state.sectionList = state.sectionList.map(section =>
				section.id !== data.id ? section : data
			)
		},
		deleteSection(state, action) {
			const { idx } = action.payload
			state.sectionList.splice(idx, 1)
		},
		displayForm(state, action) {
			const { location, type } = action.payload
			state.form.location = location
			state.form.type = type
		}
	}
})

export const { addSection, deleteSection, updateSection, displayForm } = sectionSlice.actions
export default sectionSlice.reducer