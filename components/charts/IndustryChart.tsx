
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
import { AnnualData, CHART_COLORS } from '../../types';

interface Props {
  data: AnnualData[];
}

const IndustryChart: React.FC<Props> = ({ data }) => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <ComposedChart
        data={data}
        margin={{ top: 20, right: 10, left: 10, bottom: 5 }}
        barGap={4}
      >
        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
        <XAxis 
          dataKey="year" 
          tick={{ fill: '#64748b', fontSize: 12 }} 
          axisLine={false}
          tickLine={false}
        />
        
        {/* 左侧 Y 轴：对应六大产业总产值 (数值较大) */}
        <YAxis 
          yAxisId="left"
          orientation="left"
          stroke="#4d7c0f"
          tick={{ fill: '#4d7c0f', fontSize: 11 }} 
          axisLine={false}
          tickLine={false}
          label={{ 
            value: '总产值 (亿元)', 
            angle: -90, 
            position: 'insideLeft', 
            style: { fill: '#4d7c0f', fontSize: 11, fontWeight: 'bold' } 
          }}
        />

        {/* 右侧 Y 轴：对应特色子产业 (数值相对较小) */}
        <YAxis 
          yAxisId="right"
          orientation="right"
          stroke="#16a34a"
          tick={{ fill: '#16a34a', fontSize: 11 }} 
          axisLine={false}
          tickLine={false}
          label={{ 
            value: '特色产业 (亿元)', 
            angle: 90, 
            position: 'insideRight', 
            style: { fill: '#16a34a', fontSize: 11, fontWeight: 'bold' } 
          }}
        />

        <Tooltip 
          cursor={{ fill: 'rgba(236, 253, 245, 0.4)' }}
          contentStyle={{ 
            backgroundColor: 'rgba(255, 255, 255, 0.95)', 
            borderRadius: '12px', 
            border: 'none', 
            boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)' 
          }}
          formatter={(value: any, name: string) => [`${value} 亿元`, name]}
        />
        <Legend 
          verticalAlign="top" 
          height={36} 
          iconType="rect"
          wrapperStyle={{ fontSize: '12px', fontWeight: 'bold', color: '#334155' }}
        />
        
        {/* 六大产业总产值 - 挂载到左轴 */}
        <Bar 
          yAxisId="left"
          dataKey="industryValue" 
          name="六大产业总产值" 
          fill="#4d7c0f" 
          radius={[4, 4, 0, 0]} 
          barSize={18}
        />
        
        {/* 蔬菜产业 - 挂载到右轴 */}
        <Bar 
          yAxisId="right"
          dataKey="vegValue" 
          name="蔬菜产业产值" 
          fill="#16a34a" 
          radius={[4, 4, 0, 0]} 
          barSize={12}
        />
        
        {/* 茶叶产业 - 挂载到右轴 */}
        <Bar 
          yAxisId="right"
          dataKey="teaValue" 
          name="茶叶产业产值" 
          fill="#84cc16" 
          radius={[4, 4, 0, 0]} 
          barSize={12}
        />
      </ComposedChart>
    </ResponsiveContainer>
  );
};

export default IndustryChart;
