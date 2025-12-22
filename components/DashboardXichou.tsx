import React from 'react';
import { Mountain, TreePine, Droplets, TrendingUp } from 'lucide-react';
import { xichouData } from '../dataXichou';
import XichouEcoChart from './charts/XichouEcoChart';
import XichouIncomeChart from './charts/XichouIncomeChart';
import XichouIndustryChart from './charts/XichouIndustryChart';
import XichouEmploymentChart from './charts/XichouEmploymentChart';

const DashboardXichou: React.FC = () => {

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header Section */}
      <header className="text-center mb-12">
        <div className="flex justify-center items-center gap-3 mb-2">
            <Mountain className="w-8 h-8 text-green-700/80 transform" />
            <h1 className="text-3xl md:text-4xl font-serif-sc font-bold text-green-900 tracking-wider drop-shadow-sm">
            第二节 产业带动型：云南西畴县
            </h1>
            <Mountain className="w-8 h-8 text-green-700/80 transform" />
        </div>
        <p className="text-green-800/60 font-serif-sc italic text-lg">
          “石漠化”变“绿水青山”的产业奇迹 (2015 - 2024)
        </p>
      </header>

      {/* KPI Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        <KpiCard 
          title="2024年森林覆盖率" 
          value="53" 
          unit="%" 
          trend="较2015翻倍"
          icon={<TreePine className="w-5 h-5 text-white" />}
          color="bg-emerald-600"
        />
        <KpiCard 
          title="中药材年产值" 
          value="20" 
          unit="亿元" 
          trend="爆发式增长"
          icon={<TrendingUp className="w-5 h-5 text-white" />}
          color="bg-purple-600"
        />
        <KpiCard 
          title="村集体收入" 
          value="5000" 
          unit="万元" 
          trend="+525% (近10年)"
          icon={<TrendingUp className="w-5 h-5 text-white" />}
          color="bg-orange-600"
        />
        <KpiCard 
          title="石漠化治理" 
          value="22" 
          unit="% (占比)" 
          trend="大幅下降"
          icon={<Mountain className="w-5 h-5 text-white" />}
          color="bg-gray-500"
        />
      </div>

      {/* Main Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
        {/* Top Left: Ecology Miracle */}
        <ChartCard title="生态奇迹：石漠化治理与绿化" subtitle="森林覆盖率稳步上升 vs 石漠化土地占比断崖式下降">
           <XichouEcoChart data={xichouData} />
        </ChartCard>

        {/* Top Right: Industry Value */}
        <ChartCard title="核心产业爆发：中药材与旅游" subtitle="2023-2024年中药材产值因产业链延伸呈指数级增长">
            <XichouIndustryChart data={xichouData} />
        </ChartCard>

        {/* Bottom Left: Income Structure */}
        <ChartCard title="收入结构优化与城乡差距" subtitle="农村居民收入持续增长，城乡收入比从 3.8:1 降至 2.7:1">
            <XichouIncomeChart data={xichouData} />
        </ChartCard>

        {/* Bottom Right: Employment */}
        <ChartCard title="产业带动就业与集体增收" subtitle="生态产业直接带动就业人数与村集体收入同步攀升">
            <XichouEmploymentChart data={xichouData} />
        </ChartCard>
      </div>

      {/* Footer */}
      <footer className="text-center text-green-900/30 text-sm font-serif-sc pb-8">
        数据来源：云南西畴县统计数据 (注：2023-2024年中药材数据包含更广泛产业链统计口径)
      </footer>
    </div>
  );
};

// --- Sub Components (Consistent with Dashboard.tsx) ---

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
    <div className="text-xs font-medium text-emerald-700 bg-emerald-50 inline-block px-2.5 py-1 rounded-full border border-emerald-100">
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
        <div className="w-1.5 h-5 bg-green-600 rounded-full"></div>
        <h3 className="text-lg font-bold text-gray-800">{title}</h3>
      </div>
      <p className="text-sm text-gray-500 pl-4.5">{subtitle}</p>
    </div>
    <div className="flex-grow w-full h-full min-h-0">
      {children}
    </div>
  </div>
);

export default DashboardXichou;