import React from 'react';
import { X, PhoneCall, Building2, ShieldCheck, MapPin } from 'lucide-react';
import { Language } from '../types';
import { SINDH_EXTENSION_CONTACTS } from '../data/sindhAgriData';
import { TRANSLATIONS } from '../data/translations';

interface DirectoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentLang: Language;
}

export const DirectoryModal: React.FC<DirectoryModalProps> = ({ isOpen, onClose, currentLang }) => {
  if (!isOpen) return null;
  const t = TRANSLATIONS[currentLang];
  const isRtl = currentLang === 'ur' || currentLang === 'sd';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/70 backdrop-blur-xs animate-fadeIn">
      <div 
        className={`bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-hidden flex flex-col shadow-2xl border border-stone-200 ${isRtl ? 'rtl' : 'ltr'}`}
      >
        {/* Modal Header */}
        <div className="p-6 bg-emerald-950 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500 text-stone-950 flex items-center justify-center font-bold">
              <PhoneCall className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-extrabold text-lg text-white">
                {t.emergencyHelpline}
              </h3>
              <p className="text-xs text-emerald-200">
                Official Sindh Agriculture Extension &amp; University Advisory Desks
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-stone-300 hover:text-white hover:bg-emerald-900 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-4">
          <div className="p-3.5 bg-amber-50 rounded-2xl border border-amber-200 text-xs text-amber-900 leading-relaxed">
            <strong>Advisory Note:</strong> Before applying any chemical formulation or heavy pesticide spray, contact your local union council agricultural field assistant or one of these verified government centers to verify disease samples.
          </div>

          <div className="space-y-3">
            {SINDH_EXTENSION_CONTACTS.map((c, i) => (
              <div key={i} className="p-4 rounded-2xl bg-stone-50 border border-stone-200 hover:border-emerald-300 transition-colors flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <div className="space-y-1">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-800">
                    <MapPin className="w-3.5 h-3.5" />
                    <span>{c.city}</span>
                  </div>
                  <h4 className="font-bold text-stone-900 text-sm">{c.institution}</h4>
                  <p className="text-xs text-stone-500">{c.role}</p>
                </div>

                <a
                  href={`tel:${c.phone.split('/')[0].trim()}`}
                  className="self-start sm:self-center inline-flex items-center gap-2 px-3 py-1.5 bg-emerald-800 text-white text-xs font-bold rounded-lg hover:bg-emerald-700 transition-colors shrink-0"
                >
                  <PhoneCall className="w-3 h-3 text-emerald-300" />
                  <span>{c.phone.split('/')[0].trim()}</span>
                </a>
              </div>
            ))}
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-stone-50 border-t border-stone-200 text-center">
          <button
            onClick={onClose}
            className="px-6 py-2 rounded-xl bg-stone-200 hover:bg-stone-300 text-stone-800 font-bold text-xs transition-colors"
          >
            Close Directory
          </button>
        </div>
      </div>
    </div>
  );
};
