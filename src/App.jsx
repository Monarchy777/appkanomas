import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import BottomNav from './components/BottomNav';
import InstallAppBanner from './components/InstallAppBanner';

import HomeView from './views/HomeView';
import PackagesView from './views/PackagesView';
import WorshipEducationView from './views/WorshipEducationView';
import PrayerTimesView from './views/PrayerTimesView';
import AccountView from './views/AccountView';
import MitraDashboardView from './views/MitraDashboardView';
import AdminDashboardView from './views/AdminDashboardView';

import TawafSaiCounter from './features/TawafSaiCounter';
import DigitalTasbih from './features/DigitalTasbih';
import TalbiyahAudioPlayer from './features/TalbiyahAudioPlayer';
import KajianTasikmalayaModal from './features/KajianTasikmalayaModal';
import SavingsCalculatorModal from './features/SavingsCalculatorModal';
import PackageDetailModal from './features/PackageDetailModal';
import RegistrationModal from './features/RegistrationModal';
import NusukGuideModal from './features/NusukGuideModal';
import LuggageChecklistModal from './features/LuggageChecklistModal';
import InteractiveMapModal from './features/InteractiveMapModal';
import JamaahStatusLookupModal from './features/JamaahStatusLookupModal';
import WhatsAppCenterModal from './features/WhatsAppCenterModal';
import DocumentPrintModal from './features/DocumentPrintModal';
import AlQuranModal from './features/AlQuranModal';
import DailyPrayersModal from './features/DailyPrayersModal';
import JamaahServicesModal from './features/JamaahServicesModal';

import { db } from './services/db';
import { calculatePrayerTimes } from './services/prayerTimes';

export default function App() {
  const [role, setRole] = useState('jamaah'); // 'jamaah' | 'mitra' | 'admin'
  const [activeTab, setActiveTab] = useState('home');
  const [dbData, setDbData] = useState(() => db.getAll());
  const [prayerInfo, setPrayerInfo] = useState(() => calculatePrayerTimes('tasikmalaya'));

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
  const [showInstallBanner, setShowInstallBanner] = useState(false);

  // New Modals: Al-Qur'an, Doa Harian, Pelayanan Jamaah
  const [showQuran, setShowQuran] = useState(false);
  const [showDailyPrayers, setShowDailyPrayers] = useState(false);
  const [showJamaahServices, setShowJamaahServices] = useState(false);

  // Subscribe to database changes
  useEffect(() => {
    const unsubscribe = db.subscribe((newData) => {
      setDbData({ ...newData });
    });
    return () => unsubscribe();
  }, []);

  // Update prayer time ticker
  useEffect(() => {
    const timer = setInterval(() => {
      setPrayerInfo(calculatePrayerTimes('tasikmalaya'));
    }, 30000);
    return () => clearInterval(timer);
  }, []);

  const handleRoleChange = (newRole) => {
    setRole(newRole);
    if (newRole === 'mitra') {
      setActiveTab('mitra_hub');
    } else if (newRole === 'admin') {
      setActiveTab('admin_panel');
    } else {
      setActiveTab('home');
    }
  };

  const handleTabSelect = (tabId) => {
    setActiveTab(tabId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

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
        onRoleChange={handleRoleChange}
        nextPrayer={prayerInfo.nextPrayer}
        onOpenLookup={() => setShowLookup(true)}
        onOpenWhatsAppCenter={() => handleOpenWhatsAppCenter(null)}
        onOpenDocumentPrint={() => handleOpenDocumentPrint(null)}
      />

      {/* PWA Mobile Install Banner */}
      {showInstallBanner && (
        <div className="pt-2 no-print">
          <InstallAppBanner onClose={() => setShowInstallBanner(false)} />
        </div>
      )}

      {/* Main View Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto">
        {/* Route Render */}
        {activeTab === 'home' && (
          <HomeView
            packages={packages}
            mentors={mentors}
            nextPrayer={prayerInfo.nextPrayer}
            onSelectTab={handleTabSelect}
            onOpenQuran={() => setShowQuran(true)}
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
          />
        )}

        {activeTab === 'packages' && (
          <PackagesView
            packages={packages}
            onOpenPackageDetail={(pkg) => setDetailPackage(pkg)}
            onBookPackage={(pkg) => setBookingPackage(pkg)}
            onOpenSavings={() => setShowSavings(true)}
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
          />
        )}

        {activeTab === 'mitra_hub' && (
          <MitraDashboardView
            onOpenPackageDetail={(pkg) => setDetailPackage(pkg)}
          />
        )}

        {activeTab === 'admin_panel' && (
          <AdminDashboardView
            onOpenWhatsAppCenter={(recipient) => handleOpenWhatsAppCenter(recipient)}
            onOpenDocumentPrint={(doc) => handleOpenDocumentPrint(doc)}
          />
        )}
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

      {/* Modals & Overlays */}
      {showQuran && (
        <AlQuranModal onClose={() => setShowQuran(false)} />
      )}

      {showDailyPrayers && (
        <DailyPrayersModal onClose={() => setShowDailyPrayers(false)} />
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
          defaultMitraCode={role === 'mitra' ? (dbData.mitra?.[0]?.code || '') : ''}
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
    </div>
  );
}
