const getSecondBpm = (bpm, numBeats1, numBeats2) => {
	return bpm * (numBeats2 / numBeats1)
}

export default(getSecondBpm)