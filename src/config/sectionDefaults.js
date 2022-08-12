export const defaults = {
	overallData: {
		numMeasures: 4,
		mtc: 0.5
	},
	// Can be array of length > 1 for polyrhythms
	rhythms: [
		{
			bpms: [120, 120], //bpm at start and end of section
			timeSig: [4, 4],
			accentedBeats: [0]
		}
	]
}