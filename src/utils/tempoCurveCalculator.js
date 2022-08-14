const calcExponent = meanTempoCondition => Math.log(0.5) / Math.log(meanTempoCondition)

const bpmAtCurrentBeat = (currentBeat, exponent, numBeats, startTempo, endTempo) => {
	return ((currentBeat / numBeats) ** exponent) * (endTempo - startTempo) + startTempo
}

const makeBpmArray = (sectionData) => {
	const numNotes = sectionData.overallData.numMeasures * sectionData.rhythms[0].timeSig[0]
	const exponent = calcExponent(sectionData.overallData.mtc)
	const bpmArray = Array.from({ length: numNotes + 1 })
		.map((_val, idx) => {
			return bpmAtCurrentBeat(
				idx,
				exponent,
				numNotes,
				sectionData.rhythms[0].bpms[0],
				sectionData.rhythms[0].bpms[1]
			)
		})
	return bpmArray
}

export const getFullTempoDataSymbolic = (sectionData) => {
	const sectionBoundaryBpms = sectionData
		.map(sd => [sd.rhythms[0].bpms[0], sd.rhythms[0].bpms[1]])
		.reduce((a, b) => a.concat(b))

	const mtcBpms = []
	for (let i = 0; i < sectionBoundaryBpms.length; i += 2) {
		mtcBpms.push(sectionBoundaryBpms[i] + 0.5 * (sectionBoundaryBpms[i + 1] - sectionBoundaryBpms[i]))
	}

	const sectionBoundaryNumMeasures = [0].concat(
		sectionData.map(sd => sd.overallData.numMeasures)
	).map((_, idx, arr) => idx === 0 ? 0 : arr.slice(0, idx + 1).reduce((a, b) => a + b))

	// Potentially change here to use quarter notes
	const sectionBoundaryNumNotes = [0].concat(
		sectionData.map(sd => sd.overallData.numMeasures * sd.rhythms[0].timeSig[0])
	).map((_, idx, arr) => idx === 0 ? 0 : arr.slice(0, idx + 1).reduce((a, b) => a + b))

	const mtcNumNotes = sectionBoundaryNumNotes
		.slice(1)
		.map((numNotes, idx) => sectionBoundaryNumNotes[idx] + sectionData[idx].overallData.mtc * (numNotes - sectionBoundaryNumNotes[idx]))

	console.log('mtcNumNotes', mtcNumNotes)

	const dataPoints = []

	for (let i = 0; i < mtcBpms.length; i++) {
		dataPoints.push(
			{
				x: sectionBoundaryNumNotes[i],
				y: sectionBoundaryBpms[2  * i],
				m: sectionBoundaryNumMeasures[i]
			},
			{
				x: mtcNumNotes[i],
				y: mtcBpms[i],
			},
			{
				x: sectionBoundaryNumNotes[i + 1],
				y: sectionBoundaryBpms[2 * i + 1],
				m: sectionBoundaryNumMeasures[i + 1]
			},
		)
	}

	return {
		dataPoints,
		sections: sectionBoundaryNumNotes
	}
}

export const splitIntoSeries = dataPoints => {
	const series = []
	for (let i=0; i < dataPoints.length; i += 3) {
		if (i > 0) {
			series.push({
				name: `Series ${i / 3 + 1}a`,
				data: dataPoints.slice(i-1, i+1)
			})
		}
		series.push({
			name: `Series ${i / 3 + 1}b`,
			data: dataPoints.slice(i, i + 3)
		})
	}
	return series
}

export const getFullTempoDataPhysical = (clickTimeData, sectionData) => {
	const dataPoints = clickTimeData.map(ct => {
		return { x: ct.time, y: ct.bpm }
	})

	const sectionBoundaryNumNotes = [0].concat(
		sectionData.map(sd => sd.overallData.numMeasures * sd.rhythms[0].timeSig[0])
	).map((_, idx, arr) => idx === 0 ? 0 : arr.slice(0, idx + 1).reduce((a, b) => a + b))

	const sectionBoundaryTimes = sectionBoundaryNumNotes.map(nn => dataPoints[nn].x)

	return {
		dataPoints,
		sections: sectionBoundaryTimes
	}
}

export default makeBpmArray