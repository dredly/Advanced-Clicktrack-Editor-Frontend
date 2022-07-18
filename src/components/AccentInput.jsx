const AccentInput = ({ idx, isChecked }) => {
	return (
		<input type="checkbox" name={`beatCheckBox${idx}`} value={idx} defaultChecked={isChecked} />
	)
}

export default AccentInput