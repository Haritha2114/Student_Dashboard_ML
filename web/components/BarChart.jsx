import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Tooltip, Legend } from 'chart.js';
ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

export default function BarChart({ data }) {
  if (!data || data.length === 0) return <div>Loading...</div>;

  // compute average skill values
  const skills = ['comprehension','attention','focus','retention'];
  const avgSkills = skills.map(s => (data.reduce((acc,cur) => acc + Number(cur[s]||0),0) / data.length).toFixed(2));
  const avgScore = (data.reduce((s,x) => s + Number(x.assessment_score||0),0) / data.length).toFixed(2);

  const chartData = {
    labels: skills.map(s => s.charAt(0).toUpperCase() + s.slice(1)),
    datasets: [
      {
        label: 'Average Skill',
        data: avgSkills,
        backgroundColor: 'rgba(54, 162, 235, 0.6)'
      }
    ]
  };

  return (
    <div>
      <h2 className="text-lg font-semibold mb-2">Average Skills</h2>
      <Bar data={chartData} />
      <div className="mt-3 text-sm text-gray-600">Avg assessment score: {avgScore}</div>
    </div>
  )
}
