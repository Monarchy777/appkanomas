import React from 'react';
import { Home, Compass, BookOpen, Clock, Grid, Briefcase, Award } from 'lucide-react';

export default function BottomNav({ activeTab, onSelectTab, role }) {
  const tabs = [
    { id: 'home', label: 'Beranda', icon: Home },
    { id: 'packages', label: 'Paket', icon: Compass },
    { id: 'prayer', label: 'Kiblat', icon: Clock },
    { id: 'worship', label: 'Doa', icon: BookOpen },
    { id: 'services', label: 'Bantuan', icon: Grid },
  ];

  if (role === 'mitra') {
    tabs[4] = { id: 'mitra_hub', label: 'Mitra Hub', icon: Award, highlight: true };
  } else if (role === 'admin') {
    tabs[4] = { id: 'admin_panel', label: 'Admin Hub', icon: Briefcase, highlight: true };
  }

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-[#091118]/95 backdrop-blur-md border-t border-amber-900/30 shadow-[0_-4px_20px_rgba(0,0,0,0.5)] safe-bottom no-print">
      <div className="max-w-md mx-auto grid grid-cols-5 px-2 py-1.5">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;

          return (
            <button
              key={tab.id}
              onClick={() => onSelectTab(tab.id)}
              className={`flex flex-col items-center justify-center py-1 transition-all duration-150 relative ${
                isActive
                  ? tab.highlight
                    ? 'text-amber-300 font-bold'
                    : 'text-amber-400 font-bold'
                  : 'text-slate-400 hover:text-slate-200 font-medium'
              }`}
            >
              {/* Subtle Syar'i Gold Active Indicator Dot */}
              {isActive && (
                <span className="absolute -top-1 w-2 h-0.5 rounded-full bg-amber-400" />
              )}

              <div className={`p-1 rounded-lg ${isActive ? 'text-amber-400' : 'text-slate-400'}`}>
                <Icon className="w-5 h-5" />
              </div>

              <span className="text-[10px] leading-tight tracking-tight mt-0.5 truncate max-w-full">
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
