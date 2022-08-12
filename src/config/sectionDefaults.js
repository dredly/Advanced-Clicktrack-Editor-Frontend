export const defaults = {
	overallData: {
		numMeasures: 4,
		mtc: 0.5
	},
	// Can be array of length > 1 for polyrhythms
	subRhythms: [
		{
			bpms: [120, 120],
			timeSig: [4, 4],
			accentedBeats: [0]
		}
	]
}