import React from 'react';
import { 
  Sprout, 
  ShieldCheck, 
  Languages, 
  AlertTriangle, 
  ArrowRight, 
  Droplets, 
  Bug, 
  MapPin, 
  CheckCircle2, 
  Sparkles,
  HelpCircle
} from 'lucide-react';
import { Language } from '../types';
import { TRANSLATIONS } from '../data/translations';

interface HeroLandingProps {
  currentLang: Language;
  onStartScan: () => void;
  onExploreDemos: () => void;
  onOpenDirectory: () => void;
}

export const HeroLanding: React.FC<HeroLandingProps> = ({
  currentLang,
  onStartScan,
  onExploreDemos,
  onOpenDirectory,
}) => {
  const t = TRANSLATIONS[currentLang];
  const isRtl = currentLang === 'ur' || currentLang === 'sd';

  return (
    <div className={`space-y-12 pb-8 ${isRtl ? 'rtl' : 'ltr'}`}>
      {/* Hero Banner Section */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-emerald-950 via-emerald-900 to-stone-900 text-white shadow-xl border border-emerald-800/40">
        {/* Subtle patterned overlay */}
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#10b981_1px,transparent_1px)] [background-size:20px_20px] pointer-events-none" />

        <div className="relative max-w-5xl mx-auto px-6 py-14 sm:py-20 text-center">
          {/* Sindh Zone Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-800/80 border border-emerald-600/50 text-emerald-200 text-xs sm:text-sm font-semibold tracking-wide mb-6 backdrop-blur-xs">
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
            <span>{t.heroBadge}</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-stone-50 leading-tight">
            {t.heroTitle}{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 via-amber-200 to-emerald-400">
              {t.heroTitleAccent}
            </span>
          </h1>

          <p className="mt-6 text-base sm:text-lg lg:text-xl text-emerald-100/90 max-w-3xl mx-auto leading-relaxed font-normal">
            {t.heroDescription}
          </p>

          {/* Action CTAs */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={onStartScan}
              className="flex items-center gap-2 px-7 py-4 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-base shadow-lg shadow-amber-900/30 transition-all hover:scale-102 cursor-pointer"
            >
              <Sprout className="w-5 h-5 text-stone-950" />
              <span>{t.heroBtnScan}</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={onExploreDemos}
              className="flex items-center gap-2 px-6 py-4 rounded-xl bg-emerald-800/60 hover:bg-emerald-800 text-white font-semibold text-base border border-emerald-600/60 shadow-md backdrop-blur-xs transition-all cursor-pointer"
            >
              <Sparkles className="w-5 h-5 text-amber-300" />
              <span>{t.heroBtnDemos}</span>
            </button>
          </div>

          {/* Key Trust Signals */}
          <div className="mt-12 pt-8 border-t border-emerald-800/60 grid grid-cols-2 md:grid-cols-4 gap-4 text-emerald-200/90 text-xs sm:text-sm">
            <div className="flex flex-col items-center">
              <span className="font-bold text-white text-lg">Sindh Baseline</span>
              <span>Cotton, Rice, Wheat, Mango</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="font-bold text-white text-lg">3 Languages</span>
              <span>Sindhi, Urdu, English</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="font-bold text-white text-lg">Safe IPM First</span>
              <span>Non-toxic immediate remedies</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="font-bold text-white text-lg">100% Non-Exaggerated</span>
              <span>Clear uncertainty limits</span>
            </div>
          </div>
        </div>
      </section>

      {/* The Problem & The Solution: High Impact Cards */}
      <section className="space-y-6">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-stone-900">
            {currentLang === 'sd' 
              ? 'سنڌ جي ننڍن هارين جا مسئلا ۽ ٽيڪنالاجي جو حل' 
              : currentLang === 'ur'
              ? 'سندھ کے کاشتکاروں کے چیلنجز اور اسمارٹ حل'
              : 'The Sindh Smallholder Reality & Why Visual AI Helps'}
          </h2>
          <p className="mt-2 text-stone-600 text-sm sm:text-base">
            {currentLang === 'sd'
              ? 'صحيح معلومات نه هجڻ ڪري هاري هر سال لکين رپين جي مهانگي دوائن ۽ بيمارين جو شڪار ٿين ٿا.'
              : currentLang === 'ur'
              ? 'مناسب زرعی رہنمائی اور مادری زبان میں معلومات کی کمی کی وجہ سے کسان غلط زرعی ادویات پر قرضوں کے بوجھ تلے دب جاتے ہیں۔'
              : 'Small-scale haris and growers often lack access to timely agronomic advice, falling prey to aggressive pesticide marketing and water rotation stress.'}
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Problem Card */}
          <div className="p-7 rounded-2xl bg-amber-50/60 border border-amber-200/80 shadow-xs space-y-4">
            <div className="flex items-center gap-3 text-amber-900 font-bold text-lg">
              <div className="w-10 h-10 rounded-xl bg-amber-200/80 flex items-center justify-center">
                <AlertTriangle className="w-5 h-5 text-amber-800" />
              </div>
              <h3>
                {currentLang === 'sd' 
                  ? 'موجوده سنگين مسئلا (The Challenges)' 
                  : currentLang === 'ur'
                  ? 'موجودہ زرعی مسائل (The Challenges)'
                  : 'The Ground Reality in Sindh Fields'}
              </h3>
            </div>
            <ul className="space-y-3 text-sm text-stone-700">
              <li className="flex items-start gap-2.5">
                <span className="text-amber-700 font-bold mt-0.5">•</span>
                <span>
                  <strong>{currentLang === 'sd' ? 'ٻوليءَ جي رڪاوٽ:' : currentLang === 'ur' ? 'زبان کی رکاوٹ:' : 'Language Exclusion:'}</strong>{' '}
                  {currentLang === 'sd' 
                    ? 'اڪثر پمفليٽ ۽ دوائن جا ليبل رڳو انگريزيءَ ۾ هوندا آهن، جڏهن ته هارين جي اڪثريت سنڌي ڳالهائي ٿي.'
                    : currentLang === 'ur'
                    ? 'زرعی تحقیق اور لیبلز انگریزی میں ہوتے ہیں، جنہیں عام کاشتکار آسانی سے سمجھ نہیں پاتے۔'
                    : 'Agricultural labels and literature are often in English or complex jargon, inaccessible to native Sindhi and Urdu speakers.'}
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-amber-700 font-bold mt-0.5">•</span>
                <span>
                  <strong>{currentLang === 'sd' ? 'زهريلي اسپري ۽ قرض:' : currentLang === 'ur' ? 'بے دریغ کیمیائی اسپرے:' : 'Indiscriminate Pesticide Debt:'}</strong>{' '}
                  {currentLang === 'sd' 
                    ? 'دڪاندارن جي چوڻ تي اڻ ڄاڻائيءَ ۾ بيماري وڌندڙ اسپري ڪئي ويندي آهي جنهن سان دوست ڪيڙا مري وڃن ٿا.'
                    : currentLang === 'ur'
                    ? 'مقامی ڈیلرز غیر ضروری مہنگی ادویات بیچتے ہیں جس سے دوست کیڑے مر جاتے ہیں اور کسان مقروض ہو جاتا ہے۔'
                    : 'Dealers often prescribe toxic multi-chemical cocktails that eradicate beneficial predator insects and trigger secondary pest resurgence.'}
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-amber-700 font-bold mt-0.5">•</span>
                <span>
                  <strong>{currentLang === 'sd' ? 'پاڻي ۽ ڪلر جو مسئلو:' : currentLang === 'ur' ? 'نہری پانی اور سیم و تھور:' : 'Canal Rotation & Salinity Overlap:'}</strong>{' '}
                  {currentLang === 'sd' 
                    ? 'ڪئنال جي وارابندي ۽ ڪلر جي سبب پتن جو پيلو ٿيڻ اڪثر بيماري سمجهي غلط دوا وٺي ويندي آهي.'
                    : currentLang === 'ur'
                    ? 'سندھ میں کلر (Salinity) اور پانی کی کمی کے اثرات کو اکثر پودوں کی بیماری سمجھ کر غلط علاج کیا جاتا ہے۔'
                    : 'Nutrient deficiencies caused by saline groundwater (Kalar) are routinely misdiagnosed as viral or fungal diseases.'}
                </span>
              </li>
            </ul>
          </div>

          {/* Solution Card */}
          <div className="p-7 rounded-2xl bg-emerald-50/60 border border-emerald-200/80 shadow-xs space-y-4">
            <div className="flex items-center gap-3 text-emerald-950 font-bold text-lg">
              <div className="w-10 h-10 rounded-xl bg-emerald-200/80 flex items-center justify-center">
                <ShieldCheck className="w-5 h-5 text-emerald-800" />
              </div>
              <h3>
                {currentLang === 'sd' 
                  ? 'اسمارٽ فارمر اي آءِ جو حل (The AI Solution)' 
                  : currentLang === 'ur'
                  ? 'اسمارٹ فارمر اے آئی کا حل (The AI Solution)'
                  : 'How Sindh Smart Farmer AI Helps'}
              </h3>
            </div>
            <ul className="space-y-3 text-sm text-stone-700">
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                <span>
                  <strong>{currentLang === 'sd' ? 'هڪ تصوير سان معائنو:' : currentLang === 'ur' ? 'ایک تصویر سے معائنہ:' : 'Rapid Multimodal Inspection:'}</strong>{' '}
                  {currentLang === 'sd' 
                    ? 'ٻوٽي جي تصوير ڏسي پتن جا نشان، فنگس يا اڇي مکي جون علامتون جيمينائي ذريعي پرکيون وڃن ٿيون.'
                    : currentLang === 'ur'
                    ? 'موبائل سے کھینچی گئی تصویر سے جیمنائی ماڈل پتوں پر موجود علامات اور کیڑوں کی نشانیوں کا جائزہ لیتا ہے۔'
                    : 'Gemini 3.8 Flash assesses visual leaf chlorosis, lesions, curling, and pest activity in seconds.'}
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                <span>
                  <strong>{currentLang === 'sd' ? 'بنا خطري وارا فوري اپاءَ:' : currentLang === 'ur' ? 'محفوظ اور سستے طریقے:' : 'Zero-Toxicity Immediate Action:'}</strong>{' '}
                  {currentLang === 'sd' 
                    ? 'نم جو تيل، پيلو اسٽيڪر پنو ۽ پاڻي جي درستگي جهڙا آسان ۽ سستا طريقا ڏنا وڃن ٿا.'
                    : currentLang === 'ur'
                    ? 'نیم کا ست، پیلے چپکنے والے کارڈز اور آبپاشی میں توازن جیسے فوری اور بے ضرر مشورے۔'
                    : 'Prioritizes yellow sticky traps, neem extract repellents, sanitation, and watering adjustments before chemical sprays.'}
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                <span>
                  <strong>{currentLang === 'sd' ? 'ماهرن سان رابطو:' : currentLang === 'ur' ? 'سرکاری زرعی رابطے:' : 'Extension Directory Integration:'}</strong>{' '}
                  {currentLang === 'sd' 
                    ? 'ٽنڊوڄام، ڊوڪري ۽ سڪرنڊ جي ريسرچ سينٽرن جا نمبر فوري طور تي ملي وڃن ٿا.'
                    : currentLang === 'ur'
                    ? 'ٹنڈوجام زرعی یونیورسٹی، ڈوکری رائس انسٹیٹیوٹ اور سکرنڈ کاٹن سینٹر سے فوری رہنمائی۔'
                    : 'Direct access to verified phone lines for Sindh Agriculture Extension, SAU Tandojam, Dokri, and Sakrand.'}
                </span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* 3 Core Value Pillars */}
      <section className="grid sm:grid-cols-3 gap-5">
        <div className="bg-white p-6 rounded-2xl border border-stone-200/90 shadow-xs hover:border-emerald-500/50 transition-colors">
          <div className="w-12 h-12 rounded-xl bg-emerald-100 flex items-center justify-center text-emerald-800 mb-4">
            <Sprout className="w-6 h-6" />
          </div>
          <h4 className="font-bold text-stone-900 text-base">{t.heroFeature1Title}</h4>
          <p className="mt-2 text-stone-600 text-sm leading-relaxed">{t.heroFeature1Desc}</p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-stone-200/90 shadow-xs hover:border-emerald-500/50 transition-colors">
          <div className="w-12 h-12 rounded-xl bg-amber-100 flex items-center justify-center text-amber-800 mb-4">
            <Languages className="w-6 h-6" />
          </div>
          <h4 className="font-bold text-stone-900 text-base">{t.heroFeature2Title}</h4>
          <p className="mt-2 text-stone-600 text-sm leading-relaxed">{t.heroFeature2Desc}</p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-stone-200/90 shadow-xs hover:border-emerald-500/50 transition-colors">
          <div className="w-12 h-12 rounded-xl bg-stone-100 flex items-center justify-center text-stone-800 mb-4">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <h4 className="font-bold text-stone-900 text-base">{t.heroFeature3Title}</h4>
          <p className="mt-2 text-stone-600 text-sm leading-relaxed">{t.heroFeature3Desc}</p>
        </div>
      </section>
    </div>
  );
};
