import { Formik, Form, Field, ErrorMessage	} from 'formik'
import { Button } from '@mui/material'

const RegisterForm = () => {
	return (
		<Formik
			initialValues={{
				name: '',
				username: '',
				password: '',
				confirmPassword: ''
			}}
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
							<Field label="Name" type="text" name="name" />
							<ErrorMessage name="name" component="div" />
							<Field label="Username" type="text" name="username" />
							<ErrorMessage name="username" component="div" />
							<Field label="Password" type="password" name="password" />
							<ErrorMessage name="password" component="div" />
							<Field label="Confrim Password" type="password" name="confirmPassword" />
							<ErrorMessage name="confirmPassword" component="div" />
							<Button
								type="submit"
								variant="contained"
								disabled={!dirty || !isValid}
							>
								Add
							</Button>

						</Form>
					)
				}
			}
		</Formik>
	)
}

export default RegisterForm