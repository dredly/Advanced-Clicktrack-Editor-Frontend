import axios from 'axios'
const baseUrl = 'http://127.0.0.1:5000'
// const baseUrl = 'https://clicktrack-audio-backend.herokuapp.com/'

// Sends a trivial request to the backend to prevent heroku from
// cold starting once a user requests a wav file
const startUp = () => {
	axios.get(baseUrl)
}

const getFile = async (data, fileExt) => {
	const response = await axios.post(`${baseUrl}/api/make_${fileExt}`, data)
	return response.data
}

export default { startUp, getFile }
