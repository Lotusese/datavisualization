import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { XichouData, CHART_COLORS } from '../../types';

interface Props { data: XichouData[]; }

const XichouIndustryChart: React.FC<Props> = ({ data }) => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 5 }} barGap={0}>
        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
        <XAxis dataKey="year" tick={{ fill: '#64748b', fontSize: 10 }} axisLine={false} tickLine={false} />
        <YAxis label={{ value: '产值 (亿元)', angle: -90, position: 'insideLeft', style: { fill: '#94a3b8', fontSize: 10 } }} tick={{ fill: '#64748b', fontSize: 10 }} axisLine={false} tickLine={false} />
        <Tooltip cursor={{ fill: 'rgba(236, 253, 245, 0.4)' }} contentStyle={{ backgroundColor: 'rgba(255, 255, 255, 0.9)', borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
        <Legend verticalAlign="top" height={36}/>
        <Bar dataKey="tcmValue" name="中药材产值" fill={CHART_COLORS.purple} radius={[4, 4, 0, 0]} barSize={14} />
        <Bar dataKey="ruralTourismValue" name="乡村旅游产值" fill={CHART_COLORS.tertiary} radius={[4, 4, 0, 0]} barSize={14} />
      </BarChart>
    </ResponsiveContainer>
  );
};
export default XichouIndustryChart;