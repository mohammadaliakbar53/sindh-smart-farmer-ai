import React from 'react';
import { PhoneCall, Building2, MapPin, ShieldCheck, AlertTriangle, ExternalLink, HelpCircle } from 'lucide-react';
import { Language } from '../types';
import { SINDH_EXTENSION_CONTACTS } from '../data/sindhAgriData';
import { TRANSLATIONS } from '../data/translations';

interface SindhExtensionDirectoryProps {
  currentLang: Language;
}

export const SindhExtensionDirectory: React.FC<SindhExtensionDirectoryProps> = ({ currentLang }) => {
  const t = TRANSLATIONS[currentLang];
  const isRtl = currentLang === 'ur' || currentLang === 'sd';

  return (
    <div className={`space-y-8 ${isRtl ? 'rtl' : 'ltr'}`}>
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-900 text-xs font-bold">
          <Building2 className="w-3.5 h-3.5" />
          <span>Government of Sindh Agriculture Research &amp; Extension</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-black text-stone-900 tracking-tight">
          {currentLang === 'sd' 
            ? 'سنڌ زرعي کاتو ۽ تحقيقي ادارا (Extension Directory)' 
            : currentLang === 'ur'
            ? 'سندھ زرعی توسیع اور ریسرچ سینٹرز (Extension Directory)'
            : 'Official Sindh Agriculture Research & Extension Directory'}
        </h2>
        <p className="text-sm text-stone-600">
          {currentLang === 'sd'
            ? 'ڪنهن به ڪيميائي اسپري خريد ڪرڻ کان اڳ پنهنجي علائقي جي باضابطه زرعي اداري مان تصديق ڪريو.'
            : currentLang === 'ur'
            ? 'کیمیائی زہروں کے استعمال سے قبل سرکاری زرعی مراکز اور فیلڈ آفیسرز سے رہنمائی حاصل کریں۔'
            : 'Verified contacts for official agronomic testing, soil salinity diagnosis, and certified seed inspection.'}
        </p>
      </div>

      {/* Contact Cards */}
      <div className="grid md:grid-cols-2 gap-5">
        {SINDH_EXTENSION_CONTACTS.map((contact, idx) => (
          <div
            key={idx}
            className="bg-white p-6 rounded-3xl border border-stone-200/90 shadow-2xs hover:border-emerald-300 transition-colors space-y-4"
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <span className="text-[11px] font-bold text-emerald-800 uppercase tracking-wider block">
                  {contact.city}
                </span>
                <h3 className="font-extrabold text-base sm:text-lg text-stone-900 mt-0.5">
                  {contact.institution}
                </h3>
                <p className="text-xs font-urdu text-stone-500 mt-0.5">
                  {contact.institutionUrdu}
                </p>
              </div>
              <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0">
                <Building2 className="w-5 h-5" />
              </div>
            </div>

            <div className="space-y-2 text-xs text-stone-600">
              <div>
                <strong className="text-stone-800">Role:</strong> {contact.role}
              </div>
              <div>
                <strong className="text-stone-800">Service Scope:</strong> {contact.scope}
              </div>
            </div>

            <div className="pt-3 border-t border-stone-100 flex items-center justify-between">
              <a
                href={`tel:${contact.phone.split('/')[0].trim()}`}
                className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-emerald-800 text-white font-bold text-xs hover:bg-emerald-700 transition-colors shadow-2xs"
              >
                <PhoneCall className="w-3.5 h-3.5 text-emerald-300" />
                <span>Call {contact.phone.split('/')[0].trim()}</span>
              </a>
              <span className="text-[11px] text-stone-500">{contact.city}, Sindh</span>
            </div>
          </div>
        ))}
      </div>

      {/* Safety Protocol Banner for Pesticide Application */}
      <div className="p-6 rounded-3xl bg-amber-50/90 border border-amber-300/80 shadow-xs space-y-3">
        <div className="flex items-center gap-2.5 text-amber-950 font-bold text-base">
          <ShieldCheck className="w-5 h-5 text-amber-700" />
          <h4>
            {currentLang === 'sd'
              ? 'هارين لاءِ ضروري حفاظتي هدايتون (Pesticide Safety Rules)'
              : currentLang === 'ur'
              ? 'کاشتکاروں کے لیے اہم حفاظتی اصول (Pesticide Safety Rules)'
              : 'Pesticide Safety & Chemical Application Protocol in Sindh'}
          </h4>
        </div>
        <ul className="grid sm:grid-cols-2 gap-3 text-xs sm:text-sm text-stone-700 pt-1">
          <li className="flex items-start gap-2">
            <span className="text-amber-700 font-bold mt-0.5">•</span>
            <span>Always wear protective cloth mask, full sleeves, and rubber gloves when preparing spray solutions.</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-amber-700 font-bold mt-0.5">•</span>
            <span>Never spray against wind direction or in temperature exceeding 38°C to prevent hazardous chemical drift.</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-amber-700 font-bold mt-0.5">•</span>
            <span>Verify the Department of Plant Protection (DPP) batch registration number on bottle packaging.</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-amber-700 font-bold mt-0.5">•</span>
            <span>Respect Pre-Harvest Intervals (PHI)—do not harvest crops within 14 days of chemical application.</span>
          </li>
        </ul>
      </div>

    </div>
  );
};
