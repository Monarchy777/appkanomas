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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-xl bg-[#14222e] text-white rounded-3xl border border-white/15 shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="px-5 py-4 bg-[#0d1720] border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <span className="p-2 rounded-xl bg-orange-600/30 text-orange-400 border border-orange-500/30">
              <CheckSquare className="w-5 h-5" />
            </span>
            <div>
              <h3 className="font-extrabold text-base text-white">Checklist Perlengkapan Jamaah</h3>
              <p className="text-[11px] text-slate-400">Persiapan dokumen, pakaian ihram, dan koper</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-slate-300 hover:text-white transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Progress Bar Header */}
        <div className="p-4 bg-[#111c26] border-b border-white/5 space-y-2">
          <div className="flex justify-between items-center text-xs">
            <span className="font-bold text-slate-300">
              Kesiapan Berangkat: <strong className="text-emerald-400">{completedCount}</strong> dari {checklist.length} Item
            </span>
            <span className="font-mono font-black text-amber-300">{progress}% Siap</span>
          </div>
          <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-orange-500 to-emerald-400 transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Category Filter */}
        <div className="p-3 bg-[#0d1720] border-b border-white/5 overflow-x-auto flex gap-1.5 no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-3 py-1 rounded-xl text-xs font-bold whitespace-nowrap transition ${
                activeCategory === cat
                  ? 'bg-orange-600 text-white shadow'
                  : 'bg-white/5 text-slate-400 hover:text-slate-200'
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
                  ? 'bg-emerald-950/40 border-emerald-500/40 text-slate-300'
                  : 'bg-[#101b25] border-white/5 hover:border-white/20 text-white'
              }`}
            >
              <div className="flex items-center gap-3">
                <span className="text-emerald-400">
                  {item.done ? (
                    <CheckSquare className="w-5 h-5 fill-emerald-500/30 text-emerald-400" />
                  ) : (
                    <Square className="w-5 h-5 text-slate-500" />
                  )}
                </span>
                <span className={`text-xs ${item.done ? 'line-through text-slate-400' : 'font-medium'}`}>
                  {item.task}
                </span>
              </div>

              <div className="flex items-center gap-1.5 flex-shrink-0">
                {item.required && (
                  <span className="text-[9px] font-black uppercase px-2 py-0.5 rounded bg-rose-950/60 text-rose-300 border border-rose-500/30">
                    Wajib
                  </span>
                )}
                <span className="text-[10px] text-slate-400 bg-white/5 px-2 py-0.5 rounded">
                  {item.category}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="p-4 bg-[#0d1720] border-t border-white/10 flex items-center justify-between">
          <button
            onClick={handleReset}
            className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-white px-3 py-1.5 rounded-xl hover:bg-white/5 transition"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Centang</span>
          </button>

          <button
            onClick={onClose}
            className="px-5 py-2 bg-orange-600 hover:bg-orange-500 text-white font-bold text-xs rounded-xl shadow transition"
          >
            Selesai
          </button>
        </div>
      </div>
    </div>
  );
}
