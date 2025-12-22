import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { BaiseData, CHART_COLORS } from '../../../types';

interface Props { data: BaiseData[]; }

const BaiseIncomeChart: React.FC<Props> = ({ data }) => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
        <defs>
          <linearGradient id="colorCityIncome" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor={CHART_COLORS.gold} stopOpacity={0.8}/><stop offset="95%" stopColor={CHART_COLORS.gold} stopOpacity={0.1}/></linearGradient>
          <linearGradient id="colorBorderIncome" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor={CHART_COLORS.red} stopOpacity={0.8}/><stop offset="95%" stopColor={CHART_COLORS.red} stopOpacity={0.1}/></linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
        <XAxis dataKey="year" tick={{ fill: '#64748b', fontSize: 10 }} axisLine={false} tickLine={false} />
        <YAxis tick={{ fill: '#64748b', fontSize: 10 }} axisLine={false} tickLine={false} domain={['dataMin - 1000', 'auto']} />
        <Tooltip contentStyle={{ backgroundColor: 'rgba(255, 255, 255, 0.9)', borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
        <Legend verticalAlign="top" iconType="circle" height={36}/>
        <Area type="monotone" dataKey="cityRuralIncome" name="全市农村居民收入" stroke={CHART_COLORS.gold} fill="url(#colorCityIncome)" strokeWidth={3} />
        <Area type="monotone" dataKey="borderRuralIncome" name="边境县居民收入" stroke={CHART_COLORS.red} fill="url(#colorBorderIncome)" strokeWidth={3} />
      </AreaChart>
    </ResponsiveContainer>
  );
};
export default BaiseIncomeChart;