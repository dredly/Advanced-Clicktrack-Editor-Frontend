import axios from 'axios'
// const baseUrl = 'http://127.0.0.1:5000'
const baseUrl = 'https://stunning-yosemite-61675.herokuapp.com'

const getSamples = async () => {
	const response = await axios.get(`${baseUrl}/api/allsamples`)
	return response.data
}

export default { getSamples }