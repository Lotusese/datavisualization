import React from 'react';
import { Flag, Truck, Banknote, ShieldCheck } from 'lucide-react';
import { baiseData } from '../dataBaise';
import BaisePovertyChart from './charts/baise/BaisePovertyChart';
import BaiseIncomeChart from './charts/baise/BaiseIncomeChart';
import BaiseIndustryChart from './charts/baise/BaiseIndustryChart';
import BaiseInfraChart from './charts/baise/BaiseInfraChart';

const DashboardBaise: React.FC = () => {

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header Section */}
      <header className="text-center mb-12">
        <div className="flex justify-center items-center gap-3 mb-2">
            <Flag className="w-8 h-8 text-red-600/80 transform -rotate-12" />
            <h1 className="text-3xl md:text-4xl font-serif-sc font-bold text-red-900 tracking-wider drop-shadow-sm">
            第三节 边境安民型：广西百色市
            </h1>
            <Flag className="w-8 h-8 text-red-600/80 transform rotate-12" />
        </div>
        <p className="text-red-800/60 font-serif-sc italic text-lg">
          “脱贫攻坚”与“乡村振兴”的边境样本 (2015 - 2024)
        </p>
      </header>

      {/* KPI Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        <KpiCard 
          title="2024年边境贸易额" 
          value="152" 
          unit="亿元" 
          trend="同比猛增"
          icon={<Truck className="w-5 h-5 text-white" />}
          color="bg-blue-600"
        />
        <KpiCard 
          title="特色芒果产业产值" 
          value="155" 
          unit="亿元" 
          trend="全国知名"
          icon={<Banknote className="w-5 h-5 text-white" />}
          color="bg-amber-500"
        />
        <KpiCard 
          title="脱贫人口" 
          value="87.8" 
          unit="万人" 
          trend="全面动态清零"
          icon={<ShieldCheck className="w-5 h-5 text-white" />}
          color="bg-red-600"
        />
        <KpiCard 
          title="边境公路总里程" 
          value="12,800" 
          unit="公里" 
          trend="路网全覆盖"
          icon={<Truck className="w-5 h-5 text-white" />}
          color="bg-indigo-600"
        />
      </div>

      {/* Main Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
        {/* Top Left: Poverty Alleviation */}
        <ChartCard title="伟大胜利：脱贫攻坚成果" subtitle="87.8万贫困人口全部脱贫，监测对象持续动态清零">
           <BaisePovertyChart data={baiseData} />
        </ChartCard>

        {/* Top Right: Industry Engine */}
        <ChartCard title="富民引擎：特色农业与边贸" subtitle="芒果/茶叶产值稳步上升，边境贸易额呈爆发式增长">
            <BaiseIndustryChart data={baiseData} />
        </ChartCard>

        {/* Bottom Left: Income Growth */}
        <ChartCard title="共同富裕：城乡与边境收入" subtitle="边境县居民收入增速显著，与全市水平差距不断缩小">
            <BaiseIncomeChart data={baiseData} />
        </ChartCard>

        {/* Bottom Right: Infrastructure */}
        <ChartCard title="通达边疆：基础设施跃升" subtitle="边境公路里程翻倍，5G网络与口岸通关能力大幅提升">
            <BaiseInfraChart data={baiseData} />
        </ChartCard>
      </div>

      {/* Footer */}
      <footer className="text-center text-red-900/30 text-sm font-serif-sc pb-8">
        数据来源：广西百色市统计数据 | 脱贫攻坚与乡村振兴成果
      </footer>
    </div>
  );
};

// --- Sub Components (Consistent Style with specific Color tweaks) ---

const KpiCard: React.FC<{
  title: string;
  value: string;
  unit: string;
  trend: string;
  icon: React.ReactNode;
  color: string;
}> = ({ title, value, unit, trend, icon, color }) => (
  <div className="bg-white/70 backdrop-blur-md border border-white/60 rounded-xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
    <div className="flex justify-between items-start mb-4">
      <h3 className="text-gray-600 text-sm font-medium">{title}</h3>
      <div className={`p-2 rounded-lg ${color} shadow-sm`}>{icon}</div>
    </div>
    <div className="flex items-baseline gap-2 mb-2">
      <span className="text-3xl font-bold text-gray-800 tracking-tight">{value}</span>
      <span className="text-sm text-gray-500">{unit}</span>
    </div>
    <div className="text-xs font-medium text-red-700 bg-red-50 inline-block px-2.5 py-1 rounded-full border border-red-100">
      {trend}
    </div>
  </div>
);

const ChartCard: React.FC<{
  title: string;
  subtitle: string;
  children: React.ReactNode;
}> = ({ title, subtitle, children }) => (
  <div className="bg-white/60 backdrop-blur-lg border border-white/60 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col h-[420px]">
    <div className="mb-6">
      <div className="flex items-center gap-3 mb-1">
        <div className="w-1.5 h-5 bg-red-600 rounded-full"></div>
        <h3 className="text-lg font-bold text-gray-800">{title}</h3>
      </div>
      <p className="text-sm text-gray-500 pl-4.5">{subtitle}</p>
    </div>
    <div className="flex-grow w-full h-full min-h-0">
      {children}
    </div>
  </div>
);

export default DashboardBaise;