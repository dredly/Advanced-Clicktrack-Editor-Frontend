import { LineChart, Line, XAxis, YAxis, Label, ResponsiveContainer } from 'recharts'

const TempoCurveGraph = ({ dataPoints }) => {
	return(
		<ResponsiveContainer width="90%" height={170}>
			<LineChart data={dataPoints} margin={{ top: 5, right: 5, bottom: 20, left: 5 }}>
				<XAxis
					dataKey="x"
					type="number"
				>
					<Label
						value="Progress through section"
						position="insideBottom"
						offset={-5}
						fontFamily='roboto'
					/>
				</XAxis>
				<YAxis
					dataKey="y"
					domain={['dataMin', 'dataMax']}
					label={{
						value: 'Tempo (BPM)',
						angle: -90,
						position: 'insideBottomLeft',
						fontFamily: 'roboto',
						offset: 20
					}}
				/>
				<Line type="monotoneY" dataKey="y" stroke="#8884d8" strokeWidth={2} isAnimationActive={false} />
			</LineChart>
		</ResponsiveContainer>
	)
}

export default TempoCurveGraph