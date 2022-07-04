import axios from 'axios'
const baseUrl = 'http://127.0.0.1:5000'

const sendData = async data => {
	const response = await axios.post(`${baseUrl}/api/makemidi`, data)
	return response.data
}

export default { sendData }