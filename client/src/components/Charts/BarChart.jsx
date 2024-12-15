import React from 'react'
import {Chart as ChartJS} from 'chart.js/auto';
import { Bar, Line } from 'react-chartjs-2';

function BarChart() {
  return (
    <div>
        <Bar
            data={{
                labels: ["A", "B", "C"],
                datasets: [{
                    labels: "Revenue",
                    data: [200, 300, 400]
                }]
            }}
        />
    </div>
  )
}

export default BarChart