import { createSlice } from '@reduxjs/toolkit'
import savedClicktrackService from '../services/savedClicktracks'

const initialState = {
	user: null,
	savedClicktracks: []
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
		}
	}
})

export const { setUser, removeUser, setSavedClicktracks } = userSlice.actions

export const initialiseSavedClicktracks = () => {
	return async (dispatch) => {
		const fetchedClicktracks = await savedClicktrackService.getAll()
		dispatch(setSavedClicktracks(fetchedClicktracks))
	}
}

export default userSlice.reducer