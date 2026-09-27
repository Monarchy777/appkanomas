import React from 'react';
import { Home, BookOpen, Compass, Grid, User, Briefcase, Award } from 'lucide-react';

export default function BottomNav({ activeTab, onSelectTab, role }) {
  const tabs = [
    { id: 'home', label: 'Beranda', icon: Home },
    { id: 'worship', label: 'Ibadah', icon: BookOpen },
    { id: 'prayer', label: 'Kiblat', icon: Compass },
    { id: 'packages', label: 'Paket', icon: Grid },
    { id: 'services', label: 'Bantuan', icon: User },
  ];

  if (role === 'mitra') {
    tabs[4] = { id: 'mitra_hub', label: 'Mitra', icon: Award, highlight: true };
  } else if (role === 'admin') {
    tabs[4] = { id: 'admin_panel', label: 'Admin', icon: Briefcase, highlight: true };
  }

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-[#070e15]/95 backdrop-blur-lg border-t border-amber-900/30 shadow-[0_-4px_25px_rgba(0,0,0,0.6)] safe-bottom no-print">
      <div className="max-w-md mx-auto grid grid-cols-5 px-1 py-1">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;

          return (
            <button
              key={tab.id}
              onClick={() => onSelectTab(tab.id)}
              className={`flex flex-col items-center justify-center py-1.5 transition-all duration-150 relative rounded-xl ${
                isActive
                  ? 'text-amber-400 font-bold'
                  : 'text-slate-400 hover:text-slate-200 font-medium'
              }`}
            >
              {/* Active Golden Bar on top */}
              {isActive && (
                <span className="absolute -top-1 w-6 h-0.5 rounded-full bg-gradient-to-r from-amber-500 to-amber-300 shadow-[0_0_8px_#f59e0b]" />
              )}

              <div className={`p-1 rounded-xl transition-colors ${
                isActive ? 'bg-amber-500/15 text-amber-400' : 'text-slate-400'
              }`}>
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
