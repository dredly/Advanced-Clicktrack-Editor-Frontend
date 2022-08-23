import { useEffect } from 'react'
import {
	BrowserRouter as Router,
	Routes, Route
} from 'react-router-dom'
import clicktrackService from './services/clicktracks'
import userService from './services/users'
import Navbar from './components/Navbar'
import MainPage from './pages/MainPage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'


const App = () => {
	useEffect(() => {
		clicktrackService.startUp()
		userService.ping()
	}, [])

	return (
		<Router>
			<Navbar />
			<Routes>
				<Route path="/" element={<MainPage />}/>
				<Route path="/register" element={<RegisterPage />}/>
				<Route path="/login" element={<LoginPage />}/>
			</Routes>
		</Router>
	)
}

export default App
