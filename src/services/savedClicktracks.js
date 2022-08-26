import axios from 'axios'
const baseUrl =  window.location.href.includes('clicktrack-redux')
	? 'https://clicktrack-user-backend.herokuapp.com/'
	: 'http://127.0.0.1:3002/api'

const config = {
	headers: {
		Authorization: 'bearer ' + window.localStorage.getItem('loggedInClicktrackUserToken'),
	},
}

const getAll = async () => {
	const response = await axios.get(`${baseUrl}/clicktracks`, config)
	return response.data
}

const save = async data => {
	const response = await axios.post(`${baseUrl}/clicktracks`, data, config)
	return response.data
}

export default {
	getAll,
	save
}