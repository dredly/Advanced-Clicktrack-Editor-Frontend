import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
	BrowserRouter as Router,
	Routes, Route
} from 'react-router-dom'
import clicktrackService from './services/clicktracks'
import userService from './services/users'
import { setUser } from './reducers/userReducer'
import Navbar from './components/Navbar'
import MainPage from './pages/MainPage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import MyClicktracks from './pages/MyClicktracks'
import Flash from './components/Flash'


const App = () => {
	const dispatch = useDispatch()
	const user = useSelector(state => state.user.user)
	const flash = useSelector(state => state.ui.flash)

	useEffect(() => {
		clicktrackService.startUp()
		userService.ping()
		// Try to get current user from local storage
		if (window.localStorage.loggedInClicktrackUser) {
			dispatch(setUser(JSON.parse(window.localStorage.loggedInClicktrackUser)))
		}
	}, [])

	return (
		<Router>
			<Navbar />
			{flash
				? <Flash message={flash.message} severity={flash.severity}/>
				: null
			}
			<Routes>
				<Route path="/" element={<MainPage />}/>
				<Route path="/register" element={<RegisterPage />}/>
				<Route path="/login" element={<LoginPage />}/>
				<Route path="/myclicktracks" element={<MyClicktracks user={user} />}/>
				<Route path="/myclicktracks/:id" element={<MainPage />}/>
			</Routes>
		</Router>
	)
}

export default App
