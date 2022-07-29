import { LineChart, Line, XAxis, YAxis, Label } from 'recharts'

const TempoCurveGraph = ({ dataPoints }) => {
	return(
		<LineChart width={350} height={200} data={dataPoints} margin={{ top: 5, right: 5, bottom: 20, left: 5 }}>
			<XAxis
				dataKey="x"
				type="number"
			>
				<Label
					value="Progress through section"
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
		</LineChart>
	)
}

export default TempoCurveGraph