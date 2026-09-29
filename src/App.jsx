import React, { useState, useEffect, Suspense, lazy } from 'react';
import Header from './components/Header';
import BottomNav from './components/BottomNav';

import HomeView from './views/HomeView';
import { APP_BUILD_VERSION, isRemoteVersionNewer, fetchRemoteVersionInfo } from './config/version';

// Code-splitting via React.lazy for instant launch & ultra-lightweight bundle
const PackagesView = lazy(() => import('./views/PackagesView'));
const WorshipEducationView = lazy(() => import('./views/WorshipEducationView'));
const PrayerTimesView = lazy(() => import('./views/PrayerTimesView'));
const AccountView = lazy(() => import('./views/AccountView'));
const MitraDashboardView = lazy(() => import('./views/MitraDashboardView'));
const AdminDashboardView = lazy(() => import('./views/AdminDashboardView'));
const GoogleSignInModal = lazy(() => import('./components/GoogleSignInModal'));
const UpdateModal = lazy(() => import('./components/UpdateModal'));

// Code-splitting via React.lazy for instant launch & lightweight bundle
const TawafSaiCounter = lazy(() => import('./features/TawafSaiCounter'));
const DigitalTasbih = lazy(() => import('./features/DigitalTasbih'));
const TalbiyahAudioPlayer = lazy(() => import('./features/TalbiyahAudioPlayer'));
const KajianTasikmalayaModal = lazy(() => import('./features/KajianTasikmalayaModal'));
const SavingsCalculatorModal = lazy(() => import('./features/SavingsCalculatorModal'));
const PackageDetailModal = lazy(() => import('./features/PackageDetailModal'));
const RegistrationModal = lazy(() => import('./features/RegistrationModal'));
const NusukGuideModal = lazy(() => import('./features/NusukGuideModal'));
const LuggageChecklistModal = lazy(() => import('./features/LuggageChecklistModal'));
const InteractiveMapModal = lazy(() => import('./features/InteractiveMapModal'));
const JamaahStatusLookupModal = lazy(() => import('./features/JamaahStatusLookupModal'));
const WhatsAppCenterModal = lazy(() => import('./features/WhatsAppCenterModal'));
const DocumentPrintModal = lazy(() => import('./features/DocumentPrintModal'));
const AlQuranModal = lazy(() => import('./features/AlQuranModal'));
const DailyPrayersModal = lazy(() => import('./features/DailyPrayersModal'));
const JamaahServicesModal = lazy(() => import('./features/JamaahServicesModal'));
const DzikirPagiPetangModal = lazy(() => import('./features/DzikirPagiPetangModal'));
const DaftarMitraModal = lazy(() => import('./features/DaftarMitraModal'));

import { db } from './services/db';
import { calculatePrayerTimes } from './services/prayerTimes';
import { auth, ADMIN_EMAIL } from './services/auth';
import { backButtonManager } from './services/backButtonManager';
import { useBackButton } from './hooks/useBackButton';

