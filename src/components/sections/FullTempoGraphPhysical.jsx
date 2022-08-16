import { ResponsiveContainer, LineChart, XAxis, YAxis, Label, Line, ReferenceArea } from 'recharts'

const FullTempoGraphPhysical = ({ dataPoints, sectionBoundaries }) => {
	const backgroundColours = ['#1E81FF', '#1EFFBE', '#2FFF1E', ]
	// Set the bounds of the y axis to have some space around the min and max values
	const yAxisMin = Math.floor([...dataPoints].sort((a, b) => a.y - b.y)[0].y - 10)
	const yAxisMax = Math.ceil([...dataPoints].sort((a, b) => b.y - a.y)[0].y + 10)

	// This prevents an ugly floating point number from being displayed on the x axis label
	const xAxisMax = Math.ceil([...dataPoints].sort((a, b) => b.x - a.x)[0].x)

	return (
		<ResponsiveContainer width="100%" height={200}>
			<LineChart margin={{ top: 5, right: 5, bottom: 20, left: 5 }} data={dataPoints}>
				<XAxis
					dataKey="x"
					type="number"
					domain={[0, xAxisMax]}
				>
					<Label
						value="Time (s)"
						position="insideBottom"
						offset={-5}
						fontFamily='roboto'
					/>
				</XAxis>
				<YAxis
					dataKey="y"
					domain={[yAxisMin, yAxisMax]}
					label={{
						value: 'Tempo (BPM)',
						angle: -90,
						position: 'insideBottomLeft',
						fontFamily: 'roboto',
						offset: 20
					}}
				/>
				<Line
					dataKey="y"
					stroke="#700000"
					strokeWidth={3}
					isAnimationActive={false}
				/>
				{sectionBoundaries.slice(0, -1).map((sb, idx) => (
					<ReferenceArea x1={sb} x2={sectionBoundaries[idx + 1]} fill={backgroundColours[idx % 3]} key={idx}/>
				))}
			</LineChart>
		</ResponsiveContainer>
	)
}

export default FullTempoGraphPhysical