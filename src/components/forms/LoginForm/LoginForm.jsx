import { Formik, Form, Field } from 'formik'
import axios from 'axios'
import { TextField, PasswordField } from '../FormikFields'
import userService from '../../../services/users'
import { setUser } from '../../../reducers/userReducer'
import { setFlash } from '../../../reducers/uiReducer'
import { useDispatch } from 'react-redux'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { Button, Alert } from '@mui/material'

const LoginForm = () => {
	const dispatch = useDispatch()
	const navigate = useNavigate()

	const [error, setError] = useState('')

	const handleSubmit = async (values) => {
		try {
			const result = await userService.login(values)
			window.localStorage.setItem('loggedInClicktrackUserToken', result.token)
			window.localStorage.setItem('loggedInClicktrackUser', JSON.stringify(result.user))
			dispatch(setUser(result.user)) //Might be redundant now
			navigate('/')
			dispatch(setFlash({ message: `Welcome, ${result.user.name}`, severity: 'success' }))
			setTimeout(() => {
				dispatch(setFlash(null))
			}, 3000)
		} catch (err) {
			if (axios.isAxiosError(err)) {
				console.error(err.response.data || 'Unrecognized axios error')
				setError(String(err.response.data.error) || 'Unrecognized axios error')
			} else {
				console.error('Unknown error', err)
				setError('Unknown error')
			}
		}
	}

	return (
		<Formik
			initialValues={{
				username: '',
				password: '',
			}}
			onSubmit={handleSubmit}
			validate={values => {
				const errors = {}
				const requiredError = 'Field is required'
				if (!values.username) {
					errors.username = requiredError
				}
				if (!values.password) {
					errors.password = requiredError
				}
				return errors
			}}
		>
			{
				({ isValid, dirty }) => {
					return (
						<Form>
							{error && <Alert severity="error">{`Error: ${error}`}</Alert>}
							<Field label="Username" name="username" component={TextField} />
							<Field label="Password" name="password" component={PasswordField} />
							<Button
								type="submit"
								variant="contained"
								disabled={!dirty || !isValid}
							>
								Login
							</Button>

						</Form>
					)
				}
			}
		</Formik>
	)
}

export default LoginForm