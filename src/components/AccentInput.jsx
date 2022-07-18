const AccentInput = ({ idx }) => {
	return (
		<input type="checkbox" name={`beatCheckBox${idx}`} value={idx} />
	)
}

export default AccentInput