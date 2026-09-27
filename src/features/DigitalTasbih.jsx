import React, { useState } from 'react';
import { RotateCcw, Volume2, VolumeX, Smartphone, X, Sparkles } from 'lucide-react';
import { sounds } from '../services/soundEffects';

const ZIKIR_PRESETS = [
  { name: 'Subhanallah', arabic: 'سُبْحَانَ اللَّهِ', target: 33 },
  { name: 'Alhamdulillah', arabic: 'الْحَمْدُ لِلَّهِ', target: 33 },
  { name: 'Allahu Akbar', arabic: 'اللَّهُ أَكْبَرُ', target: 33 },
  { name: 'Laa Ilaaha Illallah', arabic: 'لَا إِلَهَ إِلَّا اللَّهُ', target: 100 },
  { name: 'Astaghfirullah', arabic: 'أَسْتَغْفِرُ اللَّهَ', target: 100 },
  { name: 'Shalawat Nabi', arabic: 'اللَّهُمَّ صَلِّ عَلَى سَيِّدِنَا مُحَمَّدٍ', target: 100 }
];

export default function DigitalTasbih({ onClose }) {
  const [selectedZikir, setSelectedZikir] = useState(ZIKIR_PRESETS[0]);
  const [count, setCount] = useState(0);
  const [target, setTarget] = useState(33);
  const [soundEnabled, setSoundEnabled] = useState(true);

  const handleTap = () => {
    if (soundEnabled) {
      sounds.playClick();
    }
    const nextCount = count + 1;
    setCount(nextCount);

    if (target > 0 && nextCount % target === 0) {
      sounds.playRoundComplete();
    }
  };

  const handleReset = () => {
    if (soundEnabled) sounds.playClick();
    setCount(0);
  };

  const handleSelectZikir = (z) => {
    setSelectedZikir(z);
    setTarget(z.target);
    setCount(0);
  };

  const progress = target > 0 ? Math.min(100, Math.round((count / target) * 100)) : 0;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-md bg-[#14222e] text-white rounded-3xl border border-white/15 shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="px-5 py-4 bg-[#0d1720] border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <span className="p-2 rounded-xl bg-emerald-600/30 text-emerald-400 border border-emerald-500/40">
              <Sparkles className="w-5 h-5" />
            </span>
            <div>
              <h3 className="font-extrabold text-base text-white">Tasbih Digital Kanomas</h3>
              <p className="text-[11px] text-slate-400">Dzikir harian dengan getaran & audio lembut</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-slate-300 hover:text-white transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Zikir Selection Carousel */}
        <div className="p-3 bg-[#101b25] border-b border-white/5 overflow-x-auto flex gap-2 no-scrollbar">
          {ZIKIR_PRESETS.map((z, idx) => (
            <button
              key={idx}
              onClick={() => handleSelectZikir(z)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition flex items-center gap-1.5 ${
                selectedZikir.name === z.name
                  ? 'bg-emerald-600 text-white shadow-md'
                  : 'bg-white/5 text-slate-400 hover:text-slate-200'
              }`}
            >
              <span>{z.name}</span>
              <span className="text-[10px] opacity-75 font-mono">({z.target})</span>
            </button>
          ))}
        </div>

        {/* Main Counter Area */}
        <div className="p-6 flex-1 flex flex-col items-center justify-center space-y-5">
          {/* Current Zikir Arabic */}
          <div className="text-center space-y-1">
            <p className="text-2xl font-arabic text-amber-300">{selectedZikir.arabic}</p>
            <p className="text-xs text-slate-300 font-semibold">{selectedZikir.name}</p>
          </div>

          {/* Big Tap Button */}
          <button
            onClick={handleTap}
            className="w-56 h-56 rounded-full bg-gradient-to-b from-[#1c3245] to-[#0f1b25] border-4 border-emerald-500/40 hover:border-emerald-400 flex flex-col items-center justify-center shadow-[0_0_35px_rgba(16,185,129,0.25)] active:scale-95 transition-all group"
          >
            <span className="text-6xl font-black font-mono text-white tracking-wider group-hover:scale-105 transition-transform">
              {count}
            </span>
            <span className="text-xs text-emerald-400 font-bold mt-1">
              Target: {target > 0 ? target : 'Bebas'}
            </span>
            <span className="text-[10px] text-slate-400 mt-2 bg-black/40 px-3 py-0.5 rounded-full border border-white/5">
              Ketuk Layar
            </span>
          </button>

          {/* Progress bar */}
          <div className="w-full max-w-xs space-y-1">
            <div className="flex justify-between text-[11px] text-slate-400 font-mono">
              <span>Progres</span>
              <span>{progress}%</span>
            </div>
            <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 transition-all duration-150"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        </div>

        {/* Footer controls */}
        <div className="p-4 bg-[#0d1720] border-t border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setSoundEnabled(!soundEnabled)}
              className={`p-2 rounded-xl border text-xs font-semibold flex items-center gap-1.5 transition ${
                soundEnabled
                  ? 'bg-emerald-950/70 border-emerald-600 text-emerald-300'
                  : 'bg-white/5 border-white/10 text-slate-400'
              }`}
            >
              {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
              <span>{soundEnabled ? 'Suara ON' : 'Bisu'}</span>
            </button>
          </div>

          <button
            onClick={handleReset}
            className="flex items-center gap-1.5 text-xs font-bold text-slate-300 hover:text-white px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 transition border border-slate-700"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Hitungan</span>
          </button>
        </div>
      </div>
    </div>
  );
}
