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

export const getFullTempoData = (sectionData) => {
	const sectionBoundaryBpms = sectionData
		.map(sd => [Number(sd.bpm), Number(sd.bpmEnd)])
		.reduce((a, b) => a.concat(b))

	const mtcBpms = []
	for (let i = 0; i < sectionBoundaryBpms.length; i += 2) {
		mtcBpms.push(sectionBoundaryBpms[i] + 0.5 * (sectionBoundaryBpms[i + 1] - sectionBoundaryBpms[i]))
	}

	const sectionBoundaryNumNotes = [0].concat(
		sectionData.map(sd => Number(sd.numMeasures) * Number(sd.numBeats))
	).map((_, idx, arr) => idx === 0 ? 0 : arr.slice(0, idx + 1).reduce((a, b) => a + b))

	const mtcNumNotes = sectionBoundaryNumNotes
		.slice(1)
		.map((numNotes, idx) => sectionBoundaryNumNotes[idx] + sectionData[idx].meanTempoCondition * (numNotes - sectionBoundaryNumNotes[idx]))

	const dataPoints = []

	for (let i = 0; i < mtcBpms.length; i++) {
		dataPoints.push(
			{ x: sectionBoundaryNumNotes[i], y: sectionBoundaryBpms[2  * i] },
			{ x: mtcNumNotes[i], y: mtcBpms[i] },
			{ x: sectionBoundaryNumNotes[i + 1], y: sectionBoundaryBpms[2 * i + 1] },
		)
	}

	return {
		dataPoints,
		sections: sectionBoundaryNumNotes
	}
}

export default makeBpmArray