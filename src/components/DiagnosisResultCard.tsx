import React, { useState } from 'react';
import { 
  AlertTriangle, 
  CheckCircle2, 
  Volume2, 
  VolumeX, 
  Share2, 
  Printer, 
  BookmarkCheck, 
  PhoneCall, 
  HelpCircle, 
  ShieldAlert, 
  ExternalLink,
  ChevronRight,
  Info,
  Droplets,
  Calendar
} from 'lucide-react';
import { DiagnosisData, Language } from '../types';
import { TRANSLATIONS } from '../data/translations';

interface DiagnosisResultCardProps {
  data: DiagnosisData;
  cropName: string;
  district: string;
  cropStage: string;
  symptoms: string;
  imagePreview?: string;
  currentLang: Language;
  onSaveReport?: () => void;
  isSaved?: boolean;
  onOpenDirectory: () => void;
}

export const DiagnosisResultCard: React.FC<DiagnosisResultCardProps> = ({
  data,
  cropName,
  district,
  cropStage,
  symptoms,
  imagePreview,
  currentLang,
  onSaveReport,
  isSaved = false,
  onOpenDirectory,
}) => {
  const t = TRANSLATIONS[currentLang];
  const isRtl = currentLang === 'ur' || currentLang === 'sd';

  const [isPlayingAudio, setIsPlayingAudio] = useState<string | null>(null);
  const [copyFeedback, setCopyFeedback] = useState(false);

  // Text to speech using standard browser speech synthesis
  const handleSpeak = (text: string, langCode: string, id: string) => {
    if (!('speechSynthesis' in window)) {
      alert('Text to speech is not supported in this browser.');
      return;
    }

    if (isPlayingAudio === id) {
      window.speechSynthesis.cancel();
      setIsPlayingAudio(null);
      return;
    }

    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = langCode;
    utterance.rate = 0.95;

    // Pick suitable voice if available
    const voices = window.speechSynthesis.getVoices();
    const matchedVoice = voices.find(v => v.lang.startsWith(langCode));
    if (matchedVoice) {
      utterance.voice = matchedVoice;
    }

    utterance.onend = () => setIsPlayingAudio(null);
    utterance.onerror = () => setIsPlayingAudio(null);

    setIsPlayingAudio(id);
    window.speechSynthesis.speak(utterance);
  };

  // WhatsApp formatted report copy
  const handleCopyReport = () => {
    const reportText = `🌾 *SINDH SMART FARMER AI — DIAGNOSTIC REPORT* 🌾
🗓️ Date: ${new Date().toLocaleDateString()}
📍 District: ${district || 'Sindh, Pakistan'}
🌱 Crop: ${cropName || 'Field Specimen'} (${cropStage || 'Current Stage'})

🔍 *Primary Suspected Condition:*
• ${data.primarySuspect}
• اردو: ${data.localNameUrdu}
• سنڌي: ${data.localNameSindhi}
${data.scientificOrPathogenName ? `• Scientific: ${data.scientificOrPathogenName}` : ''}
• Confidence: ${data.confidenceLevel} (${data.confidencePercentage}%)

⚠️ *CRITICAL DISCLAIMER:*
${data.uncertaintyDisclaimer}

👁️ *Visible Visual Evidence Observed:*
${data.visibleEvidence.map((e, i) => `${i + 1}. ${e}`).join('\n')}

🛡️ *Safe Immediate Steps (Zero Toxicity):*
${data.safeImmediateSteps.map((s, i) => `✓ ${s}`).join('\n')}

🌱 *Prevention & IPM Guidance:*
${data.preventionAndManagement.map((p, i) => `• ${p}`).join('\n')}

📞 *When to Contact Agriculture Extension:*
${data.whenToContactExpert.map((c, i) => `! ${c}`).join('\n')}

📞 *Sindh Agriculture Department Directorate (Hyderabad):* +92-22-9200057
🏛️ *SAU Tandojam Helpline:* +92-22-2765870
_Advisory provided for Sindh smallholders. Verify with local extension before applying chemical pesticides._`;

    navigator.clipboard.writeText(reportText).then(() => {
      setCopyFeedback(true);
      setTimeout(() => setCopyFeedback(false), 3500);
    });
  };

  const handlePrint = () => {
    window.print();
  };

  // Severity color indicator
  const getSeverityBadge = (level: string) => {
    if (level.toLowerCase().includes('severe') || level.toLowerCase().includes('urgent')) {
      return 'bg-red-100 text-red-800 border-red-300';
    }
    if (level.toLowerCase().includes('moderate')) {
      return 'bg-amber-100 text-amber-900 border-amber-300';
    }
    return 'bg-emerald-100 text-emerald-800 border-emerald-300';
  };

  return (
    <div id="printable-report" className={`space-y-6 bg-white rounded-3xl p-6 sm:p-8 border border-stone-200/90 shadow-md ${isRtl ? 'rtl' : 'ltr'}`}>
      
      {/* 1. Header with Crop Info & Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-6 border-b border-stone-200">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-emerald-800 uppercase tracking-wider mb-1">
            <span className="w-2 h-2 rounded-full bg-emerald-600" />
            <span>{t.reportTitle}</span>
            <span>•</span>
            <span>{district || 'Sindh, Pakistan'}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-stone-900 tracking-tight">
            {cropName || 'Field Crop Specimen'}
          </h2>
          <div className="flex flex-wrap items-center gap-3 mt-1.5 text-xs text-stone-500">
            {cropStage && <span>Stage: <strong className="text-stone-700">{cropStage}</strong></span>}
            <span>•</span>
            <span className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5 text-stone-400" />
              {new Date().toLocaleDateString()}
            </span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-2 print:hidden">
          <button
            onClick={handleCopyReport}
            className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-900 border border-emerald-300 transition-colors shadow-xs"
            title="Copy formatted text for WhatsApp"
          >
            <Share2 className="w-4 h-4 text-emerald-700" />
            <span>{t.copyReport}</span>
          </button>

          <button
            onClick={handlePrint}
            className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-800 border border-stone-300 transition-colors"
          >
            <Printer className="w-4 h-4 text-stone-600" />
            <span>{t.downloadPdf}</span>
          </button>

          {onSaveReport && (
            <button
              onClick={onSaveReport}
              disabled={isSaved}
              className={`flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold rounded-lg transition-colors ${
                isSaved
                  ? 'bg-emerald-700 text-white cursor-default'
                  : 'bg-stone-900 hover:bg-stone-800 text-white shadow-xs'
              }`}
            >
              <BookmarkCheck className="w-4 h-4" />
              <span>{isSaved ? t.savedSuccess : t.saveReport}</span>
            </button>
          )}
        </div>
      </div>

      {copyFeedback && (
        <div className="p-3 bg-emerald-100 border border-emerald-400 text-emerald-900 text-xs font-bold rounded-xl flex items-center justify-between animate-fadeIn">
          <span>{t.copiedSuccess}</span>
        </div>
      )}

      {/* 2. Mandatory Uncertainty Warning Banner */}
      <div className="p-4 sm:p-5 rounded-2xl bg-amber-50/90 border-2 border-amber-300 text-amber-950 shadow-xs flex items-start gap-3.5">
        <ShieldAlert className="w-6 h-6 text-amber-700 shrink-0 mt-0.5" />
        <div className="space-y-1">
          <h4 className="font-extrabold text-sm sm:text-base text-amber-900 flex items-center gap-2">
            <span>{t.uncertaintyWarningTitle}</span>
          </h4>
          <p className="text-xs sm:text-sm text-amber-900/90 leading-relaxed">
            {data.uncertaintyDisclaimer}
          </p>
        </div>
      </div>

      {/* 3. Primary Suspect Card & Specimen Photo Grid */}
      <div className="grid md:grid-cols-3 gap-6">
        
        {/* Left: Specimen image if available */}
        {imagePreview && (
          <div className="md:col-span-1 space-y-2">
            <span className="text-xs font-bold text-stone-500 uppercase tracking-wide">Specimen Photo Analyzed</span>
            <div className="rounded-2xl overflow-hidden border border-stone-300 bg-stone-100 aspect-4/3 relative group shadow-inner">
              <img 
                src={imagePreview} 
                alt="Analyzed crop specimen" 
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-2 left-2 right-2 bg-stone-900/80 backdrop-blur-xs text-white text-[10px] px-2 py-1 rounded-md text-center">
                Visual analysis performed by Gemini 3.8 Flash
              </div>
            </div>
            {symptoms && (
              <div className="p-3 bg-stone-50 rounded-xl border border-stone-200 text-xs text-stone-600">
                <span className="font-bold text-stone-700 block mb-0.5">Reported Symptoms:</span>
                <p className="italic">"{symptoms}"</p>
              </div>
            )}
          </div>
        )}

        {/* Right / Center: Primary Suspect Box */}
        <div className={`${imagePreview ? 'md:col-span-2' : 'md:col-span-3'} space-y-5`}>
          
          <div className="p-6 rounded-2xl bg-emerald-50/70 border border-emerald-200/90 space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span className="text-xs font-extrabold uppercase tracking-wider text-emerald-800">
                {t.suspectedCondition}
              </span>
              <div className="flex items-center gap-2">
                <span className={`px-2.5 py-1 text-xs font-bold rounded-md border ${getSeverityBadge(data.severityLevel)}`}>
                  {t.severity}: {data.severityLevel}
                </span>
                <span className="px-2.5 py-1 text-xs font-bold rounded-md bg-stone-100 text-stone-800 border border-stone-300">
                  {t.confidenceMeter}: {data.confidencePercentage}% ({data.confidenceLevel})
                </span>
              </div>
            </div>

            {/* Condition Titles in 3 Languages */}
            <div>
              <h3 className="text-2xl sm:text-3xl font-black text-stone-900">
                {data.primarySuspect}
              </h3>
              
              <div className="mt-2 grid sm:grid-cols-2 gap-3 pt-2 border-t border-emerald-200/70">
                <div className="bg-white/80 p-2.5 rounded-xl border border-emerald-100">
                  <span className="text-[10px] font-bold text-stone-400 block">اردو نام:</span>
                  <span className="text-base font-bold text-emerald-950 font-urdu">{data.localNameUrdu}</span>
                </div>
                <div className="bg-white/80 p-2.5 rounded-xl border border-emerald-100">
                  <span className="text-[10px] font-bold text-stone-400 block">سنڌي نالو:</span>
                  <span className="text-base font-bold text-emerald-950 font-sindhi">{data.localNameSindhi}</span>
                </div>
              </div>

              {data.scientificOrPathogenName && (
                <div className="mt-2 text-xs text-stone-500 italic">
                  <strong>Pathogen:</strong> {data.scientificOrPathogenName}
                </div>
              )}
            </div>

            {/* Confidence Progress Bar */}
            <div className="space-y-1">
              <div className="flex justify-between text-xs font-semibold text-stone-600">
                <span>Visual Likelihood</span>
                <span>{data.confidencePercentage}% (Uncertainty Margin: {100 - data.confidencePercentage}%)</span>
              </div>
              <div className="w-full h-2.5 rounded-full bg-stone-200 overflow-hidden">
                <div 
                  className="h-full rounded-full bg-gradient-to-r from-emerald-600 to-amber-500 transition-all duration-500" 
                  style={{ width: `${data.confidencePercentage}%` }}
                />
              </div>
            </div>

            {/* Audio Voice Read-Aloud Options for Low-Literacy Farmers */}
            <div className="pt-2 flex flex-wrap items-center gap-2">
              <button
                onClick={() => handleSpeak(data.urduSummary, 'ur-PK', 'urdu-sum')}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  isPlayingAudio === 'urdu-sum'
                    ? 'bg-amber-500 text-white animate-pulse'
                    : 'bg-white text-stone-800 hover:bg-stone-100 border border-stone-200 shadow-2xs'
                }`}
              >
                {isPlayingAudio === 'urdu-sum' ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 text-emerald-700" />}
                <span className="font-urdu">{t.listenUrdu} (آواز میں سنیں)</span>
              </button>

              <button
                onClick={() => handleSpeak(data.englishSummary, 'en-US', 'en-sum')}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  isPlayingAudio === 'en-sum'
                    ? 'bg-amber-500 text-white animate-pulse'
                    : 'bg-white text-stone-800 hover:bg-stone-100 border border-stone-200 shadow-2xs'
                }`}
              >
                {isPlayingAudio === 'en-sum' ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 text-emerald-700" />}
                <span>{t.listenEnglish}</span>
              </button>
            </div>

          </div>
        </div>
      </div>

      {/* 4. Multilingual Farmer Summaries */}
      <div className="grid md:grid-cols-2 gap-4">
        {/* Urdu Summary */}
        <div className="p-5 rounded-2xl bg-stone-50 border border-stone-200 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-emerald-800 font-urdu">اردو زرعی خلاصہ</span>
            <span className="text-[10px] text-stone-500">Urdu Advisory</span>
          </div>
          <p className="text-sm font-urdu leading-loose text-stone-800">
            {data.urduSummary}
          </p>
        </div>

        {/* Sindhi Summary */}
        <div className="p-5 rounded-2xl bg-stone-50 border border-stone-200 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-emerald-800 font-sindhi">سنڌي زرعي خلاصو</span>
            <span className="text-[10px] text-stone-500">Sindhi Advisory</span>
          </div>
          <p className="text-sm font-sindhi leading-loose text-stone-800">
            {data.sindhiSummary}
          </p>
        </div>
      </div>

      {/* 5. Visible Evidence & Alternative Causes */}
      <div className="grid md:grid-cols-2 gap-6">
        
        {/* Visible Evidence */}
        <div className="p-6 rounded-2xl bg-white border border-stone-200 shadow-2xs space-y-3">
          <h4 className="font-bold text-stone-900 text-sm flex items-center gap-2">
            <Info className="w-4 h-4 text-emerald-700" />
            <span>{t.evidenceTitle}</span>
          </h4>
          <ul className="space-y-2.5">
            {data.visibleEvidence.map((item, idx) => (
              <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-stone-700">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 mt-2 shrink-0" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Alternative Conditions */}
        <div className="p-6 rounded-2xl bg-white border border-stone-200 shadow-2xs space-y-3">
          <h4 className="font-bold text-stone-900 text-sm flex items-center gap-2">
            <HelpCircle className="w-4 h-4 text-amber-700" />
            <span>{t.alternativesTitle}</span>
          </h4>
          <div className="space-y-3">
            {data.possibleAlternatives.map((alt, idx) => (
              <div key={idx} className="p-3 rounded-xl bg-stone-50 border border-stone-200 text-xs sm:text-sm space-y-1">
                <div className="font-bold text-stone-800">{alt.condition}</div>
                <div className="text-stone-600 text-xs">
                  <span className="font-semibold text-stone-500">How to distinguish:</span> {alt.distinctionReason}
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* 6. Safe Immediate Steps (Zero toxicity) */}
      <div className="p-6 rounded-2xl bg-emerald-50/60 border border-emerald-300/80 shadow-xs space-y-4">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-emerald-700 text-white flex items-center justify-center">
            <CheckCircle2 className="w-5 h-5" />
          </div>
          <div>
            <h4 className="font-extrabold text-stone-900 text-base">
              {t.safeStepsTitle}
            </h4>
            <p className="text-xs text-stone-600">
              Low-cost, non-toxic immediate interventions that protect crops without risking pesticide poisoning.
            </p>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 gap-3 pt-2">
          {data.safeImmediateSteps.map((step, idx) => (
            <div key={idx} className="p-3.5 rounded-xl bg-white border border-emerald-200 shadow-2xs flex items-start gap-3">
              <span className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                {idx + 1}
              </span>
              <span className="text-xs sm:text-sm text-stone-800 font-medium leading-relaxed">
                {step}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* 7. Long-term Prevention & Water/Nutrient Guidelines */}
      <div className="grid md:grid-cols-2 gap-6">
        
        {/* IPM & Cultural Prevention */}
        <div className="p-6 rounded-2xl bg-white border border-stone-200 shadow-2xs space-y-3">
          <h4 className="font-bold text-stone-900 text-sm flex items-center gap-2">
            <ShieldAlert className="w-4 h-4 text-stone-700" />
            <span>{t.preventionTitle}</span>
          </h4>
          <ul className="space-y-2.5">
            {data.preventionAndManagement.map((prev, idx) => (
              <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-stone-700">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>{prev}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Water & Salinity Advice for Sindh */}
        <div className="p-6 rounded-2xl bg-stone-50 border border-stone-200 space-y-3">
          <h4 className="font-bold text-stone-900 text-sm flex items-center gap-2">
            <Droplets className="w-4 h-4 text-sky-700" />
            <span>{t.waterAdviceTitle}</span>
          </h4>
          <p className="text-xs sm:text-sm text-stone-700 leading-relaxed">
            {data.waterAndNutrientAdvice || 'Avoid standing water during humid spells. In saline Kalar soils, apply farmyard manure or gypsum before sowing to improve percolation and prevent root asphyxiation.'}
          </p>
          {data.sindhSpecificContext && (
            <div className="p-3 bg-amber-50/70 border border-amber-200 rounded-xl text-xs text-amber-900">
              <strong className="block mb-0.5">Regional Agronomic Context:</strong>
              {data.sindhSpecificContext}
            </div>
          )}
        </div>

      </div>

      {/* 8. When to Contact Agricultural Extension & Helplines */}
      <div className="p-6 rounded-2xl bg-stone-900 text-white space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-amber-500 text-stone-950 flex items-center justify-center font-bold">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-extrabold text-base text-stone-50">
                {t.whenToCallTitle}
              </h4>
              <p className="text-xs text-stone-400">
                Do not spray untested chemicals if you observe these trigger conditions:
              </p>
            </div>
          </div>

          <button
            onClick={onOpenDirectory}
            className="self-start sm:self-auto flex items-center gap-2 px-4 py-2 bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs rounded-xl transition-colors shadow-sm cursor-pointer"
          >
            <PhoneCall className="w-3.5 h-3.5" />
            <span>Call Sindh Extension Office</span>
          </button>
        </div>

        <ul className="grid sm:grid-cols-2 gap-2.5 pt-2">
          {data.whenToContactExpert.map((crit, idx) => (
            <li key={idx} className="flex items-start gap-2 text-xs sm:text-sm text-stone-300">
              <span className="text-amber-400 font-bold mt-0.5">!</span>
              <span>{crit}</span>
            </li>
          ))}
        </ul>

        <div className="pt-3 border-t border-stone-800 text-xs text-stone-400 flex flex-wrap items-center justify-between gap-2">
          <span>Official Sindh Plant Protection &amp; Extension Directorate: +92-22-9200057</span>
          <span className="text-amber-300">SAU Tandojam Crop Clinic: +92-22-2765870</span>
        </div>
      </div>

    </div>
  );
};
