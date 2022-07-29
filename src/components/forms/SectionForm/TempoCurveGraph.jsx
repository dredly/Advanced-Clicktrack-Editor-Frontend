import { LineChart, Line, XAxis, YAxis } from 'recharts'

const TempoCurveGraph = ({ dataPoints }) => {
	//Temporary, while setting up a different charting library
	return(
		<LineChart width={300} height={100} data={dataPoints}>
			<XAxis dataKey="x" type="number" />
			<YAxis dataKey="y" />
			<Line type="monotoneY" dataKey="y" stroke="#8884d8" strokeWidth={2} isAnimationActive={false} />
		</LineChart>
	)
}

export default TempoCurveGraph