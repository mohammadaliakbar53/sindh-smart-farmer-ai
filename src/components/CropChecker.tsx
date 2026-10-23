import React, { useState, useRef, useEffect } from 'react';
import { 
  Camera, 
  Upload, 
  X, 
  Sparkles, 
  AlertCircle, 
  Loader2, 
  Check, 
  Mic, 
  MicOff, 
  RefreshCw, 
  MapPin, 
  Sprout, 
  ChevronDown,
  Info
} from 'lucide-react';
import { Language, DiagnosisData, DemoSample, SavedReport } from '../types';
import { TRANSLATIONS } from '../data/translations';
import { SINDH_DISTRICTS, SINDH_CROPS, CROP_STAGES, DEMO_SAMPLES } from '../data/sindhAgriData';
import { DiagnosisResultCard } from './DiagnosisResultCard';

interface CropCheckerProps {
  currentLang: Language;
  onOpenDirectory: () => void;
  onReportSaved: (report: SavedReport) => void;
  preselectedSample?: DemoSample | null;
  onClearPreselectedSample?: () => void;
}

export const CropChecker: React.FC<CropCheckerProps> = ({
  currentLang,
  onOpenDirectory,
  onReportSaved,
  preselectedSample,
  onClearPreselectedSample,
}) => {
  const t = TRANSLATIONS[currentLang];
  const isRtl = currentLang === 'ur' || currentLang === 'sd';

  // Form states
  const [cropName, setCropName] = useState('');
  const [district, setDistrict] = useState('Sanghar (سانگھڙ)');
  const [cropStage, setCropStage] = useState('Vegetative Growth (سبز پتن واري حالت)');
  const [symptoms, setSymptoms] = useState('');
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [imageBase64, setImageBase64] = useState<string | null>(null);
  const [mimeType, setMimeType] = useState('image/jpeg');

  // Diagnostic states
  const [isLoading, setIsLoading] = useState(false);
  const [loadingStep, setLoadingStep] = useState(0);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [diagnosisResult, setDiagnosisResult] = useState<DiagnosisData | null>(null);
  const [isSaved, setIsSaved] = useState(false);

  // Voice recording
  const [isListening, setIsListening] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const resultsRef = useRef<HTMLDivElement>(null);

  // Handle preselected sample from other sections
  useEffect(() => {
    if (preselectedSample) {
      applySample(preselectedSample);
      if (onClearPreselectedSample) onClearPreselectedSample();
    }
  }, [preselectedSample]);

  // Loading steps animation
  useEffect(() => {
    let interval: any;
    if (isLoading) {
      setLoadingStep(0);
      interval = setInterval(() => {
        setLoadingStep((prev) => (prev < 3 ? prev + 1 : prev));
      }, 1600);
    } else {
      setLoadingStep(0);
    }
    return () => clearInterval(interval);
  }, [isLoading]);

  // File upload handler
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setErrorMsg('Please upload a valid image file (JPG, PNG, WEBP).');
      return;
    }

    if (file.size > 25 * 1024 * 1024) {
      setErrorMsg('Image size exceeds 25MB limit. Please upload a smaller photo.');
      return;
    }

    setErrorMsg(null);
    setMimeType(file.type);

    const reader = new FileReader();
    reader.onload = (event) => {
      const result = event.target?.result as string;
      setImagePreview(result);
      setImageBase64(result);
    };
    reader.readAsDataURL(file);
  };

  const handleClearImage = () => {
    setImagePreview(null);
    setImageBase64(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  // Quick Demo Populator
  const applySample = (sample: DemoSample) => {
    setCropName(sample.crop);
    setDistrict(sample.district);
    setCropStage(sample.stage);
    setSymptoms(sample.symptoms);
    setImagePreview(sample.imageUrl);
    setImageBase64(sample.imageUrl);
    setMimeType('image/svg+xml');
    setErrorMsg(null);
    setDiagnosisResult(null);
    setIsSaved(false);
  };

  // Speech Recognition (Voice-to-Text for symptoms)
  const handleVoiceInput = () => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert('Voice dictation is not supported in this browser. Please type symptoms manually.');
      return;
    }

    if (isListening) {
      setIsListening(false);
      return;
    }

    try {
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = currentLang === 'ur' ? 'ur-PK' : currentLang === 'sd' ? 'ur-PK' : 'en-US';

      recognition.onstart = () => setIsListening(true);
      recognition.onend = () => setIsListening(false);
      recognition.onerror = () => setIsListening(false);

      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setSymptoms((prev) => (prev ? `${prev} ${transcript}` : transcript));
      };

      recognition.start();
    } catch (err) {
      setIsListening(false);
    }
  };

  // Submit Analysis to Server-Side Gemini API
  const handleAnalyze = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();

    if (!cropName && !symptoms && !imageBase64) {
      setErrorMsg('Please select a crop or upload a plant photo to begin diagnosis.');
      return;
    }

    setIsLoading(true);
    setErrorMsg(null);
    setDiagnosisResult(null);
    setIsSaved(false);

    try {
      const response = await fetch('/api/crop-analysis', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          cropName,
          location: district,
          symptoms,
          cropStage,
          imageBase64: imageBase64 || undefined,
          mimeType,
          language: currentLang,
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.error || 'Diagnostic evaluation failed.');
      }

      setDiagnosisResult(data.data);

      // Scroll to results
      setTimeout(() => {
        resultsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);

    } catch (err: any) {
      console.error(err);
      setErrorMsg(err.message || 'Unable to analyze image. Please ensure connection is active and try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Save report to localStorage and notify parent
  const handleSaveReport = () => {
    if (!diagnosisResult) return;

    const newReport: SavedReport = {
      id: `rep_${Date.now()}`,
      timestamp: new Date().toISOString(),
      cropName: cropName || diagnosisResult.primarySuspect,
      location: district,
      cropStage,
      symptoms,
      imagePreview: imagePreview || undefined,
      data: diagnosisResult,
    };

    onReportSaved(newReport);
    setIsSaved(true);
  };

  const loadingStepsTexts = [
    t.analyzingStep1,
    t.analyzingStep2,
    t.analyzingStep3,
    t.analyzingStep4,
  ];

  return (
    <div className={`space-y-8 ${isRtl ? 'rtl' : 'ltr'}`}>
      
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-900 text-xs font-bold">
          <Sprout className="w-3.5 h-3.5" />
          <span>Multimodal Gemini 3.8 Flash Plant Pathology</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-black text-stone-900 tracking-tight">
          {t.checkerTitle}
        </h2>
        <p className="text-sm text-stone-600">
          {t.checkerSubtitle}
        </p>
      </div>

      {/* Instant Demo Quick Select Bar for Judges */}
      <div className="p-4 rounded-2xl bg-amber-50/80 border border-amber-200/90 shadow-2xs space-y-2.5">
        <div className="flex items-center justify-between">
          <span className="text-xs font-extrabold text-amber-950 flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-amber-600" />
            <span>{t.loadSamplePrompt}</span>
          </span>
          <span className="text-[11px] text-amber-800/80 hidden sm:inline">1-Click Test for Sindh Field Specimens</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {DEMO_SAMPLES.slice(0, 4).map((sample) => (
            <button
              key={sample.id}
              type="button"
              onClick={() => applySample(sample)}
              className="p-2.5 rounded-xl bg-white hover:bg-amber-100/60 border border-amber-200 text-left transition-all text-xs font-semibold text-stone-800 shadow-2xs flex flex-col justify-between group cursor-pointer"
            >
              <div className="font-bold text-stone-900 group-hover:text-emerald-900 truncate">
                {sample.crop.split('(')[0]}
              </div>
              <div className="text-[11px] text-stone-500 truncate mt-0.5">
                {sample.district.split('(')[0]} • {sample.title.split(' ')[0]}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Main Diagnostic Input Card */}
      <form onSubmit={handleAnalyze} className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-sm space-y-6">
        
        {/* Error Alert */}
        {errorMsg && (
          <div className="p-4 rounded-2xl bg-red-50 border border-red-300 text-red-900 text-xs sm:text-sm flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
            <div className="flex-1">
              <span className="font-bold block">Validation Error</span>
              <span>{errorMsg}</span>
            </div>
            <button type="button" onClick={() => setErrorMsg(null)} className="text-red-500 hover:text-red-700">
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

        <div className="grid lg:grid-cols-12 gap-8">
          
          {/* Left Column: Image Upload Area (5 cols) */}
          <div className="lg:col-span-5 space-y-3">
            <label className="block text-xs font-extrabold uppercase tracking-wider text-stone-700">
              {t.uploadPhoto}
            </label>

            <div className="relative">
              {imagePreview ? (
                <div className="rounded-2xl overflow-hidden border-2 border-emerald-500/80 bg-stone-100 aspect-4/3 relative group shadow-sm">
                  <img
                    src={imagePreview}
                    alt="Uploaded plant specimen"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-stone-950/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="px-3 py-1.5 bg-white text-stone-900 font-bold text-xs rounded-lg shadow-sm hover:bg-stone-100"
                    >
                      {t.changePhoto}
                    </button>
                    <button
                      type="button"
                      onClick={handleClearImage}
                      className="px-3 py-1.5 bg-red-600 text-white font-bold text-xs rounded-lg shadow-sm hover:bg-red-700"
                    >
                      {t.removePhoto}
                    </button>
                  </div>
                </div>
              ) : (
                <div
                  onClick={() => fileInputRef.current?.click()}
                  className="rounded-2xl border-2 border-dashed border-stone-300 hover:border-emerald-600 bg-stone-50/80 hover:bg-emerald-50/30 p-8 text-center cursor-pointer transition-colors aspect-4/3 flex flex-col items-center justify-center gap-3 group"
                >
                  <div className="w-14 h-14 rounded-2xl bg-white group-hover:bg-emerald-100 border border-stone-200 flex items-center justify-center text-stone-600 group-hover:text-emerald-800 transition-colors shadow-2xs">
                    <Camera className="w-7 h-7" />
                  </div>
                  <div>
                    <span className="text-sm font-bold text-stone-800 block">
                      Click to Browse or Take Photo
                    </span>
                    <span className="text-xs text-stone-500 mt-1 block">
                      {t.uploadPhotoHint}
                    </span>
                  </div>
                </div>
              )}

              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                capture="environment"
                onChange={handleFileChange}
                className="hidden"
              />
            </div>

            <div className="text-[11px] text-stone-500 flex items-start gap-1.5">
              <Info className="w-3.5 h-3.5 shrink-0 text-stone-400 mt-0.5" />
              <span>
                Tip: Capture close-ups of both upper and lower leaf surfaces, or lesions on fruit and stems in natural daylight.
              </span>
            </div>
          </div>

          {/* Right Column: Fields (7 cols) */}
          <div className="lg:col-span-7 space-y-5">
            
            {/* Quick Sindh Crop Selector */}
            <div className="space-y-2">
              <label className="block text-xs font-extrabold uppercase tracking-wider text-stone-700">
                {t.labelCrop}
              </label>

              <div className="flex flex-wrap gap-1.5">
                {SINDH_CROPS.map((c) => {
                  const isSelected = cropName.includes(c.id) || cropName === c.name;
                  return (
                    <button
                      key={c.id}
                      type="button"
                      onClick={() => setCropName(c.name)}
                      className={`px-3 py-1.5 text-xs font-semibold rounded-lg border transition-all ${
                        isSelected
                          ? 'bg-emerald-800 text-white border-emerald-900 shadow-2xs font-bold'
                          : 'bg-stone-50 hover:bg-stone-100 text-stone-700 border-stone-200'
                      }`}
                    >
                      {c.name.split('/')[0]}
                    </button>
                  );
                })}
              </div>

              <input
                type="text"
                value={cropName}
                onChange={(e) => setCropName(e.target.value)}
                placeholder={t.selectCropPrompt}
                className="w-full mt-1.5 px-3.5 py-2.5 rounded-xl border border-stone-300 focus:outline-hidden focus:ring-2 focus:ring-emerald-700 text-sm font-medium"
              />
            </div>

            {/* District & Growth Stage Grid */}
            <div className="grid sm:grid-cols-2 gap-4">
              
              {/* District */}
              <div className="space-y-1.5">
                <label className="block text-xs font-extrabold uppercase tracking-wider text-stone-700">
                  {t.labelDistrict}
                </label>
                <div className="relative">
                  <select
                    value={district}
                    onChange={(e) => setDistrict(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 bg-white focus:outline-hidden focus:ring-2 focus:ring-emerald-700 text-xs sm:text-sm font-medium appearance-none"
                  >
                    {SINDH_DISTRICTS.map((d) => (
                      <option key={d} value={d}>{d}</option>
                    ))}
                  </select>
                  <ChevronDown className="w-4 h-4 text-stone-400 absolute right-3 top-3.5 pointer-events-none" />
                </div>
              </div>

              {/* Growth Stage */}
              <div className="space-y-1.5">
                <label className="block text-xs font-extrabold uppercase tracking-wider text-stone-700">
                  {t.labelStage}
                </label>
                <div className="relative">
                  <select
                    value={cropStage}
                    onChange={(e) => setCropStage(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 bg-white focus:outline-hidden focus:ring-2 focus:ring-emerald-700 text-xs sm:text-sm font-medium appearance-none"
                  >
                    {CROP_STAGES.map((s) => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                  <ChevronDown className="w-4 h-4 text-stone-400 absolute right-3 top-3.5 pointer-events-none" />
                </div>
              </div>

            </div>

            {/* Symptoms Description with Voice Input */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="block text-xs font-extrabold uppercase tracking-wider text-stone-700">
                  {t.labelSymptoms}
                </label>
                <button
                  type="button"
                  onClick={handleVoiceInput}
                  className={`flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold rounded-md border transition-colors ${
                    isListening
                      ? 'bg-red-500 text-white border-red-600 animate-pulse'
                      : 'bg-stone-100 hover:bg-stone-200 text-stone-700 border-stone-300'
                  }`}
                  title="Speak symptoms using microphone"
                >
                  {isListening ? <MicOff className="w-3.5 h-3.5" /> : <Mic className="w-3.5 h-3.5 text-emerald-700" />}
                  <span>{isListening ? 'Listening...' : 'Voice Dictation'}</span>
                </button>
              </div>

              <textarea
                rows={3}
                value={symptoms}
                onChange={(e) => setSymptoms(e.target.value)}
                placeholder={t.symptomsPlaceholder}
                className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 focus:outline-hidden focus:ring-2 focus:ring-emerald-700 text-xs sm:text-sm font-medium leading-relaxed resize-none"
              />
            </div>

            {/* Submit CTA */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={isLoading}
                className={`w-full py-4 px-6 rounded-xl font-bold text-base shadow-md transition-all flex items-center justify-center gap-3 cursor-pointer ${
                  isLoading
                    ? 'bg-emerald-900 text-white opacity-90'
                    : 'bg-emerald-800 hover:bg-emerald-700 text-white hover:shadow-lg'
                }`}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin text-emerald-300" />
                    <span>{t.btnAnalyzing}</span>
                  </>
                ) : (
                  <>
                    <Sprout className="w-5 h-5 text-emerald-300" />
                    <span>{t.btnAnalyze}</span>
                  </>
                )}
              </button>
            </div>

          </div>

        </div>

        {/* Live Loading Stepper */}
        {isLoading && (
          <div className="mt-4 p-5 rounded-2xl bg-emerald-950 text-white space-y-3 animate-fadeIn">
            <div className="flex items-center justify-between text-xs font-bold text-emerald-300">
              <span className="flex items-center gap-2">
                <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                <span>AI Agronomy Pipeline</span>
              </span>
              <span>Step {loadingStep + 1} of 4</span>
            </div>
            
            <p className="text-sm font-medium text-emerald-100">
              {loadingStepsTexts[loadingStep]}
            </p>

            <div className="grid grid-cols-4 gap-2 pt-1">
              {[0, 1, 2, 3].map((idx) => (
                <div
                  key={idx}
                  className={`h-1.5 rounded-full transition-colors duration-300 ${
                    idx <= loadingStep ? 'bg-amber-400' : 'bg-emerald-800'
                  }`}
                />
              ))}
            </div>
          </div>
        )}

      </form>

      {/* Diagnosis Results Card Target */}
      <div ref={resultsRef}>
        {diagnosisResult && (
          <DiagnosisResultCard
            data={diagnosisResult}
            cropName={cropName}
            district={district}
            cropStage={cropStage}
            symptoms={symptoms}
            imagePreview={imagePreview || undefined}
            currentLang={currentLang}
            onSaveReport={handleSaveReport}
            isSaved={isSaved}
            onOpenDirectory={onOpenDirectory}
          />
        )}
      </div>

    </div>
  );
};
