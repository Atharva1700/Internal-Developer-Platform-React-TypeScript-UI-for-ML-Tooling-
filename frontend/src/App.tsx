import { useState } from 'react';
import axios from 'axios';

interface EvalResult {
  run_id: string;
  status: 'running' | 'completed' | 'failed';
  accuracy: number;
  f1_score: number;
}

export function App() {
  const [results, setResults] = useState<EvalResult[]>([]);
  const [loading, setLoading] = useState(false);

  const triggerEval = async () => {
    setLoading(true);
    try {
      const response = await axios.post('http://localhost:8000/api/eval', {
        model_version: 'v1.0',
      });
      setResults([...results, response.data]);
    } catch (err) {
      console.error('Eval trigger failed:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      <h1>ML Model Evaluation Platform</h1>
      <button onClick={triggerEval} disabled={loading}>
        {loading ? 'Running...' : 'Trigger Evaluation'}
      </button>
      <div style={{ marginTop: '20px' }}>
        {results.map((r) => (
          <div key={r.run_id} style={{ border: '1px solid #ccc', padding: '10px', marginTop: '10px' }}>
            <h3>Run {r.run_id}</h3>
            <p>Status: {r.status}</p>
            <p>Accuracy: {r.accuracy.toFixed(3)}</p>
            <p>F1 Score: {r.f1_score.toFixed(3)}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
