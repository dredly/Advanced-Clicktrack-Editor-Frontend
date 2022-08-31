import axios from 'axios'
const baseUrl =  window.location.href.includes('clicktrack-redux')
	? 'https://clicktrack-user-backend.herokuapp.com/api'
	: 'http://127.0.0.1:3002/api'

const ping = async () => {
	const response = await axios.get(`${baseUrl}/ping`)
	console.log(response.data)
}

const register = async data => {
	const response = await axios.post(`${baseUrl}/users`, data)
	return response.data
}

const login = async data => {
	const response = await axios.post(`${baseUrl}/users/login`, data)
	return response.data
}

export default {
	ping,
	register,
	login
}