import { Radar } from "react-chartjs-2";
import { Chart as ChartJS, RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend } from 'chart.js';
ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend);

export default function RadarChart({ student }) {
  if (!student) return <div>Select a student to see profile</div>;

  const labels = ['Comprehension','Attention','Focus','Retention','Engagement(scaled)'];
  const engagementScaled = Math.min(100, (student.engagement_time || 0) * 0.25);

  const data = {
    labels,
    datasets: [
      {
        label: student.name,
        data: [
          student.comprehension,
          student.attention,
          student.focus,
          student.retention,
          engagementScaled
        ],
        fill: true,
        backgroundColor: 'rgba(75,192,192,0.2)',
        borderColor: 'rgba(75,192,192,1)'
      }
    ]
  };

  const options = {
    scales: { r: { suggestedMin: 0, suggestedMax: 100 } },
  };

  return (
    <div>
      <h3 className="text-md font-medium mb-2">{student.name}</h3>
      <Radar data={data} options={options} />
      <div className="mt-2 text-sm">
        <div><strong>Actual score:</strong> {student.assessment_score}</div>
        <div><strong>Predicted:</strong> {student.predicted_score}</div>
        <div><strong>Persona:</strong> {student.persona}</div>
      </div>
    </div>
  );
}
