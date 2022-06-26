// const gradient = (y1, y0, x1, x0) => {
// 	return (y1 - y0) / (x1 - x0)
// }

// const linearIntegral = (x, x0, y0, slope) => {
// 	return 0.5 * slope * (x - x0) ** 2 + y0 * (x - x0)
// }

// const tempoChangeTime = (numBeats, startTempo, endTempo) => {
// 	const startBeatPeriod = 1 / startTempo
// 	const endBeatPeriod = 1 / endTempo
// 	const startBeats = 0
// 	const endBeats = numBeats
// 	const slope = gradient(endBeatPeriod, startBeatPeriod, endBeats, startBeats)
// 	return 60 * linearIntegral(numBeats, startBeats, startBeatPeriod, slope)
// }

const linearTempoChangeTime = tempoArray => {
	return tempoArray.map(tempo => 60 / tempo).reduce((a, b) => a + b)
}

export default linearTempoChangeTime
