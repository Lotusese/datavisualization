
import React from 'react';
import { Sprout, TrendingUp, ShieldCheck, Signal, ArrowUpRight } from 'lucide-react';
import { nayongData } from '../data';
import IncomeChart from './charts/IncomeChart';
import RiskChart from './charts/RiskChart';
import InfrastructureChart from './charts/InfrastructureChart';
import IndustryChart from './charts/IndustryChart';

const Dashboard: React.FC = () => {

  return (
    <div className="max-w-7xl mx-auto">
      {/* 头部摘要 */}
      <header className="text-center mb-12">
        <div className="flex justify-center items-center gap-3 mb-2">
            <Sprout className="w-8 h-8 text-green-700/80 transform -rotate-12" />
            <h1 className="text-3xl md:text-4xl font-serif-sc font-bold text-green-900 tracking-wider drop-shadow-sm">
            第一节 综合发展型：贵州纳雍县
            </h1>
            <Sprout className="w-8 h-8 text-green-700/80 transform rotate-12" />
        </div>
        <p className="text-green-800/60 font-serif-sc italic text-lg">
          2020 - 2024：从巩固成果到乡村振兴的纳雍样本
        </p>
      </header>

      {/* KPI 卡片 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
        <KpiCard 
          title="人均可支配收入 (2024)" 
          value="13,568" 
          unit="元" 
          trend="+12.3%"
          icon={<TrendingUp className="w-6 h-6" />}
          color="emerald"
        />
        <KpiCard 
          title="返贫风险消除率" 
          value="100" 
          unit="%" 
          trend="全面覆盖"
          icon={<ShieldCheck className="w-6 h-6" />}
          color="blue"
        />
        <KpiCard 
          title="路网/4G 覆盖率" 
          value="100" 
          unit="%" 
          trend="城乡一体化"
          icon={<Signal className="w-6 h-6" />}
          color="indigo"
        />
        <KpiCard 
          title="六大产业总产值" 
          value="26" 
          unit="亿元" 
          trend="持续倍增"
          icon={<Sprout className="w-6 h-6" />}
          color="lime"
        />
      </div>



      {/* 图表矩阵 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-20">
        <ChartCard title="收入增长趋势" subtitle="人均可支配收入与同比增长率双轨分析">
           <IncomeChart data={nayongData} />
        </ChartCard>

        <ChartCard title="特色产业布局" subtitle="六大核心产业与重点（蔬菜、茶叶）产值贡献">
            <IndustryChart data={nayongData} />
        </ChartCard>

        <ChartCard title="动态监测成效" subtitle="未消除风险监测对象人数（万人）下降趋势">
            <RiskChart data={nayongData} />
        </ChartCard>

        <ChartCard title="基础设施通达" subtitle="硬化路通村率与 4G 网络覆盖率达标情况">
            <InfrastructureChart data={nayongData} />
        </ChartCard>
      </div>

      <footer className="text-center text-slate-300 text-sm py-10 border-t border-slate-100">
        © 2025 数据分析看板 · 数据源：纳雍县统计局
      </footer>
    </div>
  );
};

const KpiCard: React.FC<{
  title: string; value: string; unit: string; trend: string; icon: React.ReactNode; color: string;
}> = ({ title, value, unit, trend, icon, color }) => {
  const colors: Record<string, string> = {
    emerald: 'bg-emerald-600 text-emerald-600 shadow-emerald-100',
    blue: 'bg-blue-600 text-blue-600 shadow-blue-100',
    indigo: 'bg-indigo-600 text-indigo-600 shadow-indigo-100',
    lime: 'bg-lime-600 text-lime-600 shadow-lime-100',
  };

  return (
    <div className="group bg-white rounded-3xl p-8 shadow-[0_10px_40px_rgba(0,0,0,0.03)] border border-slate-50 hover:shadow-xl hover:translate-y-[-4px] transition-all duration-500">
      <div className="flex justify-between items-start mb-6">
        <div className={`p-3.5 rounded-2xl bg-opacity-10 ${colors[color].split(' ')[0]} ${colors[color].split(' ')[1]}`}>
          {icon}
        </div>
        <div className="px-3 py-1 bg-slate-50 rounded-full text-[10px] font-bold text-slate-400 uppercase tracking-wider">{trend}</div>
      </div>
      <h3 className="text-slate-500 text-sm font-semibold mb-1">{title}</h3>
      <div className="flex items-baseline gap-2">
        <span className="text-4xl font-black text-slate-800 tabular-nums">{value}</span>
        <span className="text-sm font-bold text-slate-400">{unit}</span>
      </div>
    </div>
  );
};

const ChartCard: React.FC<{
  title: string; subtitle: string; children: React.ReactNode;
}> = ({ title, subtitle, children }) => (
  <div className="bg-white rounded-[2.5rem] p-10 shadow-[0_15px_50px_rgba(0,0,0,0.04)] border border-slate-50 flex flex-col h-[480px] hover:shadow-2xl transition-all duration-500">
    <div className="mb-8">
      <h3 className="text-xl font-extrabold text-slate-800 mb-1">{title}</h3>
      <p className="text-sm text-slate-400 font-medium">{subtitle}</p>
    </div>
    <div className="flex-grow w-full h-full min-h-0">
      {children}
    </div>
  </div>
);

export default Dashboard;
