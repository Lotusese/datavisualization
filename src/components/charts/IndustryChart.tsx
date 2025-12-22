import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { AnnualData } from '../../types';

interface Props { data: AnnualData[]; }

const IndustryChart: React.FC<Props> = ({ data }) => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 5 }} barGap={2}>
        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
        <XAxis dataKey="year" tick={{ fill: '#64748b', fontSize: 12 }} axisLine={false} tickLine={false} />
        <YAxis label={{ value: '产值 (亿元)', angle: -90, position: 'insideLeft', style: { fill: '#94a3b8', fontSize: 12 } }} tick={{ fill: '#64748b', fontSize: 12 }} axisLine={false} tickLine={false} />
        <Tooltip cursor={{ fill: 'rgba(236, 253, 245, 0.4)' }} contentStyle={{ backgroundColor: 'rgba(255, 255, 255, 0.9)', borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
        <Legend verticalAlign="top" wrapperStyle={{ paddingBottom: '10px' }}/>
        <Bar dataKey="industryValue" name="六大产业总产值" fill="#4d7c0f" radius={[4, 4, 0, 0]} barSize={12} />
        <Bar dataKey="vegValue" name="蔬菜产业" fill="#16a34a" radius={[4, 4, 0, 0]} barSize={12} />
        <Bar dataKey="teaValue" name="茶叶产业" fill="#84cc16" radius={[4, 4, 0, 0]} barSize={12} />
      </BarChart>
    </ResponsiveContainer>
  );
};
export default IndustryChart;