const calcExponent = meanTempoCondition => Math.log(0.5) / Math.log(meanTempoCondition)

const bpmAtCurrentBeat = (currentBeat, exponent, numBeats, startTempo, endTempo) => {
	return ((currentBeat / numBeats) ** exponent) * (endTempo - startTempo) + startTempo
}

const makeBpmArray = (sectionData) => {
	const numNotes = sectionData.numMeasures * sectionData.numBeats
	const exponent = calcExponent(sectionData.meanTempoCondition)
	const bpmArray = Array.from({ length: numNotes + 1 })
		.map((val, idx) => {
			return bpmAtCurrentBeat(idx, exponent, numNotes, Number(sectionData.bpm), Number(sectionData.bpmEnd))
		})
	return bpmArray
}

export default makeBpmArray