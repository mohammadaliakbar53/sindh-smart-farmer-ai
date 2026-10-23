import React, { useState } from 'react';
import { FileText, Trash2, Calendar, MapPin, Eye, ChevronRight, AlertCircle, Share2 } from 'lucide-react';
import { SavedReport, Language } from '../types';
import { TRANSLATIONS } from '../data/translations';
import { DiagnosisResultCard } from './DiagnosisResultCard';

interface SavedReportsViewProps {
  reports: SavedReport[];
  currentLang: Language;
  onDeleteReport: (id: string) => void;
  onClearAll: () => void;
  onOpenDirectory: () => void;
  onNavigateChecker: () => void;
}

export const SavedReportsView: React.FC<SavedReportsViewProps> = ({
  reports,
  currentLang,
  onDeleteReport,
  onClearAll,
  onOpenDirectory,
  onNavigateChecker,
}) => {
  const t = TRANSLATIONS[currentLang];
  const isRtl = currentLang === 'ur' || currentLang === 'sd';
  const [selectedReport, setSelectedReport] = useState<SavedReport | null>(
    reports.length > 0 ? reports[0] : null
  );

  if (reports.length === 0) {
    return (
      <div className={`text-center py-16 bg-white rounded-3xl border border-stone-200/90 p-8 shadow-xs space-y-4 ${isRtl ? 'rtl' : 'ltr'}`}>
        <div className="w-16 h-16 rounded-2xl bg-stone-100 text-stone-500 mx-auto flex items-center justify-center">
          <FileText className="w-8 h-8" />
        </div>
        <h3 className="text-xl font-bold text-stone-900">{t.noReportsTitle}</h3>
        <p className="text-sm text-stone-500 max-w-md mx-auto">
          {t.noReportsDesc}
        </p>
        <button
          onClick={onNavigateChecker}
          className="mt-2 px-5 py-2.5 rounded-xl bg-emerald-800 text-white font-bold text-xs hover:bg-emerald-700 transition-colors shadow-2xs"
        >
          {t.heroBtnScan}
        </button>
      </div>
    );
  }

  return (
    <div className={`space-y-8 ${isRtl ? 'rtl' : 'ltr'}`}>
      
      {/* Header with clear all button */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-black text-stone-900">
            {t.navReports} ({reports.length})
          </h2>
          <p className="text-xs sm:text-sm text-stone-600">
            Past diagnostic evaluations and farm treatment plans.
          </p>
        </div>

        <button
          onClick={onClearAll}
          className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg text-red-600 hover:text-red-700 hover:bg-red-50 border border-red-200 self-start sm:self-auto transition-colors"
        >
          <Trash2 className="w-3.5 h-3.5" />
          <span>{t.clearAllReports}</span>
        </button>
      </div>

      {/* Reports List & Active Report Split View */}
      <div className="grid lg:grid-cols-12 gap-8">
        
        {/* Left: Reports Scroll List (4 cols) */}
        <div className="lg:col-span-4 space-y-3">
          <span className="text-xs font-bold text-stone-500 uppercase tracking-wide block">
            Saved Farm History
          </span>

          <div className="space-y-2.5 max-h-[640px] overflow-y-auto pr-1">
            {reports.map((report) => {
              const isSelected = selectedReport?.id === report.id;
              return (
                <div
                  key={report.id}
                  onClick={() => setSelectedReport(report)}
                  className={`p-4 rounded-2xl border transition-all cursor-pointer relative group ${
                    isSelected
                      ? 'bg-emerald-50/80 border-emerald-500 shadow-2xs'
                      : 'bg-white hover:bg-stone-50 border-stone-200'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h4 className="font-extrabold text-sm text-stone-900 group-hover:text-emerald-950">
                        {report.cropName}
                      </h4>
                      <p className="text-xs text-emerald-800 font-semibold mt-0.5">
                        {report.data.primarySuspect}
                      </p>
                    </div>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onDeleteReport(report.id);
                        if (selectedReport?.id === report.id) {
                          setSelectedReport(null);
                        }
                      }}
                      className="text-stone-400 hover:text-red-600 p-1 rounded-md transition-colors"
                      title="Delete report"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div className="flex items-center gap-2 mt-3 text-[11px] text-stone-500">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-stone-400" />
                      {report.location.split('(')[0]}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3 text-stone-400" />
                      {new Date(report.timestamp).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right: Selected Report Details (8 cols) */}
        <div className="lg:col-span-8">
          {selectedReport ? (
            <DiagnosisResultCard
              data={selectedReport.data}
              cropName={selectedReport.cropName}
              district={selectedReport.location}
              cropStage={selectedReport.cropStage}
              symptoms={selectedReport.symptoms}
              imagePreview={selectedReport.imagePreview}
              currentLang={currentLang}
              onOpenDirectory={onOpenDirectory}
            />
          ) : (
            <div className="bg-white rounded-3xl p-12 text-center border border-stone-200 text-stone-500">
              Select a report from the list to view full agronomic details.
            </div>
          )}
        </div>

      </div>

    </div>
  );
};
