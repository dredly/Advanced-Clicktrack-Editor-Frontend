/* Store all help texts here to avoid cluttering the components */

export const polyrhythmHelp = 'This option allows you to play rhythms with 2 different time signatures at the same time,\
	which will sync up on every downbeat. The primary rhythm will keep the same bpm, while the bpm for the secondary\
	rhythm will be automatically calculated to sync up.'

export const mtcHelp = 'Mean tempo condition is an intuitive way to represent a tempo change over time. It is a number between \
	0 and 1 representing the point at which the tempo has gone through half of its change in value. For example, in an accelerando \
	section from 100 to 150bpm, the tempo at the mean tempo condition would be 125bpm. A mean tempo condition of 0.5 would represent \
	a linear change in tempo.'

export const addToStartHelp = 'Click here to add a first section. If you already have some sections, this will add one to the beginning'

export const accentSelectionHelp = 'Click on the icons to select which notes are accented (played louder). For example selecting the \
	second and third note icons will result in accents on beats 2 and 3'

export const multipleSamplesHelp = 'You can optionally select a second sample. If a section is a polyrhythm, this sample will be used to play\
	the notes of the secondary rhythm. Otherwise it will be used for weak beats while the first sample will be used for strong beats (downbeats)'

export const fileFormatsHelp = 'A midi file does not actually include any sound, but is instead a set of instructions for a synthesiser or piece\
	of software to play a song. This will be the fastest to download. All the other formats will give you immediately playable audio. Warning - wav \
	file export is very slow, so go with flac if you can.'

export const symbolicTimeHelp = 'Symbolic time is time defined in notes rather than seconds. Since tempo can change, the length of one note is not\
	necessarily constant. Each shaded area on the graph represents a section of the clicktrack, and the vertical lines represent measures.'

export const physicalTimeHelp = 'Physical time is the time in seconds at which a note occurs. Each point on the graph represents a single note.'