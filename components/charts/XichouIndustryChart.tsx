
import React from 'react';
import {
  ComposedChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { XichouData, CHART_COLORS } from '../../types';

interface Props {
  data: XichouData[];
}

const XichouIndustryChart: React.FC<Props> = ({ data }) => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <ComposedChart
        data={data}
        margin={{ top: 20, right: 20, bottom: 5, left: 10 }}
      >
        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
        <XAxis 
          dataKey="year" 
          tick={{ fill: '#64748b', fontSize: 10 }} 
          axisLine={false}
          tickLine={false}
        />
        
        {/* 左侧 Y 轴：对应中药材 (产值较大) */}
        <YAxis 
          yAxisId="left"
          orientation="left"
          stroke={CHART_COLORS.purple}
          tick={{ fill: CHART_COLORS.purple, fontSize: 10 }} 
          axisLine={false}
          tickLine={false}
          label={{ value: '中药材 (亿元)', angle: -90, position: 'insideLeft', style: { fill: CHART_COLORS.purple, fontSize: 10, fontWeight: 'bold' } }}
        />

        {/* 右侧 Y 轴：对应乡村旅游 (产值较小) */}
        <YAxis 
          yAxisId="right"
          orientation="right"
          stroke={CHART_COLORS.tertiary}
          tick={{ fill: CHART_COLORS.tertiary, fontSize: 10 }} 
          axisLine={false}
          tickLine={false}
          label={{ value: '乡村旅游 (亿元)', angle: 90, position: 'insideRight', style: { fill: CHART_COLORS.tertiary, fontSize: 10, fontWeight: 'bold' } }}
        />

        <Tooltip 
          cursor={{ fill: 'rgba(236, 253, 245, 0.4)' }}
          contentStyle={{ backgroundColor: 'rgba(255, 255, 255, 0.95)', borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)' }}
          formatter={(value: any, name: string) => [`${value} 亿元`, name]}
        />
        <Legend 
          verticalAlign="top" 
          height={36} 
          iconType="rect"
          wrapperStyle={{ fontSize: '12px', fontWeight: 'bold' }}
        />
        
        {/* 中药材柱子 - 挂载到左轴 */}
        <Bar 
          yAxisId="left"
          dataKey="tcmValue" 
          name="中药材产值" 
          fill={CHART_COLORS.purple} 
          radius={[4, 4, 0, 0]} 
          barSize={15}
        />
        
        {/* 乡村旅游柱子 - 挂载到右轴 */}
        <Bar 
          yAxisId="right"
          dataKey="ruralTourismValue" 
          name="乡村旅游产值" 
          fill={CHART_COLORS.tertiary} 
          radius={[4, 4, 0, 0]} 
          barSize={15}
        />
      </ComposedChart>
    </ResponsiveContainer>
  );
};

export default XichouIndustryChart;
