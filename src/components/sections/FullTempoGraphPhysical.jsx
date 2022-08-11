import { ResponsiveContainer, LineChart, XAxis, YAxis, Label, Line } from 'recharts'

const FullTempoGraphPhysical = ({ dataPoints }) => {
	// Set the bounds of the y axis to have some space around the min and max values
	const yAxisMin = [...dataPoints].sort((a, b) => a.y - b.y)[0].y - 10
	const yAxisMax = [...dataPoints].sort((a, b) => b.y - a.y)[0].y + 10

	// This prevents an ugly floating point number from being displayed on the x axis label
	const xAxisMax = Math.ceil([...dataPoints].sort((a, b) => b.x - a.x)[0].x)

	return (
		<ResponsiveContainer width="85%" height={200}>
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
				<Line
					dataKey="y"
					stroke="#700000"
					strokeWidth={3}
					isAnimationActive={false}
				/>
			</LineChart>
		</ResponsiveContainer>
	)
}

export default FullTempoGraphPhysical