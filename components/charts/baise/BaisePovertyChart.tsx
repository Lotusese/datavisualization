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
import { BaiseData, CHART_COLORS } from '../../../types';

interface Props {
  data: BaiseData[];
}

const BaisePovertyChart: React.FC<Props> = ({ data }) => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <ComposedChart
        data={data}
        margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
      >
        <CartesianGrid stroke="#f0f0f0" strokeDasharray="3 3" vertical={false} />
        <XAxis 
          dataKey="year" 
          tick={{ fill: '#64748b', fontSize: 10 }} 
          axisLine={false}
          tickLine={false}
        />
        <YAxis 
          yAxisId="left"
          label={{ value: '贫困人口 (万人)', angle: -90, position: 'insideLeft', style: { fill: CHART_COLORS.red, fontSize: 10 } }}
          tick={{ fill: CHART_COLORS.red, fontSize: 10 }}
          axisLine={false}
          tickLine={false}
        />
        <YAxis 
          yAxisId="right"
          orientation="right"
          label={{ value: '贫困率 (%)', angle: 90, position: 'insideRight', style: { fill: CHART_COLORS.text, fontSize: 10 } }}
          tick={{ fill: CHART_COLORS.text, fontSize: 10 }}
          axisLine={false}
          tickLine={false}
        />
        <Tooltip 
          contentStyle={{ backgroundColor: 'rgba(255, 255, 255, 0.95)', borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
        />
        <Legend verticalAlign="top" height={36}/>
        
        <Bar 
          yAxisId="left"
          dataKey="poorPopulation" 
          name="建档立卡贫困人口" 
          fill={CHART_COLORS.red} 
          barSize={20}
          radius={[4, 4, 0, 0]}
          fillOpacity={0.8}
        />
        <Line 
          yAxisId="right"
          type="monotone" 
          dataKey="povertyRate" 
          name="贫困发生率" 
          stroke={CHART_COLORS.text} 
          strokeWidth={2}
          strokeDasharray="5 5"
          dot={{ r: 3 }}
        />
         <Line 
          yAxisId="left"
          type="stepAfter" 
          dataKey="monitoringObjects" 
          name="返贫监测对象" 
          stroke={CHART_COLORS.orange} 
          strokeWidth={2}
          connectNulls
          dot={{ r: 4, fill: CHART_COLORS.orange }}
        />
      </ComposedChart>
    </ResponsiveContainer>
  );
};

export default BaisePovertyChart;