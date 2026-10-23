import React, { useState } from 'react';
import { Sprout, Languages, PhoneCall, FileText, Bot, ShieldAlert, Sparkles, Menu, X, BookOpen } from 'lucide-react';
import { Language } from '../types';
import { TRANSLATIONS } from '../data/translations';

interface NavbarProps {
  currentLang: Language;
  onSelectLang: (lang: Language) => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  reportsCount: number;
  onOpenDirectory: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentLang,
  onSelectLang,
  activeTab,
  setActiveTab,
  reportsCount,
  onOpenDirectory,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const t = TRANSLATIONS[currentLang];
  const isRtl = currentLang === 'ur' || currentLang === 'sd';

  const navItems = [
    { id: 'checker', label: t.navChecker, icon: Sprout },
    { id: 'assistant', label: t.navAssistant, icon: Bot },
    { id: 'samples', label: t.navSamples, icon: Sparkles },
    { id: 'directory', label: t.navDirectory, icon: BookOpen },
    { id: 'reports', label: `${t.navReports} (${reportsCount})`, icon: FileText },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-stone-200/80 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo & Brand Identity */}
          <div 
            onClick={() => setActiveTab('checker')}
            className="flex items-center gap-3 cursor-pointer group select-none"
          >
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-700 to-emerald-900 flex items-center justify-center text-white shadow-md shadow-emerald-900/10 group-hover:scale-105 transition-transform duration-200">
              <Sprout className="w-7 h-7 text-emerald-300 stroke-[2.2]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-xl sm:text-2xl tracking-tight text-emerald-950 font-sans">
                  Sindh Smart Farmer
                </span>
                <span className="px-2 py-0.5 text-xs font-bold bg-amber-100 text-amber-900 rounded-md border border-amber-300">
                  AI
                </span>
              </div>
              <p className={`text-xs text-stone-500 font-medium ${isRtl ? 'font-urdu' : ''}`}>
                {currentLang === 'sd' 
                  ? 'سنڌ جي آبادگارن لاءِ فصلي صلاحڪار' 
                  : currentLang === 'ur'
                  ? 'سندھ کے کسانوں کے لیے سمارٹ زرعی رہنمائی'
                  : 'Agronomy Decision-Support for Sindh, Pakistan'}
              </p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1.5">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id);
                  }}
                  className={`flex items-center gap-2 px-3.5 py-2 text-sm font-semibold rounded-lg transition-all duration-150 ${
                    isActive
                      ? 'bg-emerald-800 text-white shadow-xs'
                      : 'text-stone-700 hover:text-emerald-900 hover:bg-stone-100'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-emerald-300' : 'text-stone-500'}`} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Right Action: Language Switcher & Emergency Hotline */}
          <div className="hidden sm:flex items-center gap-3">
            {/* Language Pills */}
            <div className="flex items-center bg-stone-100 p-1 rounded-lg border border-stone-200 text-xs font-semibold">
              <button
                onClick={() => onSelectLang('en')}
                className={`px-2.5 py-1.5 rounded-md transition-colors ${
                  currentLang === 'en'
                    ? 'bg-white text-emerald-900 shadow-xs font-bold'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                English
              </button>
              <button
                onClick={() => onSelectLang('ur')}
                className={`px-2.5 py-1.5 rounded-md transition-colors font-urdu ${
                  currentLang === 'ur'
                    ? 'bg-white text-emerald-900 shadow-xs font-bold'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                اردو
              </button>
              <button
                onClick={() => onSelectLang('sd')}
                className={`px-2.5 py-1.5 rounded-md transition-colors font-sindhi ${
                  currentLang === 'sd'
                    ? 'bg-white text-emerald-900 shadow-xs font-bold'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                سنڌي
              </button>
            </div>

            {/* Emergency Helpline Trigger */}
            <button
              onClick={onOpenDirectory}
              title="Official Sindh Agriculture Department Helplines"
              className="flex items-center gap-2 px-3 py-1.5 text-xs font-bold bg-emerald-50 hover:bg-emerald-100 text-emerald-900 border border-emerald-300 rounded-lg transition-colors shadow-xs"
            >
              <PhoneCall className="w-3.5 h-3.5 text-emerald-700 animate-pulse" />
              <span>{t.emergencyHelpline}</span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex lg:hidden items-center gap-2">
            {/* Language toggle for mobile */}
            <div className="flex items-center bg-stone-100 p-0.5 rounded-md border border-stone-200 text-xs">
              <button
                onClick={() => onSelectLang('en')}
                className={`px-2 py-1 rounded ${currentLang === 'en' ? 'bg-white font-bold text-emerald-900 shadow-xs' : 'text-stone-600'}`}
              >
                EN
              </button>
              <button
                onClick={() => onSelectLang('ur')}
                className={`px-2 py-1 rounded font-urdu ${currentLang === 'ur' ? 'bg-white font-bold text-emerald-900 shadow-xs' : 'text-stone-600'}`}
              >
                اردو
              </button>
              <button
                onClick={() => onSelectLang('sd')}
                className={`px-2 py-1 rounded font-sindhi ${currentLang === 'sd' ? 'bg-white font-bold text-emerald-900 shadow-xs' : 'text-stone-600'}`}
              >
                سنڌي
              </button>
            </div>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-stone-700 hover:text-emerald-900 hover:bg-stone-100 rounded-lg"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-stone-200 bg-stone-50 px-4 pt-3 pb-5 space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  setMobileMenuOpen(false);
                }}
                className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-semibold rounded-lg transition-colors ${
                  isActive
                    ? 'bg-emerald-800 text-white'
                    : 'text-stone-800 bg-white hover:bg-stone-100 border border-stone-200'
                }`}
              >
                <Icon className={`w-5 h-5 ${isActive ? 'text-emerald-300' : 'text-stone-500'}`} />
                <span>{item.label}</span>
              </button>
            );
          })}
          <div className="pt-2">
            <button
              onClick={() => {
                onOpenDirectory();
                setMobileMenuOpen(false);
              }}
              className="w-full flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-bold bg-amber-500 text-white rounded-lg shadow-xs"
            >
              <PhoneCall className="w-4 h-4" />
              <span>{t.emergencyHelpline} (Hyderabad, Dokri, Sakrand)</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
