/* Store all help texts here to avoid cluttering the components */

export const polyrhythmHelp = 'This option allows you to play rhythms with 2 different time signatures at the same time,\
	which will sync up on every downbeat. The primary rhythm will keep the same bpm, while the bpm for the secondary\
	rhythm will be automatically calculated to sync up.'

export const mtcHelp = 'Mean tempo condition is an intuitive way to represent a tempo change over time. It is a number between \
	0 and 1 representing the point at which the tempo has gone through half of its change in value. For example, in an accelerando \
	section from 100 to 150bpm, the tempo at the mean tempo condition would be 125bpm. A mean tempo condition of 0.5 would represent \
	a linear change in tempo.'