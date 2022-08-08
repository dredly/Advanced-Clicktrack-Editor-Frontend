import { LineChart, Line, XAxis, YAxis, Label, ReferenceArea } from 'recharts'

const FullTempoGraph = ({ dataPoints, sectionBoundaries }) => (
	<LineChart width={350} height={200} data={dataPoints}>
		<XAxis
			dataKey="x"
			type="number"
		>
			<Label
				value="Progress through section (in notes)"
				position="insideBottom"
				offset={-5}
			/>
		</XAxis>
		<YAxis
			dataKey="y"
			domain={['dataMin', 'dataMax']}
			label={{
				value: 'Tempo (BPM)',
				angle: -90,
				position: 'insideBottomLeft'
			}}
		/>
		<Line type="monotoneY" dataKey="y" stroke="#8884d8" strokeWidth={2} isAnimationActive={false} />
		{sectionBoundaries.slice(0, -1).map((sb, idx) => (
			<ReferenceArea x1={sb} x2={sectionBoundaries[idx + 1]} stroke="red" strokeOpacity={0.3} key={idx}/>
		))}
	</LineChart>
)

export default FullTempoGraph