const testSectionData = [
	{
		accentedBeats: [0],
		bpm: '120',
		bpmEnd: '180',
		meanTempoCondition: 0.9,
		id: '5a13811f-3301-49ca-9f65-06b23f2f1d67',
		numBeats: 4,
		numMeasures: '4'
	},
	{
		accentedBeats: [0],
		bpm: '180',
		bpmEnd: '90',
		meanTempoCondition: 0.3,
		id: 'a8958f7f-1747-47a8-a6df-87783b68477d',
		numBeats: 4,
		numMeasures: '6'
	},
]

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
	console.log(bpmArray)
}

console.log(testSectionData)
makeBpmArray(testSectionData[0])