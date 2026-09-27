import React from 'react';
import { Home, BookOpen, Compass, Grid, User, Briefcase, Award } from 'lucide-react';

export default function BottomNav({ activeTab, onSelectTab, role }) {
  const tabs = [
    { id: 'home', label: 'Beranda', icon: Home, color: 'text-amber-500', activeBg: 'bg-amber-50 text-amber-600' },
    { id: 'worship', label: 'Ibadah', icon: BookOpen, color: 'text-emerald-500', activeBg: 'bg-emerald-50 text-emerald-600' },
    { id: 'prayer', label: 'Kiblat', icon: Compass, color: 'text-sky-500', activeBg: 'bg-sky-50 text-sky-600' },
    { id: 'packages', label: 'Paket', icon: Grid, color: 'text-orange-500', activeBg: 'bg-orange-50 text-orange-600' },
    { id: 'services', label: 'Bantuan', icon: User, color: 'text-indigo-500', activeBg: 'bg-indigo-50 text-indigo-600' },
  ];

  if (role === 'mitra') {
    tabs[4] = { id: 'mitra_hub', label: 'Mitra', icon: Award, color: 'text-blue-500', activeBg: 'bg-blue-50 text-blue-600' };
  } else if (role === 'admin') {
    tabs[4] = { id: 'admin_panel', label: 'Admin', icon: Briefcase, color: 'text-purple-500', activeBg: 'bg-purple-50 text-purple-600' };
  }

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-lg border-t border-slate-200/90 shadow-[0_-4px_25px_rgba(0,0,0,0.06)] safe-bottom no-print">
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
                  ? 'text-amber-600 font-extrabold'
                  : 'text-slate-400 hover:text-slate-600 font-medium'
              }`}
            >
              {/* Active Golden Accent Bar on top */}
              {isActive && (
                <span className="absolute -top-1 w-7 h-1 rounded-full bg-gradient-to-r from-amber-500 via-amber-600 to-orange-500 shadow-sm" />
              )}

              <div
                className={`p-1.5 rounded-xl transition-all duration-200 ${
                  isActive
                    ? `${tab.activeBg} shadow-sm scale-110`
                    : 'text-slate-400 hover:text-slate-600'
                }`}
              >
                <Icon className="w-5 h-5" />
              </div>

              <span className={`text-[10px] leading-tight tracking-tight mt-0.5 truncate max-w-full ${
                isActive ? 'font-bold text-slate-900' : 'text-slate-500'
              }`}>
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
