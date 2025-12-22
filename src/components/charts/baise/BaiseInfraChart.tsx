import React from 'react';
import { ComposedChart, Bar, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { BaiseData, CHART_COLORS } from '../../../types';

interface Props { data: BaiseData[]; }

const BaiseInfraChart: React.FC<Props> = ({ data }) => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <ComposedChart data={data} margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
        <CartesianGrid stroke="#f0f0f0" strokeDasharray="3 3" vertical={false} />
        <XAxis dataKey="year" tick={{ fill: '#64748b', fontSize: 10 }} axisLine={false} tickLine={false} />
        <YAxis yAxisId="left" tick={{ fill: CHART_COLORS.blue, fontSize: 10 }} axisLine={false} tickLine={false} label={{ value: '公路里程 (km)', angle: -90, position: 'insideLeft', style: { fill: CHART_COLORS.blue, fontSize: 10 } }} />
        <YAxis yAxisId="right" orientation="right" tick={{ fill: CHART_COLORS.purple, fontSize: 10 }} axisLine={false} tickLine={false} label={{ value: '覆盖率/通关量', angle: 90, position: 'insideRight', style: { fill: CHART_COLORS.purple, fontSize: 10 } }} />
        <Tooltip contentStyle={{ backgroundColor: 'rgba(255, 255, 255, 0.9)', borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
        <Legend verticalAlign="top" height={36}/>
        <Bar yAxisId="left" dataKey="borderRoadMileage" name="边境公路里程" fill={CHART_COLORS.blue} fillOpacity={0.6} radius={[4, 4, 0, 0]} barSize={20} />
        <Line yAxisId="right" type="monotone" dataKey="portTraffic" name="口岸通关人次(万)" stroke={CHART_COLORS.purple} strokeWidth={3} />
        <Line yAxisId="right" type="monotone" dataKey="coverage5G" name="5G覆盖率(%)" stroke={CHART_COLORS.tertiary} strokeWidth={3} strokeDasharray="3 3" />
      </ComposedChart>
    </ResponsiveContainer>
  );
};
export default BaiseInfraChart;