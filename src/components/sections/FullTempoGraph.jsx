import { LineChart, Line, XAxis, YAxis, Label, ReferenceArea } from 'recharts'

const FullTempoGraph = ({ dataPoints, sectionBoundaries }) => {
	const backgroundColours = ['#1E81FF', '#1EFFBE', '#2FFF1E', ]
	const yAxisMin = [...dataPoints].sort((a, b) => a.y - b.y)[0].y - 10
	const yAxisMax = [...dataPoints].sort((a, b) => b.y - a.y)[0].y + 10

	return (

		<LineChart width={350} height={200} data={dataPoints}>
			<XAxis
				dataKey="x"
				type="number"
			>
				<Label
					value="Progress through track (in notes)"
					position="insideBottom"
					offset={-5}
				/>
			</XAxis>
			<YAxis
				dataKey="y"
				domain={[yAxisMin, yAxisMax]}
				label={{
					value: 'Tempo (BPM)',
					angle: -90,
					position: 'insideBottomLeft'
				}}
			/>
			<Line type="monotone" dataKey="y" stroke="#700000" strokeWidth={3} isAnimationActive={false} />
			{sectionBoundaries.slice(0, -1).map((sb, idx) => (
				<ReferenceArea x1={sb} x2={sectionBoundaries[idx + 1]} fill={backgroundColours[idx % 3]} key={idx}/>
			))}
		</LineChart>
	)
}

export default FullTempoGraph