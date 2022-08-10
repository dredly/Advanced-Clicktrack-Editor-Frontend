import makeBpmArray from './tempoCurveCalculator'

const buildClickTrackSection = (startTime, sectionData) => {
	const bpmArray = makeBpmArray(sectionData)
	const intervalArray = bpmArray.map(bpm => 60/bpm)
	const timeArray = intervalArray.map((_interval, idx) => {
		return idx > 0
			? startTime + intervalArray.slice(0, idx).reduce((a, b) => a + b)
			: startTime
	})
	const accentArray = sectionData.accentedBeats

	const endTime = timeArray[timeArray.length - 1] //Last entry of the timeArray

	const sectionTimeArray = timeArray
		.slice(0, timeArray.length -1)
		.map((time, idx) => (
			accentArray.includes(idx % sectionData.numBeats)
				? { time, bpm: bpmArray[idx], downBeat: true }
				: { time, bpm: bpmArray[idx], downBeat: false }
		))

	return { sectionTimeArray, endTime }
}

export const getClickTimesNonPoly = sections => {
	const clickTimesNonPoly = []
	let startTime = 0

	for (let i = 0; i < sections.length; i++) {
		const { sectionTimeArray, endTime } = buildClickTrackSection(startTime, sections[i])
		clickTimesNonPoly.push(...sectionTimeArray)
		startTime = endTime
	}

	return clickTimesNonPoly
}

export const getClickTimesPoly = sections => {
	console.log(sections)
	return [1, 2, 3]
}