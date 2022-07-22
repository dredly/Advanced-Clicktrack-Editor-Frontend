import axios from 'axios'
// const baseUrl = 'http://127.0.0.1:5000'
const baseUrl = 'https://stunning-yosemite-61675.herokuapp.com'

// Sends a trivial request to the backend to prevent heroku from
// cold starting once a user requests a wav file
const startUp = () => {
	axios.get(baseUrl)
}

const getWav = async (data) => {
	const response = await axios.post(`${baseUrl}/api/make_wav`, data)
	return response.data
}

const getMidi = async (data) => {
	const response = await axios.post(`${baseUrl}/api/make_midi`, data)
	return response.data
}

export default { getWav, getMidi, startUp }
