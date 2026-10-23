import React from 'react';
import { Sparkles, ArrowRight, MapPin, Sprout, AlertCircle, CheckCircle2 } from 'lucide-react';
import { DemoSample, Language } from '../types';
import { DEMO_SAMPLES } from '../data/sindhAgriData';
import { TRANSLATIONS } from '../data/translations';

interface SampleShowcaseProps {
  currentLang: Language;
  onSelectSample: (sample: DemoSample) => void;
}

export const SampleShowcase: React.FC<SampleShowcaseProps> = ({ currentLang, onSelectSample }) => {
  const t = TRANSLATIONS[currentLang];
  const isRtl = currentLang === 'ur' || currentLang === 'sd';

  return (
    <div className={`space-y-8 ${isRtl ? 'rtl' : 'ltr'}`}>
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-bold">
          <Sparkles className="w-3.5 h-3.5 text-amber-700" />
          <span>Interactive Test Specimens for Evaluators &amp; Farmers</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-black text-stone-900 tracking-tight">
          {currentLang === 'sd' 
            ? 'سنڌ جي مکيه فصلن جا نمونا (Sample Demonstrations)' 
            : currentLang === 'ur'
            ? 'سندھ کی فصلوں کے نمونہ کیسز (Sample Demonstrations)'
            : 'Pre-Loaded Sindh Agricultural Demonstration Cases'}
        </h2>
        <p className="text-sm text-stone-600">
          {currentLang === 'sd'
            ? 'ججن ۽ صارفين لاءِ فوري طور تي چڪاس جا تيار ٿيل نمونا. ڪنهن به نموني تي ڪلڪ ڪريو ۽ جيمينائي ذريعي معائنو شروع ڪريو.'
            : currentLang === 'ur'
            ? 'ججز اور کاشتکاروں کے فوری ٹیسٹ کے لیے تیار نمونہ جات۔ کسی بھی کیس پر کلک کر کے فوری جیمنائی تجزیہ حاصل کریں۔'
            : 'Immediate, zero-friction testing cases reflecting real agro-ecological conditions across the Indus basin in Sindh.'}
        </p>
      </div>

      {/* Grid of Samples */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {DEMO_SAMPLES.map((sample) => (
          <div
            key={sample.id}
            className="bg-white rounded-3xl border border-stone-200/90 shadow-xs hover:shadow-md transition-all flex flex-col overflow-hidden group"
          >
            {/* Visual Specimen Preview */}
            <div className="aspect-16/10 bg-stone-100 relative overflow-hidden">
              <img
                src={sample.imageUrl}
                alt={sample.title}
                className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-300"
              />
              <div className="absolute top-3 left-3 bg-emerald-950/80 backdrop-blur-xs text-emerald-300 text-[10px] font-bold px-2.5 py-1 rounded-full border border-emerald-700/60">
                {sample.badge}
              </div>
            </div>

            {/* Specimen Body */}
            <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs text-stone-500 font-semibold">
                  <MapPin className="w-3.5 h-3.5 text-emerald-700" />
                  <span>{sample.district}</span>
                  <span>•</span>
                  <span>{sample.crop.split('/')[0]}</span>
                </div>

                <h3 className="font-extrabold text-lg text-stone-900 group-hover:text-emerald-900 transition-colors">
                  {currentLang === 'sd' ? sample.titleSindhi : currentLang === 'ur' ? sample.titleUrdu : sample.title}
                </h3>

                <p className="text-xs text-stone-600 leading-relaxed">
                  {sample.description}
                </p>

                <div className="pt-2 border-t border-stone-100">
                  <span className="text-[11px] font-bold text-stone-700 block mb-1">Observed Field Symptoms:</span>
                  <p className="text-xs text-stone-600 italic line-clamp-3">
                    "{sample.symptoms}"
                  </p>
                </div>
              </div>

              {/* Action Button */}
              <button
                type="button"
                onClick={() => onSelectSample(sample)}
                className="w-full mt-2 py-2.5 px-4 rounded-xl bg-emerald-50 hover:bg-emerald-800 text-emerald-900 hover:text-white border border-emerald-300 hover:border-emerald-800 font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-2xs group-hover:bg-emerald-800 group-hover:text-white cursor-pointer"
              >
                <Sprout className="w-4 h-4 text-emerald-700 group-hover:text-emerald-300" />
                <span>Test this Case in AI Checker</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};
