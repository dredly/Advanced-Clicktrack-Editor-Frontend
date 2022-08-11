import { LineChart, Line, XAxis, YAxis, Label, ReferenceArea, ResponsiveContainer } from 'recharts'
import { splitIntoSeries } from '../../utils/tempoCurveCalculator'

const FullTempoGraphSymbolic = ({ dataPoints, sectionBoundaries }) => {
	const backgroundColours = ['#1E81FF', '#1EFFBE', '#2FFF1E', ]
	// Set the bounds of the y axis to have some space around the min and max values
	const yAxisMin = [...dataPoints].sort((a, b) => a.y - b.y)[0].y - 10
	const yAxisMax = [...dataPoints].sort((a, b) => b.y - a.y)[0].y + 10

	const series = splitIntoSeries(dataPoints)
	const measuresData = dataPoints
		.filter(dp => dp.m)
		.map(dp => {
			return { ...dp, y: yAxisMax - 10 }
		})

	return (
		<ResponsiveContainer width="85%" height={200}>
			<LineChart margin={{ top: 5, right: 5, bottom: 20, left: 5 }}>
				<XAxis
					xAxisId="bottom"
					dataKey="x"
					type="number"
					domain={['dataMin', 'dataMax']}
				>
					<Label
						value="Progress through track (in notes)"
						position="insideBottom"
						offset={-5}
					/>
				</XAxis>
				<XAxis
					xAxisId="top"
					dataKey="m"
					type="number"
					orientation="top"
					domain={[0, 'dataMax']}
				>
					<Label
						value="Progress through track (in measures)"
						position="insideTop"
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
				{series.map(s => (
					<Line
						type="monotone"
						xAxisId="bottom"
						dataKey="y"
						data={s.data}
						name={s.name}
						stroke="#700000"
						strokeWidth={3}
						isAnimationActive={false}
						key={s.name}
					/>
				))}
				<Line
					xAxisId="top"
					dataKey="y"
					data={measuresData}
					isAnimationActive={false}
					className={'hidden'}
				/>
				{sectionBoundaries.slice(0, -1).map((sb, idx) => (
					<ReferenceArea xAxisId="bottom" x1={sb} x2={sectionBoundaries[idx + 1]} fill={backgroundColours[idx % 3]} key={idx}/>
				))}
			</LineChart>
		</ResponsiveContainer>
	)
}

export default FullTempoGraphSymbolic