export default function Insights({ data = [] }) {
  if (!data || data.length === 0) return <div>Loading insights...</div>;

  // compute correlations roughly (client side)
  const mean = arr => arr.reduce((s,x)=>s+x,0)/arr.length;
  const xs = data.map(d => d.attention);
  const ys = data.map(d => d.assessment_score);
  // compute Pearson r (simple)
  const pearson = (x,y) => {
    const mx = mean(x), my = mean(y);
    const num = x.map((v,i)=> (v-mx)*(y[i]-my)).reduce((a,b)=>a+b,0);
    const den = Math.sqrt(x.map(v=> (v-mx)*(v-mx)).reduce((a,b)=>a+b,0) * y.map(v=> (v-my)*(v-my)).reduce((a,b)=>a+b,0));
    return (den===0)?0:(num/den).toFixed(2);
  }

  const attention_corr = pearson(data.map(d=>d.attention), data.map(d=>d.assessment_score));
  const comprehension_corr = pearson(data.map(d=>d.comprehension), data.map(d=>d.assessment_score));

  // cluster counts
  const personaCounts = data.reduce((acc,d)=>{
    acc[d.persona] = (acc[d.persona]||0) + 1;
    return acc;
  }, {});

  return (
    <div className="mt-4">
      <h3 className="text-md font-semibold mb-2">Automatic Insights</h3>
      <ul className="text-sm list-disc ml-5 space-y-1">
        <li>Attention correlation with score (Pearson r): <strong>{attention_corr}</strong></li>
        <li>Comprehension correlation with score (Pearson r): <strong>{comprehension_corr}</strong></li>
        <li>Persona distribution: {Object.entries(personaCounts).map(([k,v])=> `${k}: ${v}`).join(' · ')}</li>
      </ul>
      <div className="mt-3 text-xs text-gray-600">
        Note: correlations are approximate client-side calculations. For detailed analysis check the Jupyter Notebook.
      </div>
    </div>
  );
}
