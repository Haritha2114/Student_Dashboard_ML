import { useEffect, useState } from "react";
import OverviewCard from "../components/OverviewCard";
import BarChart from "../components/BarChart";
import ScatterChart from "../components/ScatterChart";
import RadarChart from "../components/RadarChart";
import StudentsTable from "../components/StudentsTable";
import Insights from "../components/Insights";

export default function Home({ initData }) {
  const [data, setData] = useState(initData || []);

  // compute overview stats
  const avg = (arr) => (arr.reduce((s, x) => s + x, 0) / arr.length).toFixed(2);

  const avgScore = data.length ? avg(data.map(d => d.assessment_score)) : 0;
  const avgAttention = data.length ? avg(data.map(d => d.attention)) : 0;
  const avgEngagement = data.length ? avg(data.map(d => d.engagement_time)) : 0;
  const studentCount = data.length;

  // react: selected student for radar
  const [selectedStudent, setSelectedStudent] = useState(data[0] || null);

  useEffect(() => {
    if (!initData) {
      fetch('/api/students').then(r => r.json()).then(setData);
    }
  }, [initData]);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Cognitive Skills & Student Performance Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <OverviewCard title="Students" value={studentCount} />
        <OverviewCard title="Avg Score" value={avgScore} />
        <OverviewCard title="Avg Attention" value={avgAttention} />
        <OverviewCard title="Avg Engagement (min/wk)" value={avgEngagement} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <div className="col-span-2 bg-white p-4 rounded shadow">
          <BarChart data={data} />
        </div>
        <div className="bg-white p-4 rounded shadow">
          <ScatterChart data={data} />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <div className="col-span-2 bg-white p-4 rounded shadow">
          <StudentsTable data={data} onSelectStudent={(s) => setSelectedStudent(s)} />
        </div>
        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-lg font-semibold mb-2">Student Profile</h2>
          <RadarChart student={selectedStudent} />
          <Insights data={data} />
        </div>
      </div>

    </div>
  );
}

export async function getStaticProps() {
  // try to read static data at build time to speed up demo
  const fs = require('fs');
  const path = require('path');
  const filePath = path.join(process.cwd(), 'public', 'data', 'students_processed.json');
  let data = [];
  try {
    data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  } catch (e) {
    console.warn("No static data found at build time");
  }
  return {
    props: { initData: data },
    revalidate: 10,
  };
}
