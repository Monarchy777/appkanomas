import React, { useState } from 'react';
import { CheckSquare, Square, X, RotateCcw, ShieldCheck, Sparkles, Filter } from 'lucide-react';
import { db } from '../services/db';
import { sounds } from '../services/soundEffects';

export default function LuggageChecklistModal({ onClose }) {
  const [checklist, setChecklist] = useState(db.getAll().checklist || []);
  const [activeCategory, setActiveCategory] = useState('Semua');

  const categories = ['Semua', 'Dokumen', 'Ibadah', 'Kesehatan', 'Koper', 'Digital'];

  const handleToggle = (id) => {
    sounds.playClick();
    db.toggleChecklist(id);
    setChecklist(db.getAll().checklist);
  };

  const handleReset = () => {
    sounds.playClick();
    const resetList = checklist.map(item => ({ ...item, done: false }));
    db.save({ ...db.getAll(), checklist: resetList });
    setChecklist(resetList);
  };

  const filtered = activeCategory === 'Semua'
    ? checklist
    : checklist.filter(item => item.category === activeCategory);

  const completedCount = checklist.filter(item => item.done).length;
  const progress = checklist.length > 0 ? Math.round((completedCount / checklist.length) * 100) : 0;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-xl bg-white text-slate-800 rounded-3xl border border-slate-200 shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="px-5 py-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <span className="p-2 rounded-xl bg-amber-50 text-amber-600 border border-amber-200">
              <CheckSquare className="w-5 h-5" />
            </span>
            <div>
              <h3 className="font-extrabold text-base text-slate-900">Checklist Perlengkapan Jamaah</h3>
              <p className="text-[11px] text-slate-500">Persiapan dokumen, pakaian ihram, dan koper</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-200/80 hover:bg-slate-300 flex items-center justify-center text-slate-600 hover:text-slate-900 transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Progress Bar Header */}
        <div className="p-4 bg-amber-50/50 border-b border-amber-200/60 space-y-2">
          <div className="flex justify-between items-center text-xs">
            <span className="font-bold text-slate-700">
              Kesiapan Berangkat: <strong className="text-emerald-700">{completedCount}</strong> dari {checklist.length} Item
            </span>
            <span className="font-mono font-black text-amber-700">{progress}% Siap</span>
          </div>
          <div className="h-2 w-full bg-slate-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-amber-500 to-emerald-500 transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Category Filter */}
        <div className="p-3 bg-slate-50 border-b border-slate-200 overflow-x-auto flex gap-1.5 no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-3 py-1 rounded-xl text-xs font-bold whitespace-nowrap transition ${
                activeCategory === cat
                  ? 'bg-amber-500 text-white shadow-xs'
                  : 'bg-white border border-slate-200 text-slate-600 hover:text-slate-900'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Items List */}
        <div className="p-4 overflow-y-auto space-y-2 flex-1">
          {filtered.map((item) => (
            <div
              key={item.id}
              onClick={() => handleToggle(item.id)}
              className={`p-3 rounded-2xl border transition-all duration-200 flex items-center justify-between gap-3 cursor-pointer select-none ${
                item.done
                  ? 'bg-emerald-50/60 border-emerald-300 text-slate-600'
                  : 'bg-white border-slate-200 hover:border-amber-400 text-slate-800 shadow-xs'
              }`}
            >
              <div className="flex items-center gap-3">
                <span className="text-emerald-600">
                  {item.done ? (
                    <CheckSquare className="w-5 h-5 fill-emerald-100 text-emerald-600" />
                  ) : (
                    <Square className="w-5 h-5 text-slate-400" />
                  )}
                </span>
                <span className={`text-xs ${item.done ? 'line-through text-slate-400' : 'font-medium'}`}>
                  {item.task}
                </span>
              </div>

              <div className="flex items-center gap-1.5 flex-shrink-0">
                {item.required && (
                  <span className="text-[9px] font-black uppercase px-2 py-0.5 rounded bg-rose-50 text-rose-700 border border-rose-200">
                    Wajib
                  </span>
                )}
                <span className="text-[10px] text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                  {item.category}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
          <button
            onClick={handleReset}
            className="flex items-center gap-1.5 text-xs text-slate-500 hover:text-slate-800 px-3 py-1.5 rounded-xl hover:bg-slate-200 transition"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Centang</span>
          </button>

          <button
            onClick={onClose}
            className="px-5 py-2 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-bold text-xs rounded-xl shadow-xs transition"
          >
            Selesai
          </button>
        </div>
      </div>
    </div>
  );
}
