import React from 'react';
import { Sprout, TrendingUp, ShieldCheck, Signal } from 'lucide-react';
import { nayongData } from '../data';
import IncomeChart from './charts/IncomeChart';
import RiskChart from './charts/RiskChart';
import InfrastructureChart from './charts/InfrastructureChart';
import IndustryChart from './charts/IndustryChart';

const Dashboard: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <header className="text-center mb-12">
        <div className="flex justify-center items-center gap-3 mb-2">
            <Sprout className="w-8 h-8 text-green-600/60 transform -rotate-12" />
            <h1 className="text-3xl md:text-4xl font-serif-sc font-bold text-green-800 tracking-wider drop-shadow-sm">
            第一节 综合发展型：贵州纳雍县
            </h1>
            <Sprout className="w-8 h-8 text-green-600/60 transform rotate-12" />
        </div>
        <p className="text-green-700/70 font-serif-sc italic text-lg">
          近五年经济社会发展情况概览 (2020 - 2024)
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        <KpiCard title="2024年人均可支配收入" value="13,568" unit="元" trend="+12.30%" icon={<TrendingUp className="w-5 h-5 text-white" />} color="bg-emerald-600" />
        <KpiCard title="监测对象风险消除" value="100" unit="%" trend="已全面消除" icon={<ShieldCheck className="w-5 h-5 text-white" />} color="bg-blue-600" />
        <KpiCard title="基础设施覆盖率" value="100" unit="%" trend="路网/4G全覆盖" icon={<Signal className="w-5 h-5 text-white" />} color="bg-indigo-600" />
        <KpiCard title="2024年六大产业总产值" value="26" unit="亿元" trend="持续增长" icon={<Sprout className="w-5 h-5 text-white" />} color="bg-lime-600" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
        <ChartCard title="农村居民收入与增长趋势" subtitle="双轴分析：收入逐年攀升，增速保持高位"><IncomeChart data={nayongData} /></ChartCard>
        <ChartCard title="特色产业产值增长" subtitle="六大产业总值与重点产业（蔬菜/茶叶）贡献"><IndustryChart data={nayongData} /></ChartCard>
        <ChartCard title="防返贫监测成效" subtitle="未消除风险监测对象人数（万人）显著下降"><RiskChart data={nayongData} /></ChartCard>
        <ChartCard title="基础设施建设完善度" subtitle="硬化路通村率与4G网络覆盖率迈向100%"><InfrastructureChart data={nayongData} /></ChartCard>
      </div>

      <footer className="text-center text-green-800/40 text-sm font-serif-sc pb-8">数据来源：贵州纳雍县统计数据 | 可视化生成：Dashboard AI</footer>
    </div>
  );
};

const KpiCard: React.FC<{ title: string; value: string; unit: string; trend: string; icon: React.ReactNode; color: string; }> = ({ title, value, unit, trend, icon, color }) => (
  <div className="bg-white/70 backdrop-blur-md border border-white/60 rounded-xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
    <div className="flex justify-between items-start mb-4">
      <h3 className="text-gray-600 text-sm font-medium">{title}</h3>
      <div className={`p-2 rounded-lg ${color} shadow-sm`}>{icon}</div>
    </div>
    <div className="flex items-baseline gap-2 mb-2">
      <span className="text-3xl font-bold text-gray-800 tracking-tight">{value}</span>
      <span className="text-sm text-gray-500">{unit}</span>
    </div>
    <div className="text-xs font-medium text-emerald-700 bg-emerald-50 inline-block px-2.5 py-1 rounded-full border border-emerald-100">{trend}</div>
  </div>
);

const ChartCard: React.FC<{ title: string; subtitle: string; children: React.ReactNode; }> = ({ title, subtitle, children }) => (
  <div className="bg-white/60 backdrop-blur-lg border border-white/60 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col h-[420px]">
    <div className="mb-6">
      <div className="flex items-center gap-3 mb-1">
        <div className="w-1.5 h-5 bg-green-600 rounded-full"></div>
        <h3 className="text-lg font-bold text-gray-800">{title}</h3>
      </div>
      <p className="text-sm text-gray-500 pl-4.5">{subtitle}</p>
    </div>
    <div className="flex-grow w-full h-full min-h-0">{children}</div>
  </div>
);

export default Dashboard;