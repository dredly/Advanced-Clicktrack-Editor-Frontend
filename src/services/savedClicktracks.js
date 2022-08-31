import axios from 'axios'
const baseUrl =  window.location.href.includes('clicktrack-redux')
	? 'https://clicktrack-user-backend.herokuapp.com/api'
	: 'http://127.0.0.1:3002/api'

const getConfig = () => (
	{
		headers: {
			Authorization: 'bearer ' + window.localStorage.getItem('loggedInClicktrackUserToken'),
		}
	}
)

const getAll = async () => {
	const response = await axios.get(`${baseUrl}/clicktracks`, getConfig())
	return response.data
}

const getOne = async id => {
	const response = await axios.get(`${baseUrl}/clicktracks/${id}`, getConfig())
	return response.data
}

const save = async data => {
	const response = await axios.post(`${baseUrl}/clicktracks/`, data, getConfig())
	return response.data
}

const update = async (id, data) => {
	const response = await axios.put(`${baseUrl}/clicktracks/${id}`, data, getConfig())
	return response.data
}

const destroy = async (id) => {
	await axios.delete(`${baseUrl}/clicktracks/${id}`, getConfig())
}

export default {
	getAll,
	getOne,
	save,
	update,
	destroy
}