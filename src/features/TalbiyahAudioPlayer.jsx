import React, { useState, useEffect } from 'react';
import { Volume2, Play, Square, Sparkles, BookOpen, X, Check, Heart } from 'lucide-react';
import { sounds } from '../services/soundEffects';
import { INITIAL_DOA_MANASIK } from '../services/initialSeed';

export default function TalbiyahAudioPlayer({ onClose }) {
  const [isPlayingTalbiyah, setIsPlayingTalbiyah] = useState(false);
  const [activeWord, setActiveWord] = useState('');
  const [selectedDoa, setSelectedDoa] = useState(INITIAL_DOA_MANASIK[0]);
  const [favoriteIds, setFavoriteIds] = useState(['DOA-01', 'DOA-05']);
  const [playingDoaId, setPlayingDoaId] = useState(null);

  useEffect(() => {
    return () => {
      sounds.stopAll();
    };
  }, []);

  const handlePlayTalbiyah = () => {
    if (isPlayingTalbiyah) {
      sounds.stopAll();
      setIsPlayingTalbiyah(false);
      setActiveWord('');
    } else {
      sounds.stopAll();
      setPlayingDoaId(null);
      setIsPlayingTalbiyah(true);
      sounds.playTalbiyahMelody(
        (word) => {
          setActiveWord(word);
        },
        () => {
          setIsPlayingTalbiyah(false);
          setActiveWord('');
        }
      );
    }
  };

  const handleTogglePrayerAudio = (doaId, arabicText) => {
    if (playingDoaId === doaId) {
      sounds.stopAll();
      setPlayingDoaId(null);
    } else {
      sounds.stopAll();
      setIsPlayingTalbiyah(false);
      setActiveWord('');
      setPlayingDoaId(doaId);
      sounds.recitePrayer(
        doaId,
        arabicText,
        () => setPlayingDoaId(doaId),
        () => setPlayingDoaId(null)
      );
    }
  };

  const toggleFavorite = (id) => {
    setFavoriteIds(prev => 
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  };

  const handleClose = () => {
    sounds.stopAll();
    setIsPlayingTalbiyah(false);
    setPlayingDoaId(null);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-xl bg-white text-slate-800 rounded-3xl border border-slate-200 shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="px-5 py-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <span className="p-2 rounded-xl bg-amber-50 text-amber-600 border border-amber-200">
              <Volume2 className="w-5 h-5" />
            </span>
            <div>
              <h3 className="font-bold text-base text-slate-900 font-sans">Audio Doa & Nada Talbiyah</h3>
              <p className="text-[11px] text-slate-500">Panduan lafaz doa manasik Umrah & Haji Kanomas</p>
            </div>
          </div>
          <button
            onClick={handleClose}
            className="w-8 h-8 rounded-full bg-slate-200/80 hover:bg-slate-300 flex items-center justify-center text-slate-600 hover:text-slate-900 transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Featured Talbiyah Interactive Card */}
        <div className="p-4 sm:p-5 bg-amber-50/50 border-b border-amber-200/70">
          <div className="flex items-center justify-between mb-3">
            <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-amber-100 text-amber-800 border border-amber-300">
              Lafaz Utama Haji & Umrah
            </span>
            <button
              onClick={handlePlayTalbiyah}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl font-bold text-xs shadow-md transition active:scale-95 ${
                isPlayingTalbiyah
                  ? 'bg-rose-600 hover:bg-rose-500 text-white animate-pulse'
                  : 'bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white'
              }`}
            >
              {isPlayingTalbiyah ? (
                <>
                  <Square className="w-3.5 h-3.5 fill-white" />
                  <span>Hentikan Nada</span>
                </>
              ) : (
                <>
                  <Play className="w-3.5 h-3.5 fill-white" />
                  <span>Dengarkan Nada Talbiyah</span>
                </>
              )}
            </button>
          </div>

          <div className="space-y-3">
            <p className="text-right text-xl sm:text-2xl font-arabic text-slate-900 leading-loose" dir="rtl">
              لَبَّيْكَ اللّٰهُمَّ لَبَّيْكَ، لَبَّيْكَ لَا شَرِيْكَ لَكَ لَبَّيْكَ، إِنَّ الْحَمْدَ وَالنِّعْمَةَ لَكَ وَالْمُلْكَ لَا شَرِيْكَ لَكَ
            </p>

            {/* Karaoke Highlight indicator when playing */}
            {isPlayingTalbiyah && activeWord && (
              <div className="bg-amber-100 border border-amber-300 rounded-xl p-2.5 text-center">
                <span className="text-[11px] text-amber-800 font-mono font-bold">
                  Sedang Mengalun: {activeWord}
                </span>
              </div>
            )}

            <div className="p-3 bg-white rounded-xl border border-amber-200 space-y-1 shadow-xs">
              <p className="text-xs text-amber-800 font-sans italic font-medium">
                "Labbaika Allahumma labbaik, labbaika laa syariika laka labbaik..."
              </p>
              <p className="text-[11px] text-slate-600 leading-relaxed">
                <strong>Artinya:</strong> Aku penuhi panggilan-Mu ya Allah, tiada sekutu bagi-Mu. Segala puji, nikmat, dan kekuasaan adalah milik-Mu semata.
              </p>
            </div>
          </div>
        </div>

        {/* List of Other Essential Duas */}
        <div className="p-4 flex-1 overflow-y-auto space-y-3">
          <div className="flex items-center justify-between pb-1">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Koleksi Doa Manasik & Putar Audio
            </span>
            <span className="text-[10px] text-amber-700 font-medium">{INITIAL_DOA_MANASIK.length} Doa Lengkap</span>
          </div>

          {INITIAL_DOA_MANASIK.map((doa) => {
            const isFav = favoriteIds.includes(doa.id);
            const isPlayingThis = playingDoaId === doa.id;

            return (
              <div
                key={doa.id}
                className="p-3.5 rounded-2xl bg-white border border-slate-200 hover:border-amber-400 transition space-y-2.5 shadow-xs"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-slate-900">{doa.title}</span>
                    <span className="text-[9px] uppercase px-2 py-0.5 rounded bg-slate-100 text-slate-600 font-medium">
                      {doa.category}
                    </span>
                  </div>

                  <button
                    onClick={() => toggleFavorite(doa.id)}
                    className="p-1 text-slate-400 hover:text-rose-500 transition"
                  >
                    <Heart className={`w-4 h-4 ${isFav ? 'fill-rose-500 text-rose-500' : ''}`} />
                  </button>
                </div>

                <p className="text-right text-base sm:text-lg font-arabic text-slate-900 leading-relaxed" dir="rtl">
                  {doa.arabic}
                </p>

                <p className="text-[11px] text-amber-800 italic">
                  "{doa.latin}"
                </p>

                <p className="text-[11px] text-slate-600 leading-relaxed">
                  <strong className="text-slate-800">Arti:</strong> {doa.meaning}
                </p>

                {/* Tombol Putar Audio Bacaan Doa */}
                <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-[10px] text-slate-500">Lafaz Bahasa Arab</span>
                  <button
                    onClick={() => handleTogglePrayerAudio(doa.id, doa.arabic)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 shadow-xs ${
                      isPlayingThis
                        ? 'bg-rose-600 hover:bg-rose-500 text-white animate-pulse'
                        : 'bg-amber-50 hover:bg-amber-100 text-amber-700 border border-amber-300'
                    }`}
                  >
                    {isPlayingThis ? (
                      <>
                        <Square className="w-3 h-3 fill-white" />
                        <span>Hentikan</span>
                      </>
                    ) : (
                      <>
                        <Volume2 className="w-3.5 h-3.5 text-amber-600" />
                        <span>Putar Bacaan</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500">
          <span>Bimbingan Asatidz PT Kanomas Tasikmalaya</span>
          <button
            onClick={handleClose}
            className="px-4 py-2 rounded-xl bg-slate-200 hover:bg-slate-300 text-slate-700 font-bold"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
}
