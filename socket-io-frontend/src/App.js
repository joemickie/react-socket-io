import './App.css';
import io from "socket.io-client";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { useEffect, useState } from 'react';
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
)

// const socket = io("http://localhost:4000");
const socket = io("https://react-socket-io-backend.onrender.com");

function App() {
  return (
    <div className="App">
      <RealtimeChart />
    </div>
  );
}

const RealtimeChart = () => {
  const [dataPoints, setDataPoints] = useState([]);

  useEffect(() => {
    socket.on("stockData", (data) => {
      setDataPoints(currentPoints => [...currentPoints, data])
    })
  }, [])

  const chartData = {
    labels: dataPoints.map(point => point.day),
    datasets: [
      {
        label: 'Stock Price',
        data: dataPoints.map(point => point.price),
        fill: false,
        borderColor: 'rgba(75, 192, 192, 1)'
      },
    ],
  };

  return (<div style={{width: '70%', height: '70vh', margin: '100px auto'}}>
    <Line data={chartData}/>
  </div>)
}

export default App;
