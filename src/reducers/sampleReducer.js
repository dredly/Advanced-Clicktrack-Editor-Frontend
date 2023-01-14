import { createSlice } from '@reduxjs/toolkit'
import allSamples from '../utils/sampleInfo'

const initialState = {
	samples: [{
		strong: {
			name: 'High pitched Woodblock',
			value: 'woodblock_high',
			url: 'https://res.cloudinary.com/doemj9gq6/video/upload/v1659709148/Samples/woodblock_high_srygbo.ogg',
		},
		weak: {
			// The same sample but with a volume transformation
			url: 'https://res.cloudinary.com/doemj9gq6/video/upload/e_volume:-60/v1659709148/Samples/woodblock_high_srygbo.ogg',
		},
	}] ,
}

const samplesSlice = createSlice({
	name: 'samples',
	initialState,
	reducers: {
		changeSamples(state, action) {
			const newSampleValue = action.payload
			const newSamples = allSamples.find(s => s.strong.value === newSampleValue)
			state.samples = [newSamples]
		},
		addSecondSample(state, action) {
			const newSampleValue = action.payload
			const newSamples = allSamples.find(s => s.strong.value === newSampleValue)
			state.samples[1] = newSamples
		},
		removeSecondSample(state) {
			state.samples = [state.samples[0]]
		},
		toggleSampleForm(state) {
			state.showSampleForm = !state.showSampleForm
		}
	}
})

export const { changeSamples, addSecondSample, removeSecondSample, toggleSampleForm } = samplesSlice.actions
export default samplesSlice.reducer