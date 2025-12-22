import React from 'react';
import {
  ComposedChart,
  Bar,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { AnnualData, CHART_COLORS } from '../../types';

interface Props {
  data: AnnualData[];
}

const IncomeChart: React.FC<Props> = ({ data }) => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <ComposedChart
        data={data}
        margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
      >
        <CartesianGrid stroke="#f0f0f0" strokeDasharray="3 3" vertical={false} />
        <XAxis 
          dataKey="year" 
          scale="point" 
          padding={{ left: 30, right: 30 }} 
          tick={{ fill: '#64748b', fontSize: 12 }}
          axisLine={false}
          tickLine={false}
        />
        {/* Left Axis: Income */}
        <YAxis 
          yAxisId="left" 
          tick={{ fill: CHART_COLORS.primary, fontSize: 12 }}
          axisLine={false}
          tickLine={false}
          label={{ value: '收入 (元)', angle: -90, position: 'insideLeft', style: { fill: CHART_COLORS.primary, fontSize: 10, textAnchor: 'middle' } }}
        />
        {/* Right Axis: Percentage */}
        <YAxis 
          yAxisId="right" 
          orientation="right" 
          tick={{ fill: CHART_COLORS.secondary, fontSize: 12 }}
          axisLine={false}
          tickLine={false}
          unit="%"
          domain={[0, 20]}
        />
        <Tooltip 
          contentStyle={{ backgroundColor: 'rgba(255, 255, 255, 0.9)', borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
          formatter={(value: any, name: string, item: any) => {
             // 使用 item.dataKey 来精确判断是哪一组数据
             if (item && item.dataKey === 'incomeGrowth') {
               return [`${value}%`, '同比增长率'];
             }
             if (item && item.dataKey === 'income') {
               return [`${value} 元`, '人均可支配收入'];
             }
             // 兜底显示
             return [value, name];
          }}
        />
        <Legend wrapperStyle={{ paddingTop: '10px' }} />
        
        <Bar 
          yAxisId="left" 
          dataKey="income" 
          name="人均可支配收入" 
          barSize={20} 
          fill="url(#colorIncome)" 
          radius={[4, 4, 0, 0]} 
        />
        <Line 
          yAxisId="right" 
          type="monotone" 
          dataKey="incomeGrowth" 
          name="同比增长率" 
          stroke={CHART_COLORS.secondary} 
          strokeWidth={3}
          dot={{ r: 4, fill: CHART_COLORS.secondary, strokeWidth: 2, stroke: '#fff' }}
          activeDot={{ r: 6 }}
        />
        <defs>
          <linearGradient id="colorIncome" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor={CHART_COLORS.primary} stopOpacity={0.8}/>
            <stop offset="95%" stopColor={CHART_COLORS.primary} stopOpacity={0.4}/>
          </linearGradient>
        </defs>
      </ComposedChart>
    </ResponsiveContainer>
  );
};

export default IncomeChart;