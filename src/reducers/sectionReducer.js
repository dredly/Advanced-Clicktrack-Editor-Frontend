import { createSlice } from '@reduxjs/toolkit'
import { v4 as uuidv4 } from 'uuid'
import savedClicktrackService from '../services/savedClicktracks'


const initialState = {
	sectionList: [],
	form: { type: 'create', location: NaN }
}

const sectionSlice = createSlice({
	name: 'sections',
	initialState,
	reducers: {
		addSection(state, action) {
			const data = action.payload
			const newSection = { ...data, id: uuidv4() }
			const idx = state.form.location
			state.sectionList.splice(idx, 0, newSection)
		},
		updateSection(state, action) {
			const data  = action.payload
			state.sectionList = state.sectionList.map(section =>
				section.id !== data.id ? section : data
			)
		},
		deleteSection(state, action) {
			const idx = action.payload
			state.sectionList.splice(idx, 1)
		},
		setSections(state, action) {
			state.sectionList = action.payload
		},
		displayForm(state, action) {
			const { location, type } = action.payload
			state.form.location = location
			state.form.type = type
		}
	}
})

export const { addSection, deleteSection, updateSection, setSections, displayForm } = sectionSlice.actions

export const initialiseCurrentClicktrack = (id) => {
	return async (dispatch) => {
		const fetchedClicktrack = await savedClicktrackService.getOne(id)
		dispatch(setSections(fetchedClicktrack.sections))
	}
}

export default sectionSlice.reducer