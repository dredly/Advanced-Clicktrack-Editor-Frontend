import { ErrorMessage } from 'formik'
import {
	TextField as TextFieldMUI,
} from '@mui/material'

import { Typography } from '@mui/material'

export const TextField = ({ field, label, placeholder }) => (
	<div style={{ marginBottom: '1em' }}>
		<TextFieldMUI
			// fullWidth
			label={label}
			placeholder={placeholder}
			{...field}
		/>
		<Typography variant="subtitle2" style={{ color: 'red' }}>
			<ErrorMessage name={field.name} />
		</Typography>
	</div>
)

export const PasswordField = ({ field, label }) => (
	<div style={{ marginBottom: '1em' }}>
		<TextFieldMUI
			// fullWidth
			label={label}
			{...field}
			type="password"
		/>
		<Typography variant="subtitle2" style={{ color: 'red' }}>
			<ErrorMessage name={field.name} />
		</Typography>
	</div>
)