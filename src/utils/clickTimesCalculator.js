import { buildClickTrackSection, buildPolyrhythmicSection } from './clickTimesHelperFunctions'

export const getClickTimesNonPoly = (sections, withLast=false) => {
	const clickTimesNonPoly = []
	let startTime = 0

	for (let i = 0; i < sections.length; i++) {
		//Check if it is the last section and withLast is true
		const { sectionTimeArray, endTime } = i === sections.length - 1 && withLast
			? buildClickTrackSection(startTime, sections[i], true)
			: buildClickTrackSection(startTime, sections[i])
		clickTimesNonPoly.push(...sectionTimeArray)
		startTime = endTime
	}

	return clickTimesNonPoly
}

export const getClickTimesPoly = (sections, numInstruments) => {
	const clickTimesPoly = []
	let startTime = 0

	for (let i = 0; i < sections.length; i++) {
		const { sectionTimeArray, endTime } = sections[i].secondaryNumBeats
			? buildPolyrhythmicSection(startTime, sections[i], numInstruments)
			: buildClickTrackSection(startTime, sections[i])
		clickTimesPoly.push(...sectionTimeArray)
		startTime = endTime
	}

	return clickTimesPoly
}