import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { BaiseData, CHART_COLORS } from '../../../types';

interface Props { data: BaiseData[]; }

const BaiseIndustryChart: React.FC<Props> = ({ data }) => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 5 }} barGap={0}>
        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
        <XAxis dataKey="year" tick={{ fill: '#64748b', fontSize: 10 }} axisLine={false} tickLine={false} />
        <YAxis label={{ value: '产值 (亿元)', angle: -90, position: 'insideLeft', style: { fill: '#94a3b8', fontSize: 10 } }} tick={{ fill: '#64748b', fontSize: 10 }} axisLine={false} tickLine={false} />
        <Tooltip cursor={{ fill: 'rgba(254, 243, 199, 0.3)' }} contentStyle={{ backgroundColor: 'rgba(255, 255, 255, 0.9)', borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
        <Legend verticalAlign="top" height={36}/>
        <Bar dataKey="mangoValue" name="芒果产值" stackId="a" fill={CHART_COLORS.gold} barSize={20} />
        <Bar dataKey="teaValue" name="茶叶产值" stackId="a" fill={CHART_COLORS.primary} barSize={20} />
        <Bar dataKey="borderTradeValue" name="边境贸易额" stackId="a" fill={CHART_COLORS.blue} radius={[4, 4, 0, 0]} barSize={20} />
      </BarChart>
    </ResponsiveContainer>
  );
};
export default BaiseIndustryChart;