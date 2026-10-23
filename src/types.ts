export type Language = 'en' | 'ur' | 'sd';

export interface AlternativeCause {
  condition: string;
  distinctionReason: string;
}

export interface DiagnosisData {
  primarySuspect: string;
  localNameUrdu: string;
  localNameSindhi: string;
  scientificOrPathogenName?: string;
  confidenceLevel: 'Low' | 'Moderate' | 'Moderate-High';
  confidencePercentage: number;
  uncertaintyDisclaimer: string;
  visibleEvidence: string[];
  possibleAlternatives: AlternativeCause[];
  severityLevel: 'Mild' | 'Moderate' | 'Severe / Urgent';
  safeImmediateSteps: string[];
  preventionAndManagement: string[];
  waterAndNutrientAdvice?: string;
  whenToContactExpert: string[];
  sindhSpecificContext?: string;
  englishSummary: string;
  urduSummary: string;
  sindhiSummary: string;
}

export interface SavedReport {
  id: string;
  timestamp: string;
  cropName: string;
  location: string;
  cropStage: string;
  symptoms: string;
  imagePreview?: string;
  data: DiagnosisData;
}

export interface DemoSample {
  id: string;
  title: string;
  titleUrdu: string;
  titleSindhi: string;
  crop: string;
  cropUrdu: string;
  district: string;
  stage: string;
  symptoms: string;
  imageUrl: string;
  badge: string;
  description: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
  language?: Language;
}

export interface ExtensionContact {
  institution: string;
  institutionUrdu: string;
  city: string;
  role: string;
  phone: string;
  scope: string;
}
