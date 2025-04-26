import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface RecoveryGraphProps {
  recoveryScores: { date: string; score: number }[];
}

const RecoveryGraph: React.FC<RecoveryGraphProps> = ({ recoveryScores }) => {
  const last7Days = recoveryScores
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .slice(-7);

  return (
    <div className="bg-white p-4 rounded shadow-md">
      <h3 className="text-lg font-semibold mb-2">Recovery Score (Last 7 Days)</h3>
      <ResponsiveContainer width="100%" height={250}>
        <LineChart data={last7Days}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis domain={[0, 100]} />
          <Tooltip />
          <Line type="monotone" dataKey="score" stroke="#00BFFF" strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default RecoveryGraph;
