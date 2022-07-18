import AccentInput from './AccentInput'

const AccentSelection = ({ numBeats, accentedBeats }) => {
	const baseArray = Array(numBeats).fill()

	return (
		<div>{baseArray.map((val, idx) => (
			<AccentInput key={idx} idx={idx} isChecked={accentedBeats.includes(idx)} />
		))}</div>
	)
}

export default AccentSelection