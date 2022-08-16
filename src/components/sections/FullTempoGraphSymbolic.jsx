import { LineChart, Line, XAxis, YAxis, Label, ReferenceArea, ReferenceLine, ResponsiveContainer } from 'recharts'
import { splitIntoSeries } from '../../utils/tempoCurveCalculator'

const FullTempoGraphSymbolic = ({ dataPoints, sectionBoundaries, measureData }) => {
	const backgroundColours = ['#1E81FF', '#1EFFBE', '#2FFF1E', ]
	// Set the bounds of the y axis to have some space around the min and max values
	const yAxisMin = [...dataPoints].sort((a, b) => a.y - b.y)[0].y - 10
	const yAxisMax = [...dataPoints].sort((a, b) => b.y - a.y)[0].y + 10

	const series = splitIntoSeries(dataPoints)

	return (
		<ResponsiveContainer width="100%" height={200}>
			<LineChart margin={{ top: 5, right: 5, bottom: 20, left: 5 }}>
				<XAxis
					xAxisId="bottom"
					dataKey="x"
					type="number"
					domain={['dataMin', 'dataMax']}
				>
					<Label
						value="Progress through track (in quarter notes)"
						position="insideBottom"
						offset={-5}
						fontFamily="roboto"
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
				{sectionBoundaries.slice(0, -1).map((sb, idx) => (
					<ReferenceArea xAxisId="bottom" x1={sb} x2={sectionBoundaries[idx + 1]} fill={backgroundColours[idx % 3]} key={idx}/>
				))}
				{measureData.map(m => (
					<ReferenceLine xAxisId="bottom" x={m} stroke="rgba(12, 12, 61, 0.4)" key={m} />
				))

				}
			</LineChart>
		</ResponsiveContainer>
	)
}

export default FullTempoGraphSymbolic