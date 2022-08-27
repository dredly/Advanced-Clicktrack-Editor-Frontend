import { createSlice } from '@reduxjs/toolkit'
import savedClicktrackService from '../services/savedClicktracks'

const initialState = {
	user: null,
	savedClicktracks: [],
	currentlyEditing: null,
}

const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		setUser(state, action) {
			state.user = action.payload
		},
		removeUser(state) {
			state.user = null
		},
		setSavedClicktracks(state, action) {
			state.savedClicktracks = action.payload
		},
		setCurrentlyEditing(state, action) {
			state.currentlyEditing = action.payload
		}
	}
})

export const { setUser, removeUser, setSavedClicktracks, setCurrentlyEditing } = userSlice.actions

export const initialiseSavedClicktracks = () => {
	return async (dispatch) => {
		const fetchedClicktracks = await savedClicktrackService.getAll()
		dispatch(setSavedClicktracks(fetchedClicktracks))
	}
}

export default userSlice.reducer