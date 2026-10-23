import React from 'react';
import { Sprout, ShieldAlert, Heart, Building2, PhoneCall } from 'lucide-react';
import { Language } from '../types';
import { TRANSLATIONS } from '../data/translations';

interface FooterProps {
  currentLang: Language;
  onOpenDirectory: () => void;
  onNavigateTab: (tab: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ currentLang, onOpenDirectory, onNavigateTab }) => {
  const t = TRANSLATIONS[currentLang];
  const isRtl = currentLang === 'ur' || currentLang === 'sd';

  return (
    <footer className={`bg-stone-900 text-stone-300 pt-12 pb-8 border-t border-stone-800 ${isRtl ? 'rtl' : 'ltr'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Top Disclaimer Box */}
        <div className="p-5 rounded-2xl bg-stone-950/90 border border-stone-800 text-stone-400 text-xs sm:text-sm space-y-2">
          <div className="flex items-center gap-2 text-amber-400 font-bold">
            <ShieldAlert className="w-4 h-4" />
            <span>MANDATORY AGRONOMIC &amp; MEDICAL DISCLAIMER</span>
          </div>
          <p className="leading-relaxed">
            Sindh Smart Farmer AI is an artificial intelligence decision-support tool designed to assist smallholder farmers in recognizing common crop disorders and adopting low-risk Integrated Pest Management (IPM) practices. 
            <strong> Visual photo evaluation can NEVER guarantee 100% diagnostic certainty.</strong> Foliar symptoms frequently overlap with viral complexes, sub-soil nematode damage, fungal blights, and salinity stress. 
            Never apply hazardous or unregistered chemical pesticides without prior physical verification and dosage calibration by a certified Sindh Agriculture Extension Officer or official research laboratory.
          </p>
        </div>

        {/* Main Footer Links */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-xs sm:text-sm">
          
          {/* Brand Info */}
          <div className="space-y-3 md:col-span-1">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-emerald-800 flex items-center justify-center text-emerald-300 font-bold">
                <Sprout className="w-5 h-5" />
              </div>
              <span className="font-extrabold text-base text-white">
                Sindh Smart Farmer AI
              </span>
            </div>
            <p className="text-stone-400 leading-relaxed text-xs">
              Built for smallholder growers and tenant farmers (haris) across Sindh, Pakistan—grounded in Indus Basin canal realities and trilingual support.
            </p>
          </div>

          {/* Quick Nav */}
          <div className="space-y-2">
            <span className="text-xs font-bold text-white uppercase tracking-wider block">Application</span>
            <ul className="space-y-1.5 text-stone-400 text-xs">
              <li>
                <button onClick={() => onNavigateTab('checker')} className="hover:text-emerald-300 transition-colors">
                  Crop Health Checker
                </button>
              </li>
              <li>
                <button onClick={() => onNavigateTab('assistant')} className="hover:text-emerald-300 transition-colors">
                  AI Farming Assistant (Chat)
                </button>
              </li>
              <li>
                <button onClick={() => onNavigateTab('samples')} className="hover:text-emerald-300 transition-colors">
                  Demo Test Specimens
                </button>
              </li>
              <li>
                <button onClick={() => onNavigateTab('reports')} className="hover:text-emerald-300 transition-colors">
                  Saved Farm Reports
                </button>
              </li>
            </ul>
          </div>

          {/* Research Centers */}
          <div className="space-y-2">
            <span className="text-xs font-bold text-white uppercase tracking-wider block">Key Sindh Research</span>
            <ul className="space-y-1.5 text-stone-400 text-xs">
              <li>Sindh Agriculture University, Tandojam</li>
              <li>Rice Research Institute, Dokri (Larkana)</li>
              <li>Cotton Research Station, Sakrand</li>
              <li>Horticulture Research Station, Mirpurkhas</li>
              <li>
                <button onClick={onOpenDirectory} className="text-amber-400 font-semibold hover:underline">
                  View Full Directory →
                </button>
              </li>
            </ul>
          </div>

          {/* Sindh Emergency Helpline */}
          <div className="space-y-2">
            <span className="text-xs font-bold text-white uppercase tracking-wider block">Farmer Helplines</span>
            <p className="text-stone-400 text-xs">
              Directorate General Agricultural Extension Sindh:
            </p>
            <div className="font-bold text-emerald-400 text-sm">
              +92-22-9200057 / 9200058
            </div>
            <p className="text-stone-400 text-xs pt-1">
              SAU Tandojam Crop Clinic: +92-22-2765870
            </p>
          </div>

        </div>

        {/* Copyright */}
        <div className="pt-8 border-t border-stone-800 text-stone-500 text-xs flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            &copy; {new Date().getFullYear()} Sindh Smart Farmer AI. Made for sustainable smallholder farming in Sindh, Pakistan.
          </div>
          <div className="flex items-center gap-4 text-stone-400 text-[11px]">
            <span>Indus River Basin</span>
            <span>•</span>
            <span>English • اردو • سنڌي</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
