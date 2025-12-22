import React from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { AnnualData, CHART_COLORS } from '../../types';

interface Props {
  data: AnnualData[];
}

const RiskChart: React.FC<Props> = ({ data }) => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart
        data={data}
        margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
      >
        <defs>
          <linearGradient id="colorRisk" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#ef4444" stopOpacity={0.6}/>
            <stop offset="95%" stopColor="#ef4444" stopOpacity={0.05}/>
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
        <XAxis 
          dataKey="year" 
          tick={{ fill: '#64748b', fontSize: 12 }} 
          axisLine={false}
          tickLine={false}
        />
        <YAxis 
          tick={{ fill: '#64748b', fontSize: 12 }} 
          axisLine={false}
          tickLine={false}
          label={{ value: '人数 (万人)', angle: -90, position: 'insideLeft', style: { fill: '#94a3b8', fontSize: 12 } }}
        />
        <Tooltip 
          contentStyle={{ backgroundColor: 'rgba(255, 255, 255, 0.95)', borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
          itemStyle={{ color: '#ef4444' }}
        />
        <Area 
          type="monotone" 
          dataKey="riskObjects" 
          name="未消除风险监测对象"
          stroke="#ef4444" 
          strokeWidth={3}
          fillOpacity={1} 
          fill="url(#colorRisk)" 
          animationDuration={1500}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
};

export default RiskChart;