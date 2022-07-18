import AccentInput from './AccentInput'

const AccentSelection = ({ numBeats }) => {
	console.log('Rerendering accent selection')
	console.log('numBeats', numBeats)
	const baseArray = Array(numBeats).fill()
	console.log('baseArray', baseArray)
	return (
		<div>{baseArray.map((val, idx) => (
			<AccentInput key={idx} idx={idx}/>
		))}</div>
	)
}

export default AccentSelection