
import React, { useState } from 'react';
import Dashboard from './components/Dashboard';
import DashboardXichou from './components/DashboardXichou';
import DashboardBaise from './components/DashboardBaise';
import { LayoutGrid, Leaf, ShieldCheck } from 'lucide-react';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'nayong' | 'xichou' | 'baise'>('nayong');

  const tabs = [
    { id: 'nayong', label: '纳雍发展', icon: <LayoutGrid className="w-4 h-4" /> },
    { id: 'xichou', label: '西畴产业', icon: <Leaf className="w-4 h-4" /> },
    { id: 'baise', label: '百色边境', icon: <ShieldCheck className="w-4 h-4" /> },
  ] as const;

  return (
    <div className="min-h-screen w-full relative bg-[#F8FAFC] font-sans text-slate-900 overflow-x-hidden">
      {/* 顶部装饰性光晕 */}
      <div className="absolute top-0 left-0 w-full h-[600px] bg-gradient-to-b from-emerald-50/50 to-transparent pointer-events-none"></div>

      <div className="relative z-10 w-full">
        {/* 精美的悬浮导航条 */}
        <nav className="fixed bottom-10 left-1/2 -translate-x-1/2 z-[100] md:top-8 md:bottom-auto">
          <div className="flex p-2 bg-white/80 backdrop-blur-2xl rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.1)] border border-white/50 ring-1 ring-slate-200/50">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 px-6 py-3 rounded-2xl text-sm font-bold transition-all duration-500 whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-200 scale-105'
                    : 'text-slate-500 hover:text-emerald-700 hover:bg-emerald-50'
                }`}
              >
                {tab.icon}
                <span className="hidden sm:inline">{tab.label}</span>
              </button>
            ))}
          </div>
        </nav>

        {/* 内容区 */}
        <main className="w-full pt-10 pb-32 md:pt-28 md:pb-10">
          <div className="animate-in fade-in zoom-in-95 duration-1000">
            {activeTab === 'nayong' && <Dashboard />}
            {activeTab === 'xichou' && <DashboardXichou />}
            {activeTab === 'baise' && <DashboardBaise />}
          </div>
        </main>
      </div>
    </div>
  );
};

export default App;
