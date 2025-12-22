import React from 'react';
import { ComposedChart, Bar, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { XichouData, CHART_COLORS } from '../../types';

interface Props { data: XichouData[]; }

const XichouIncomeChart: React.FC<Props> = ({ data }) => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <ComposedChart data={data} margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
        <CartesianGrid stroke="#f0f0f0" strokeDasharray="3 3" vertical={false} />
        <XAxis dataKey="year" scale="point" padding={{ left: 10, right: 10 }} tick={{ fill: '#64748b', fontSize: 10 }} axisLine={false} tickLine={false} />
        <YAxis yAxisId="left" tick={{ fill: CHART_COLORS.orange, fontSize: 10 }} axisLine={false} tickLine={false} label={{ value: '收入 (元)', angle: -90, position: 'insideLeft', style: { fill: CHART_COLORS.orange, fontSize: 10 } }} />
        <YAxis yAxisId="right" orientation="right" tick={{ fill: CHART_COLORS.text, fontSize: 10 }} axisLine={false} tickLine={false} label={{ value: '城乡比 (X:1)', angle: 90, position: 'insideRight', style: { fill: CHART_COLORS.text, fontSize: 10 } }} domain={[0, 4.5]} />
        <Tooltip contentStyle={{ backgroundColor: 'rgba(255, 255, 255, 0.9)', borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
        <Legend verticalAlign="top" height={36}/>
        <Bar yAxisId="left" dataKey="ruralIncome" name="农村人均收入" barSize={12} fill={CHART_COLORS.orange} radius={[4, 4, 0, 0]} />
        <Line yAxisId="right" type="monotone" dataKey="urbanRuralRatio" name="城乡收入比" stroke={CHART_COLORS.text} strokeWidth={3} strokeDasharray="5 5" dot={{ r: 3 }} />
      </ComposedChart>
    </ResponsiveContainer>
  );
};
export default XichouIncomeChart;