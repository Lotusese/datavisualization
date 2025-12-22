import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { XichouData, CHART_COLORS } from '../../types';

interface Props { data: XichouData[]; }

const XichouEcoChart: React.FC<Props> = ({ data }) => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
        <defs>
          <linearGradient id="colorForest" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor={CHART_COLORS.primary} stopOpacity={0.8}/><stop offset="95%" stopColor={CHART_COLORS.primary} stopOpacity={0.1}/></linearGradient>
          <linearGradient id="colorRock" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#94a3b8" stopOpacity={0.8}/><stop offset="95%" stopColor="#94a3b8" stopOpacity={0.1}/></linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
        <XAxis dataKey="year" tick={{ fill: '#64748b', fontSize: 10 }} axisLine={false} tickLine={false} />
        <YAxis unit="%" tick={{ fill: '#64748b', fontSize: 10 }} axisLine={false} tickLine={false} />
        <Tooltip contentStyle={{ backgroundColor: 'rgba(255, 255, 255, 0.9)', borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
        <Legend verticalAlign="top" iconType="circle" height={36}/>
        <Area type="monotone" dataKey="forestCoverage" name="森林覆盖率 (%)" stroke={CHART_COLORS.primary} fill="url(#colorForest)" strokeWidth={3} />
        <Area type="monotone" dataKey="rockyDesertShare" name="石漠化占比 (%)" stroke="#64748b" fill="url(#colorRock)" strokeWidth={3} />
      </AreaChart>
    </ResponsiveContainer>
  );
};
export default XichouEcoChart;