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
	const sectionBoundaryBpms = [Number(sectionData[0].bpm)].concat(sectionData.map(sd => Number(sd.bpmEnd)))
	const sectionBoundaryNumNotes = [0].concat(
		sectionData.map(sd => Number(sd.numMeasures) * Number(sd.numBeats))
	).map((_, idx, arr) => idx === 0 ? 0 : arr.slice(0, idx + 1).reduce((a, b) => a + b))
	const mtcBpms = sectionBoundaryBpms
		.slice(1)
		.map((bpm, idx) => sectionBoundaryBpms[idx] + 0.5 * (bpm - sectionBoundaryBpms[idx]))
	const mtcNumNotes = sectionBoundaryNumNotes
		.slice(1)
		.map((numNotes, idx) => sectionBoundaryNumNotes[idx] + sectionData[idx].meanTempoCondition * (numNotes - sectionBoundaryNumNotes[idx]))

	const dataPoints = [{ x: 0, y: sectionBoundaryBpms[0] }]

	for (let i = 0; i < mtcBpms.length; i++) {
		dataPoints.push(
			{ x: mtcNumNotes[i], y: mtcBpms[i] },
			{ x: sectionBoundaryNumNotes[i + 1], y: sectionBoundaryBpms[i + 1] }
		)
	}

	console.log('dataPoints', dataPoints)

	return {
		dataPoints
	}
}

export default makeBpmArray