import { buildClickTrackSection, buildPolyrhythmicSection } from './clickTimesHelperFunctions'

export const getClickTimesNonPoly = (sections, withLast=false) => {
	const clickTimesNonPoly = []
	let startTime = 0

	for (let i = 0; i < sections.length; i++) {
		//Check if it is the last section and withLast is true
		const { sectionTimeArray, endTime } = i === sections.length - 1 && withLast
			? buildClickTrackSection(startTime, sections[i], true)
			: buildClickTrackSection(startTime, sections[i])
		const sectionTimeArrayWithDisplayBpms = sectionTimeArray.map(click => {
			return { ...click, bpm: click.bpm * (4 / sections[i].rhythms[0].timeSig[1]) }
		})
		clickTimesNonPoly.push(...sectionTimeArrayWithDisplayBpms)
		startTime = endTime
	}

	return clickTimesNonPoly
}

export const getClickTimesPoly = (sections, numInstruments) => {
	const clickTimesPoly = []
	let startTime = 0

	for (let i = 0; i < sections.length; i++) {
		const { sectionTimeArray, endTime } = sections[i].rhythms.length > 1
			? buildPolyrhythmicSection(startTime, sections[i], numInstruments)
			: buildClickTrackSection(startTime, sections[i])
		clickTimesPoly.push(...sectionTimeArray)
		startTime = endTime
	}

	return clickTimesPoly
}