import { useState } from 'react';

export default function Home() {
  const [hour, setHour] = useState(20);
  const [weather, setWeather] = useState(0.5);
  const [event, setEvent] = useState(0.5);
  const [result, setResult] = useState(null);

  const predict = async () => {
    const res = await fetch('/api/predict', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ hour, weather_score: weather, event_score: event })
    });
    const data = await res.json();
    setResult(data.predicted_foot_traffic);
  };

  return (
    <div style={{ padding: 40 }}>
      <h1>Krowd Guide Predictor</h1>
      <input type="number" value={hour} onChange={e => setHour(+e.target.value)} placeholder="Hour" /><br />
      <input type="number" step="0.1" value={weather} onChange={e => setWeather(+e.target.value)} placeholder="Weather Score" /><br />
      <input type="number" step="0.1" value={event} onChange={e => setEvent(+e.target.value)} placeholder="Event Score" /><br />
      <button onClick={predict}>Predict</button>
      {result && <h2>Predicted Foot Traffic: {result}</h2>}
    </div>
  );
}