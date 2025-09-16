import { useMemo, useState } from "react";

export default function StudentsTable({ data = [], onSelectStudent = () => {} }) {
  const [query, setQuery] = useState("");
  const [sortKey, setSortKey] = useState("assessment_score");
  const [desc, setDesc] = useState(true);

  const filtered = useMemo(() => {
    const q = query.toLowerCase();
    let arr = data.filter(d => !q || d.name.toLowerCase().includes(q) || String(d.class).toLowerCase().includes(q));
    arr = arr.sort((a,b) => {
      if (desc) return b[sortKey] - a[sortKey];
      return a[sortKey] - b[sortKey];
    });
    return arr.slice(0, 100); // limit for performance
  }, [data, query, sortKey, desc]);

  return (
    <div>
      <div className="flex items-center mb-3 space-x-2">
        <input value={query} onChange={(e)=>setQuery(e.target.value)} placeholder="Search name or class" className="border rounded px-2 py-1 flex-1" />
        <select value={sortKey} onChange={(e)=>setSortKey(e.target.value)} className="border rounded px-2 py-1">
          <option value="assessment_score">Score</option>
          <option value="comprehension">Comprehension</option>
          <option value="attention">Attention</option>
          <option value="engagement_time">Engagement</option>
        </select>
        <button onClick={()=>setDesc(!desc)} className="bg-slate-100 px-3 py-1 rounded">{desc ? 'Desc' : 'Asc'}</button>
      </div>

      <div className="overflow-auto">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2 text-left">Name</th>
              <th className="p-2">Class</th>
              <th className="p-2">Score</th>
              <th className="p-2">Comprehension</th>
              <th className="p-2">Attention</th>
              <th className="p-2">Engagement (min/wk)</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(s => (
              <tr key={s.student_id} onClick={() => onSelectStudent(s)} className="hover:bg-slate-50 cursor-pointer">
                <td className="p-2">{s.name}</td>
                <td className="p-2 text-center">{s.class}</td>
                <td className="p-2 text-center">{s.assessment_score}</td>
                <td className="p-2 text-center">{s.comprehension}</td>
                <td className="p-2 text-center">{s.attention}</td>
                <td className="p-2 text-center">{s.engagement_time}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
