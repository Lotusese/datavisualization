import React, { useState } from 'react';
import Dashboard from './components/Dashboard';
import DashboardXichou from './components/DashboardXichou';
import DashboardBaise from './components/DashboardBaise';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'nayong' | 'xichou' | 'baise'>('nayong');

  return (
    <div className="min-h-screen w-full relative bg-[#f2f7f4] font-sans overflow-x-hidden">
      {/* Background visual elements */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-[#eef7e9] via-[#f5fbf0] to-[#e6f0e0]"></div>
        <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-[#dcfce7]/40 to-transparent blur-3xl transform translate-y-20"></div>
        <div className="absolute top-0 right-0 w-2/3 h-2/3 bg-gradient-to-b from-[#f0fdf4]/50 to-transparent blur-3xl"></div>
        <div className="absolute inset-0 opacity-[0.3]" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.08'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")` }}></div>
      </div>

      <div className="relative z-10 py-8 md:py-12 flex flex-col items-center">
        {/* Page Selector Tabs */}
        <div className="mb-8 flex p-1 bg-white/60 backdrop-blur-md rounded-full border border-white/60 shadow-sm sticky top-4 z-50 overflow-x-auto max-w-full">
          <button
            onClick={() => setActiveTab('nayong')}
            className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 whitespace-nowrap ${
              activeTab === 'nayong'
                ? 'bg-green-600 text-white shadow-md'
                : 'text-gray-600 hover:bg-white/50 hover:text-green-700'
            }`}
          >
            综合发展：贵州纳雍
          </button>
          <button
            onClick={() => setActiveTab('xichou')}
            className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 whitespace-nowrap ${
              activeTab === 'xichou'
                ? 'bg-green-600 text-white shadow-md'
                : 'text-gray-600 hover:bg-white/50 hover:text-green-700'
            }`}
          >
            产业带动：云南西畴
          </button>
          <button
            onClick={() => setActiveTab('baise')}
            className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 whitespace-nowrap ${
              activeTab === 'baise'
                ? 'bg-green-600 text-white shadow-md'
                : 'text-gray-600 hover:bg-white/50 hover:text-green-700'
            }`}
          >
            边境安民：广西百色
          </button>
        </div>

        {/* Main Content Area */}
        <div className="w-full">
          {activeTab === 'nayong' && <Dashboard />}
          {activeTab === 'xichou' && <DashboardXichou />}
          {activeTab === 'baise' && <DashboardBaise />}
        </div>
      </div>
    </div>
  );
};

export default App;