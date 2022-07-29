import { CanvasJSChart } from 'canvasjs-react-charts'

const TempoCurveGraph = ({ dataPoints }) => {
	const options = {
		interactivityEnabled: false,
		axisX: {
			title: 'Time'
		},
		axisY: {
			title: 'BPM',
		},
		data: [{
			type: 'spline',
			markerSize: 0,
			dataPoints
		}]
	}

	return <CanvasJSChart options={options} />
}

export default TempoCurveGraph