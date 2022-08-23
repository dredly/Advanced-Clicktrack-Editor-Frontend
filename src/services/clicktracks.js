import axios from 'axios'
const baseUrl =  window.location.href.includes('clicktrack-redux')
	? 'https://clicktrack-audio-backend.herokuapp.com/'
	: 'http://127.0.0.1:5000'

// Sends a trivial request to the backend to prevent heroku from
// cold starting once a user requests a wav file
const startUp = () => {
	try {
		axios.get(baseUrl)
	} catch (err) {
		console.log('Server not running')
	}
}

const getFile = async (data, fileExt) => {
	const response = await axios.post(`${baseUrl}/api/make_${fileExt}`, data)
	return response.data
}

export default { startUp, getFile }