export default function App() {
  const [currentUser, setCurrentUser] = useState(() => auth.getUser());
  const [role, setRole] = useState(() => (auth.getUser() ? auth.getUser().role : 'jamaah')); // 'jamaah' | 'mitra' | 'admin'
  const [activeTab, setActiveTab] = useState('home');
  const [tabHistory, setTabHistory] = useState(['home']);
  const [backToast, setBackToast] = useState('');
  const [dbData, setDbData] = useState(() => db.getAll());
  const [prayerInfo, setPrayerInfo] = useState(() => calculatePrayerTimes('tasikmalaya'));

  // Auto-Lock Referral Code: Parse from URL (?ref=... or ?mitra=... or hash) & persist in localStorage
  const [persistedReferralCode, setPersistedReferralCode] = useState(() => {
    try {
      const urlParams = new URLSearchParams(window.location.search);
      let queryRef = urlParams.get('ref') || urlParams.get('mitra');
      if (!queryRef && window.location.hash.includes('?')) {
        const hashQuery = window.location.hash.split('?')[1];
        const hashParams = new URLSearchParams(hashQuery);
        queryRef = hashParams.get('ref') || hashParams.get('mitra');
      }
      if (queryRef) {
        const cleanRef = queryRef.trim().toUpperCase();
        localStorage.setItem('kanomas_referral_code', cleanRef);
        return cleanRef;
      }
      return localStorage.getItem('kanomas_referral_code') || '';
    } catch (e) {
      return '';
    }
  });

  // Modals state
  const [detailPackage, setDetailPackage] = useState(null);
  const [bookingPackage, setBookingPackage] = useState(null);
  const [showCounter, setShowCounter] = useState(false);
  const [showTasbih, setShowTasbih] = useState(false);
  const [showTalbiyah, setShowTalbiyah] = useState(false);
  const [showKajian, setShowKajian] = useState(false);
  const [showSavings, setShowSavings] = useState(false);
  const [showNusuk, setShowNusuk] = useState(false);
  const [showChecklist, setShowChecklist] = useState(false);
  const [showMap, setShowMap] = useState(false);
  const [showLookup, setShowLookup] = useState(false);
  const [showWhatsAppCenter, setShowWhatsAppCenter] = useState(false);
  const [whatsAppRecipient, setWhatsAppRecipient] = useState(null);
  const [showDocumentPrint, setShowDocumentPrint] = useState(false);

  // New Modals: Al-Qur'an, Doa Harian, Pelayanan Jamaah, Dzikir Pagi Petang, Google Auth, Daftar Mitra
  const [showQuran, setShowQuran] = useState(false);
  const [showDailyPrayers, setShowDailyPrayers] = useState(false);
  const [showJamaahServices, setShowJamaahServices] = useState(false);
  const [showDzikir, setShowDzikir] = useState(false);
  const [showGoogleModal, setShowGoogleModal] = useState(false);
  const [showDaftarMitraModal, setShowDaftarMitraModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [updateModalProps, setUpdateModalProps] = useState({ isManualCheck: false, isMandatory: false });
  const [remoteUpdateInfo, setRemoteUpdateInfo] = useState(null);

  // Auto-check version from server on launch
  // KETENTUAN:
  // - Jika versi TIDAK SESUAI dengan versi terbaru: HARUS DIUPDATE TERLEBIH DULU (Mandatori).
  // - Jika versi SUDAH SESUAI: NOTIFIKASI JANGAN DITAMPILKAN SAMA SEKALI.
  useEffect(() => {
    const checkVersionOnLaunch = async () => {
      try {
        const data = await fetchRemoteVersionInfo();

        if (data && data.version) {
          setRemoteUpdateInfo(data);
          const needsUpdate = isRemoteVersionNewer(data.version, APP_BUILD_VERSION);
          if (needsUpdate) {
            // Versi tidak sesuai: HARUS DIUPDATE TERLEBIH DULU (MANDATORI)!
            setUpdateModalProps({ isManualCheck: false, isMandatory: true });
            setShowUpdateModal(true);
          } else {
            // Sudah sesuai: JANGAN TAMPILKAN NOTIFIKASI SAMA SEKALI!
            setShowUpdateModal(false);
          }
        }
      } catch (err) {
        console.warn('Check version on launch error:', err);
      }
    };

    checkVersionOnLaunch();
  }, []);

  // Subscribe to database changes
  useEffect(() => {
    const unsubscribe = db.subscribe((newData) => {
      setDbData({ ...newData });
    });
    return () => unsubscribe();
  }, []);

  // Subscribe to auth changes
  useEffect(() => {
    const unsubAuth = auth.subscribe((user) => {
      setCurrentUser(user);
      if (user) {
        if (user.role === 'admin') {
          setRole('admin');
        } else if (user.role === 'mitra') {
          setRole('mitra');
        } else {
          setRole('jamaah');
        }
      } else {
        setRole('jamaah');
      }
    });
    return () => unsubAuth();
  }, []);

  // Update prayer time ticker
  useEffect(() => {
    const timer = setInterval(() => {
      setPrayerInfo(calculatePrayerTimes('tasikmalaya'));
    }, 30000);
    return () => clearInterval(timer);
  }, []);

  // Inisialisasi Back Button Manager (Mobile Back Button & PWA Popstate)
  useEffect(() => {
    let timer = null;
    backButtonManager.init((msg) => {
      setBackToast(msg);
      if (timer) clearTimeout(timer);
      timer = setTimeout(() => setBackToast(''), 2500);
    });
  }, []);

  const handleRoleChange = (newRole) => {
    if (newRole === 'admin') {
      if (currentUser?.email?.toLowerCase() !== ADMIN_EMAIL.toLowerCase()) {
        setShowGoogleModal(true);
        return;
      }
    }
    setRole(newRole);
    if (newRole === 'mitra') {
      handleTabSelect('mitra_hub');
    } else if (newRole === 'admin') {
      handleTabSelect('admin_panel');
    } else {
      handleTabSelect('home');
    }
  };

  const handleTabSelect = (tabId) => {
    setActiveTab(tabId);
    if (tabId === 'home') {
      setTabHistory(['home']);
    } else {
      setTabHistory((prev) => {
        if (prev[prev.length - 1] === tabId) return prev;
        return [...prev, tabId];
      });
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // 1. Fallback handler darurat jika stack kosong tapi activeTab bukan home:
  // Tombol Back Android selalu kembali ke menu sebelumnya / home (tidak keluar/minimize aplikasi)
  useEffect(() => {
    backButtonManager.setFallbackHandler(() => {
      if (activeTab !== 'home') {
        setTabHistory((prev) => {
          if (prev.length <= 1) {
            setActiveTab('home');
            return ['home'];
          }
          const nextHistory = prev.slice(0, -1);
          const prevTab = nextHistory[nextHistory.length - 1] || 'home';
          setActiveTab(prevTab);
          return nextHistory;
        });
        return true; // Berhasil ditangani, cegah exit
      }
      return false; // Sudah di home, biarkan backButtonManager menangani double-tap exit
    });
  }, [activeTab]);

  // 1B. Back button aktif untuk navigasi Tab bertingkat (Menu sebelumnya -> Home)
  useBackButton(
    () => {
      setTabHistory((prev) => {
        if (prev.length <= 1) {
          setActiveTab('home');
          return ['home'];
        }
        const nextHistory = prev.slice(0, -1);
        const prevTab = nextHistory[nextHistory.length - 1] || 'home';
        setActiveTab(prevTab);
        return nextHistory;
      });
    },
    activeTab !== 'home',
    2,
    `nav_tab_${activeTab}_${tabHistory.length}`
  );

  // 2. Back button untuk seluruh Modal di App.jsx
  useBackButton(() => setShowUpdateModal(false), showUpdateModal && !updateModalProps.isMandatory, 10, 'modal_update');
  useBackButton(() => setShowGoogleModal(false), showGoogleModal, 10, 'modal_google');
  useBackButton(() => setShowDaftarMitraModal(false), showDaftarMitraModal, 10, 'modal_daftar_mitra');
  useBackButton(() => setShowDocumentPrint(false), showDocumentPrint, 10, 'modal_document_print');
  useBackButton(() => { setShowWhatsAppCenter(false); setWhatsAppRecipient(null); }, showWhatsAppCenter, 10, 'modal_whatsapp_center');
  useBackButton(() => setShowLookup(false), showLookup, 12, 'modal_lookup');
  useBackButton(() => setShowMap(false), showMap, 10, 'modal_map');
  useBackButton(() => setShowChecklist(false), showChecklist, 12, 'modal_checklist');
  useBackButton(() => setShowNusuk(false), showNusuk, 10, 'modal_nusuk');
  useBackButton(() => setShowSavings(false), showSavings, 10, 'modal_savings');
  useBackButton(() => setShowKajian(false), showKajian, 10, 'modal_kajian');
  useBackButton(() => setShowTalbiyah(false), showTalbiyah, 10, 'modal_talbiyah');
  useBackButton(() => setShowTasbih(false), showTasbih, 10, 'modal_tasbih');
  useBackButton(() => setShowCounter(false), showCounter, 10, 'modal_counter');
  useBackButton(() => setBookingPackage(null), !!bookingPackage, 15, 'modal_booking');
  useBackButton(() => setDetailPackage(null), !!detailPackage, 10, 'modal_detail_package');
  useBackButton(() => setShowJamaahServices(false), showJamaahServices, 10, 'modal_jamaah_services');
  useBackButton(() => setShowDzikir(false), showDzikir, 10, 'modal_dzikir');
  useBackButton(() => setShowDailyPrayers(false), showDailyPrayers, 10, 'modal_daily_prayers');
  useBackButton(() => setShowQuran(false), showQuran, 10, 'modal_quran');

  const handleOpenWhatsAppCenter = (recipient) => {
    if (recipient && recipient.phone) {
      setWhatsAppRecipient(recipient);
    } else {
      setWhatsAppRecipient(null);
    }
    setShowWhatsAppCenter(true);
  };

  const handleOpenDocumentPrint = (data) => {
    setShowDocumentPrint(true);
  };

  const packages = dbData.packages || [];
  const mentors = dbData.mentors || [];

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-800 flex flex-col font-sans selection:bg-amber-500 selection:text-white pb-20">
      {/* Top Header */}
      <Header
        role={role}
        currentUser={currentUser}
        onRoleChange={handleRoleChange}
        onOpenGoogleSignIn={() => setShowGoogleModal(true)}
        onOpenDaftarMitra={() => setShowDaftarMitraModal(true)}
        onLogout={() => {
          auth.logout();
          setRole('jamaah');
          setActiveTab('home');
        }}
        nextPrayer={prayerInfo.nextPrayer}
        onOpenLookup={() => setShowLookup(true)}
        onOpenWhatsAppCenter={() => handleOpenWhatsAppCenter(null)}
        onOpenDocumentPrint={() => handleOpenDocumentPrint(null)}
        onOpenUpdateModal={() => {
          setUpdateModalProps({ isManualCheck: true, isMandatory: false });
          setShowUpdateModal(true);
        }}
      />

      {/* Main View Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto">
        <Suspense fallback={
          <div className="min-h-[50vh] flex flex-col items-center justify-center gap-2.5 py-12">
            <div className="w-8 h-8 border-3 border-emerald-500 border-t-transparent rounded-full animate-spin" />
            <span className="text-xs font-bold text-slate-400">Memuat...</span>
          </div>
        }>
          {/* Route Render */}
          {activeTab === 'home' && (
            <HomeView
              packages={packages}
              mentors={mentors}
              nextPrayer={prayerInfo.nextPrayer}
              onSelectTab={handleTabSelect}
              onOpenQuran={() => setShowQuran(true)}
              onOpenDzikir={() => setShowDzikir(true)}
              onOpenDailyPrayers={() => setShowDailyPrayers(true)}
              onOpenJamaahServices={() => setShowJamaahServices(true)}
              onOpenPackageDetail={(pkg) => setDetailPackage(pkg)}
              onOpenCounter={() => setShowCounter(true)}
              onOpenTasbih={() => setShowTasbih(true)}
              onOpenTalbiyah={() => setShowTalbiyah(true)}
              onOpenKajian={() => setShowKajian(true)}
              onOpenSavings={() => setShowSavings(true)}
              onOpenNusuk={() => setShowNusuk(true)}
              onOpenChecklist={() => setShowChecklist(true)}
              onOpenMap={() => setShowMap(true)}
              onOpenLookup={() => setShowLookup(true)}
              onBookPackage={(pkg) => setBookingPackage(pkg)}
              onOpenDaftarMitra={() => setShowDaftarMitraModal(true)}
            />
          )}

          {activeTab === 'packages' && (
            <PackagesView
              packages={packages}
              onOpenPackageDetail={(pkg) => setDetailPackage(pkg)}
              onBookPackage={(pkg) => setBookingPackage(pkg)}
              onOpenSavings={() => setShowSavings(true)}
              referralCode={persistedReferralCode}
            />
          )}

          {activeTab === 'worship' && (
            <WorshipEducationView
              onSelectTab={handleTabSelect}
              onBack={() => handleTabSelect('home')}
              onOpenCounter={() => setShowCounter(true)}
              onOpenTasbih={() => setShowTasbih(true)}
              onOpenTalbiyah={() => setShowTalbiyah(true)}
              onOpenKajian={() => setShowKajian(true)}
              onOpenChecklist={() => setShowChecklist(true)}
              onOpenMap={() => setShowMap(true)}
              onOpenNusuk={() => setShowNusuk(true)}
            />
          )}

          {activeTab === 'prayer' && (
            <PrayerTimesView />
          )}

          {activeTab === 'services' && (
            <AccountView
              onOpenLookup={() => setShowLookup(true)}
              onOpenNusuk={() => setShowNusuk(true)}
              onOpenChecklist={() => setShowChecklist(true)}
              onOpenDocumentPrint={() => handleOpenDocumentPrint(null)}
              onOpenWhatsAppCenter={() => handleOpenWhatsAppCenter(null)}
              onRoleChange={handleRoleChange}
              role={role}
              currentUser={currentUser}
              onOpenGoogleSignIn={() => setShowGoogleModal(true)}
              onOpenDaftarMitra={() => setShowDaftarMitraModal(true)}
            />
          )}

          {activeTab === 'mitra_hub' && (
            <MitraDashboardView
              onOpenPackageDetail={(pkg) => setDetailPackage(pkg)}
              onOpenDaftarMitra={() => setShowDaftarMitraModal(true)}
              currentUser={currentUser}
            />
          )}

          {activeTab === 'admin_panel' && (
            <AdminDashboardView
              onOpenWhatsAppCenter={(recipient) => handleOpenWhatsAppCenter(recipient)}
              onOpenDocumentPrint={(doc) => handleOpenDocumentPrint(doc)}
            />
          )}
        </Suspense>
      </main>

      {/* Floating Bottom Navigation (4 Tabs: Beranda, WA Admin, Paket, Bantuan) */}
      <BottomNav
        activeTab={activeTab}
        onSelectTab={handleTabSelect}
        onOpenWhatsApp={() =>
          window.open(
            "https://wa.me/628112113363?text=Assalamu%27alaikum%20Admin%20Kanomas%2C%20saya%20ingin%20konsultasi%20mengenai%20layanan%20Umrah%20dan%20Haji.",
            '_blank'
          )
        }
        role={role}
      />

      {/* Modals & Overlays (Lazy Loaded with Suspense for Instant Performance) */}
      <Suspense fallback={null}>
        {showQuran && (
          <AlQuranModal onClose={() => setShowQuran(false)} />
        )}

        {showDailyPrayers && (
          <DailyPrayersModal onClose={() => setShowDailyPrayers(false)} />
        )}

        {showDzikir && (
          <DzikirPagiPetangModal onClose={() => setShowDzikir(false)} />
        )}

        {showJamaahServices && (
          <JamaahServicesModal
            onClose={() => setShowJamaahServices(false)}
            onOpenLookup={() => setShowLookup(true)}
            onOpenChecklist={() => setShowChecklist(true)}
            onOpenWhatsApp={() =>
              window.open(
                "https://wa.me/628112113363?text=Assalamu%27alaikum%20Admin%20Kanomas%2C%20saya%20ingin%20tanya%20fasilitas%20jamaah.",
                '_blank'
              )
            }
          />
        )}

        {detailPackage && (
          <PackageDetailModal
            pkg={detailPackage}
            onClose={() => setDetailPackage(null)}
            onBookNow={(pkg) => setBookingPackage(pkg)}
          />
        )}

        {bookingPackage && (
          <RegistrationModal
            pkg={bookingPackage}
            onClose={() => setBookingPackage(null)}
            defaultMitraCode={persistedReferralCode || (role === 'mitra' ? (dbData.mitra?.[0]?.code || '') : '')}
          />
        )}

        {showCounter && (
          <TawafSaiCounter onClose={() => setShowCounter(false)} />
        )}

        {showTasbih && (
          <DigitalTasbih onClose={() => setShowTasbih(false)} />
        )}

        {showTalbiyah && (
          <TalbiyahAudioPlayer onClose={() => setShowTalbiyah(false)} />
        )}

        {showKajian && (
          <KajianTasikmalayaModal
            onClose={() => setShowKajian(false)}
            role={role}
          />
        )}

        {showSavings && (
          <SavingsCalculatorModal onClose={() => setShowSavings(false)} />
        )}

        {showNusuk && (
          <NusukGuideModal onClose={() => setShowNusuk(false)} />
        )}

        {showChecklist && (
          <LuggageChecklistModal onClose={() => setShowChecklist(false)} />
        )}

        {showMap && (
          <InteractiveMapModal onClose={() => setShowMap(false)} />
        )}

        {showLookup && (
          <JamaahStatusLookupModal onClose={() => setShowLookup(false)} />
        )}

        {showWhatsAppCenter && (
          <WhatsAppCenterModal
            onClose={() => {
              setShowWhatsAppCenter(false);
              setWhatsAppRecipient(null);
            }}
            defaultRecipientPhone={whatsAppRecipient?.phone}
            defaultRecipientName={whatsAppRecipient?.name}
          />
        )}

        {showDocumentPrint && (
          <DocumentPrintModal
            onClose={() => setShowDocumentPrint(false)}
          />
        )}

        {showDaftarMitraModal && (
          <DaftarMitraModal
            onClose={() => setShowDaftarMitraModal(false)}
            onSuccess={(newMitra) => {
              setRole('mitra');
              setActiveTab('mitra_hub');
            }}
          />
        )}

        {showGoogleModal && (
          <GoogleSignInModal
            onClose={() => setShowGoogleModal(false)}
            onSuccess={(user) => {
              if (user.role === 'admin') {
                setRole('admin');
                setActiveTab('admin_panel');
              } else if (user.role === 'mitra') {
                setRole('mitra');
                setActiveTab('mitra_hub');
              } else {
                setRole('jamaah');
              }
            }}
          />
        )}

        <UpdateModal
          isOpen={showUpdateModal}
          onClose={() => {
            if (!updateModalProps.isMandatory) {
              setShowUpdateModal(false);
            }
          }}
          isManualCheck={updateModalProps.isManualCheck}
          isMandatory={updateModalProps.isMandatory}
          initialRemoteInfo={remoteUpdateInfo}
        />
      </Suspense>

      {/* Floating Toast Penanda Back Exit */}
      {backToast && (
        <div className="fixed bottom-24 left-1/2 -translate-x-1/2 z-[200] px-4 py-2 rounded-full bg-slate-900/95 text-white border border-slate-700 shadow-2xl text-xs font-bold animate-in fade-in duration-200 pointer-events-none text-center whitespace-nowrap">
          {backToast}
        </div>
      )}
    </div>
  );
}
