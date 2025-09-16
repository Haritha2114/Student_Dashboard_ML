import { Scatter } from "react-chartjs-2";
import { Chart as ChartJS, LinearScale, PointElement, Tooltip, Legend } from 'chart.js';
ChartJS.register(LinearScale, PointElement, Tooltip, Legend);

export default function ScatterChart({ data }) {
  if (!data || data.length === 0) return <div>Loading...</div>;

  const points = data.map(d => ({ x: d.attention, y: d.assessment_score }));

  const chartData = {
    datasets: [
      {
        label: "Attention vs Assessment Score",
        data: points,
        showLine: false,
        pointRadius: 4
      }
    ]
  };

  const options = {
    scales: {
      x: { title: { display: true, text: 'Attention' }, min: 0, max: 100 },
      y: { title: { display: true, text: 'Assessment Score' }, min: 0, max: 100 }
    }
  };

  return (
    <div>
      <h2 className="text-lg font-semibold mb-2">Attention vs Performance</h2>
      <Scatter data={chartData} options={options} />
    </div>
  );
}
