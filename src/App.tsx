import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { HeroLanding } from './components/HeroLanding';
import { CropChecker } from './components/CropChecker';
import { FarmingAssistant } from './components/FarmingAssistant';
import { SampleShowcase } from './components/SampleShowcase';
import { SindhExtensionDirectory } from './components/SindhExtensionDirectory';
import { SavedReportsView } from './components/SavedReportsView';
import { DirectoryModal } from './components/DirectoryModal';
import { Footer } from './components/Footer';
import { Language, SavedReport, DemoSample } from './types';

export default function App() {
  const [currentLang, setCurrentLang] = useState<Language>('en');
  const [activeTab, setActiveTab] = useState<string>('checker');
  const [reports, setReports] = useState<SavedReport[]>([]);
  const [preselectedSample, setPreselectedSample] = useState<DemoSample | null>(null);
  const [isDirectoryOpen, setIsDirectoryOpen] = useState<boolean>(false);

  // Sync HTML lang and dir for RTL languages (Urdu and Sindhi)
  useEffect(() => {
    document.documentElement.lang = currentLang;
    document.documentElement.dir = (currentLang === 'ur' || currentLang === 'sd') ? 'rtl' : 'ltr';
  }, [currentLang]);

  // Load saved reports from localStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem('sindh_farmer_reports');
      if (stored) {
        setReports(JSON.parse(stored));
      }
    } catch (e) {
      console.error('Failed to load reports from storage:', e);
    }
  }, []);

  // Save report handler
  const handleSaveReport = (newReport: SavedReport) => {
    const updated = [newReport, ...reports.filter(r => r.id !== newReport.id)];
    setReports(updated);
    try {
      localStorage.setItem('sindh_farmer_reports', JSON.stringify(updated));
    } catch (e) {
      console.error('Failed to persist report to storage:', e);
    }
  };

  // Delete report handler
  const handleDeleteReport = (id: string) => {
    const updated = reports.filter((r) => r.id !== id);
    setReports(updated);
    try {
      localStorage.setItem('sindh_farmer_reports', JSON.stringify(updated));
    } catch (e) {
      console.error('Failed to persist delete to storage:', e);
    }
  };

  const handleClearAllReports = () => {
    if (window.confirm('Are you sure you want to delete all saved farm reports?')) {
      setReports([]);
      try {
        localStorage.removeItem('sindh_farmer_reports');
      } catch (e) {}
    }
  };

  // Handle sample selection from any tab
  const handleSelectSample = (sample: DemoSample) => {
    setPreselectedSample(sample);
    setActiveTab('checker');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F8F9F5] text-stone-800 font-sans">
      
      {/* Top Navigation */}
      <Navbar
        currentLang={currentLang}
        onSelectLang={setCurrentLang}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        reportsCount={reports.length}
        onOpenDirectory={() => setIsDirectoryOpen(true)}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        
        {/* Tab 1: Overview / Landing */}
        {activeTab === 'overview' && (
          <HeroLanding
            currentLang={currentLang}
            onStartScan={() => setActiveTab('checker')}
            onExploreDemos={() => setActiveTab('samples')}
            onOpenDirectory={() => setIsDirectoryOpen(true)}
          />
        )}

        {/* Tab 2: Crop Health Checker (Default primary flow) */}
        {activeTab === 'checker' && (
          <div className="space-y-12">
            <CropChecker
              currentLang={currentLang}
              onOpenDirectory={() => setIsDirectoryOpen(true)}
              onReportSaved={handleSaveReport}
              preselectedSample={preselectedSample}
              onClearPreselectedSample={() => setPreselectedSample(null)}
            />

            {/* In-page overview link */}
            <div className="pt-8 border-t border-stone-200">
              <HeroLanding
                currentLang={currentLang}
                onStartScan={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                onExploreDemos={() => setActiveTab('samples')}
                onOpenDirectory={() => setIsDirectoryOpen(true)}
              />
            </div>
          </div>
        )}

        {/* Tab 3: Farming Assistant (Chat) */}
        {activeTab === 'assistant' && (
          <FarmingAssistant currentLang={currentLang} />
        )}

        {/* Tab 4: Interactive Demo Specimens */}
        {activeTab === 'samples' && (
          <SampleShowcase
            currentLang={currentLang}
            onSelectSample={handleSelectSample}
          />
        )}

        {/* Tab 5: Sindh Extension & Research Directory */}
        {activeTab === 'directory' && (
          <SindhExtensionDirectory currentLang={currentLang} />
        )}

        {/* Tab 6: Saved Reports */}
        {activeTab === 'reports' && (
          <SavedReportsView
            reports={reports}
            currentLang={currentLang}
            onDeleteReport={handleDeleteReport}
            onClearAll={handleClearAllReports}
            onOpenDirectory={() => setIsDirectoryOpen(true)}
            onNavigateChecker={() => setActiveTab('checker')}
          />
        )}

      </main>

      {/* Emergency Directory Modal */}
      <DirectoryModal
        isOpen={isDirectoryOpen}
        onClose={() => setIsDirectoryOpen(false)}
        currentLang={currentLang}
      />

      {/* Footer */}
      <Footer
        currentLang={currentLang}
        onOpenDirectory={() => setIsDirectoryOpen(true)}
        onNavigateTab={setActiveTab}
      />

    </div>
  );
}
