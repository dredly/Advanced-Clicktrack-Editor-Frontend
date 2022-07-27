import { createSlice } from '@reduxjs/toolkit'

const initialState = {
	samples: {
		strong: JSON.stringify({
			name: 'Woodblock',
			url: 'https://res.cloudinary.com/doemj9gq6/video/upload/v1658393312/Samples/ffkwnjeyvugkc9p8pecl.wav'
		}),
		weak: JSON.stringify({
			name: 'Woodblock (Quiet)',
			url: 'https://res.cloudinary.com/doemj9gq6/video/upload/v1658393325/Samples/nmxxfb4xdhblrkcj4zni.wav'
		}),
	},
	showSampleForm: false
}

const samplesSlice = createSlice({
	name: 'samples',
	initialState,
	reducers: {
		changeSamples(state, action) {
			const { strongBeatSample, weakBeatSample } = action.payload
			state.samples.strong = strongBeatSample
			state.samples.weak = weakBeatSample
		},
		toggleSampleForm(state) {
			state.showSampleForm = !state.showSampleForm
		}
	}
})

export const { changeSamples, toggleSampleForm } = samplesSlice.actions
export default samplesSlice.reducer