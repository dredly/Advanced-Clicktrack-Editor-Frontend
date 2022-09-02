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

const RegisterForm = () => {
	const navigate = useNavigate()
	const dispatch = useDispatch()
	const [error, setError] = useState('')

	const handleSubmit = async (valuesWithConfirmPassword) => {
		try {
			// eslint-disable-next-line no-unused-vars
			const { confirmPassword, ...values } = valuesWithConfirmPassword
			const registeredUser = await userService.register(values)
			const result = await userService.login({
				username: values.username,
				password: values.password
			})
			window.localStorage.setItem('loggedInClicktrackUserToken', result.token)
			dispatch(setUser(registeredUser))
			navigate('/')
			dispatch(setFlash({ message: `Welcome, ${registeredUser.name}`, severity: 'success' }))
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
				name: '',
				username: '',
				password: '',
				confirmPassword: ''
			}}
			onSubmit={handleSubmit}
			validate={values => {
				const errors = {}
				const requiredError = 'Field is required'
				if (!values.name) {
					errors.name = requiredError
				}
				if (!values.username) {
					errors.username = requiredError
				}
				if (!values.password) {
					errors.password = requiredError
				} else {
					if (values.password.length < 8) {
						errors.password = 'Password must be at least 8 characters'
					}
				}
				if (!values.confirmPassword) {
					errors.confirmPassword = requiredError
				} else {
					if (values.confirmPassword !== values.password) {
						errors.confirmPassword = 'Passwords must match'
					}
				}
				return errors
			}}
		>
			{
				({ isValid, dirty }) => {
					return (
						<Form>
							{error && <Alert severity="error">{`Error: ${error}`}</Alert>}
							<Field label="Name" name="name" component={TextField} />
							<Field label="Username" name="username" component={TextField} />
							<Field label="Password" name="password" component={PasswordField} />
							<Field label="Confirm Password" name="confirmPassword" component={PasswordField} />
							<Button
								type="submit"
								variant="contained"
								disabled={!dirty || !isValid}
							>
								Register
							</Button>

						</Form>
					)
				}
			}
		</Formik>
	)
}

export default RegisterForm