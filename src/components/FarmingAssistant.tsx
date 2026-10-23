import React, { useState, useRef, useEffect } from 'react';
import { 
  Bot, 
  Send, 
  User, 
  Loader2, 
  Volume2, 
  VolumeX, 
  Sparkles, 
  HelpCircle, 
  Sprout, 
  AlertCircle,
  Copy,
  Check,
  RefreshCw
} from 'lucide-react';
import { Language, ChatMessage } from '../types';
import { TRANSLATIONS } from '../data/translations';
import { SUGGESTED_QUESTIONS, SINDH_DISTRICTS } from '../data/sindhAgriData';

interface FarmingAssistantProps {
  currentLang: Language;
}

export const FarmingAssistant: React.FC<FarmingAssistantProps> = ({ currentLang }) => {
  const t = TRANSLATIONS[currentLang];
  const isRtl = currentLang === 'ur' || currentLang === 'sd';

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome-msg',
      role: 'assistant',
      content: currentLang === 'sd'
        ? 'ڀلي ڪري آيا! مان سنڌ اسمارٽ فارمر اي آءِ آهيان. توهان سنڌ جي فصلن (ڦٽيون، ساريون، ڪڻڪ، ڪمند، انب، مرچ وغيره)، ڪئنال جي پاڻي، ڪلر يا ٻوٽن جي بيمارين بابت پنهنجي سنڌي، اردو يا انگريزي ٻوليءَ ۾ پڇي سگهو ٿا.'
        : currentLang === 'ur'
        ? 'خوش آمدید! میں سندھ اسمارٹ فارمر اے آئی ہوں۔ آپ مجھ سے کپاس، چاول، گندم، آم، گنا اور مرچ کی بیماریوں، نہری پانی (وارہ بندی)، یا کھاد کے استعمال سے متعلق اردو، سندھی یا انگریزی میں بلا جھجھک سوال پوچھ سکتے ہیں۔'
        : 'Welcome! I am your Sindh Smart Farmer AI companion. Ask me any question regarding cotton, rice, wheat, mango, canal irrigation (Warabandi), salinity (Kalar), or safe pest control in English, Urdu (اردو), or Sindhi (سنڌي).',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      language: currentLang,
    },
  ]);

  const [input, setInput] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState('Sanghar (سانگھڙ)');
  const [isLoading, setIsLoading] = useState(false);
  const [activeSpeechId, setActiveSpeechId] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  // Audio Speech Reader
  const handleReadAloud = (text: string, id: string) => {
    if (!('speechSynthesis' in window)) {
      alert('Text to speech is not supported in this browser.');
      return;
    }

    if (activeSpeechId === id) {
      window.speechSynthesis.cancel();
      setActiveSpeechId(null);
      return;
    }

    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = currentLang === 'ur' ? 'ur-PK' : currentLang === 'sd' ? 'ur-PK' : 'en-US';
    utterance.rate = 0.95;

    utterance.onend = () => setActiveSpeechId(null);
    utterance.onerror = () => setActiveSpeechId(null);

    setActiveSpeechId(id);
    window.speechSynthesis.speak(utterance);
  };

  const handleCopyMessage = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleSend = async (questionText?: string) => {
    const textToSend = questionText || input.trim();
    if (!textToSend || isLoading) return;

    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      language: currentLang,
    };

    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat-assistant', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: newMessages.map((m) => ({ role: m.role, content: m.content })),
          language: currentLang,
          district: selectedDistrict,
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.error || 'Failed to get answer.');
      }

      const botMessage: ChatMessage = {
        id: `bot-${Date.now()}`,
        role: 'assistant',
        content: data.reply,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        language: currentLang,
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch (error: any) {
      console.error(error);
      const errorBotMessage: ChatMessage = {
        id: `bot-err-${Date.now()}`,
        role: 'assistant',
        content: currentLang === 'sd'
          ? 'معاف ڪجو، رابطو نٿو ٿي سگهي. مهرباني ڪري ٿوري دير کان پوءِ ٻيهر ڪوشش ڪريو.'
          : currentLang === 'ur'
          ? 'معذرت، رابطہ نہیں ہو سکا۔ برائے مہربانی اپنا سوال دوبارہ بھیجیں۔'
          : 'I am temporarily unable to connect. Please check your connection and ask again.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, errorBotMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={`space-y-6 ${isRtl ? 'rtl' : 'ltr'}`}>
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-white p-6 rounded-3xl border border-stone-200 shadow-xs">
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-2xl bg-emerald-800 text-white flex items-center justify-center shadow-md">
            <Bot className="w-7 h-7 text-emerald-300" />
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-stone-900">
              {t.assistantTitle}
            </h2>
            <p className="text-xs sm:text-sm text-stone-600">
              {t.assistantSubtitle}
            </p>
          </div>
        </div>

        {/* District context selector */}
        <div className="flex items-center gap-2 self-start sm:self-auto">
          <span className="text-xs font-bold text-stone-500 whitespace-nowrap">My Region:</span>
          <select
            value={selectedDistrict}
            onChange={(e) => setSelectedDistrict(e.target.value)}
            className="px-3 py-1.5 text-xs font-semibold rounded-xl bg-stone-100 border border-stone-300 text-stone-800 focus:outline-hidden focus:ring-2 focus:ring-emerald-700"
          >
            {SINDH_DISTRICTS.map((d) => (
              <option key={d} value={d}>{d}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Suggested Quick Question Prompts */}
      <div className="bg-emerald-50/70 p-4 rounded-2xl border border-emerald-200/80 space-y-2.5">
        <div className="flex items-center justify-between text-xs font-bold text-emerald-950">
          <span className="flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-emerald-700" />
            <span>{t.quickQuestions}</span>
          </span>
          <span className="text-[11px] text-emerald-800 font-normal">Click any prompt to ask:</span>
        </div>

        <div className="grid sm:grid-cols-2 gap-2">
          {SUGGESTED_QUESTIONS.map((q, idx) => {
            const promptText = currentLang === 'sd' ? q.sd : currentLang === 'ur' ? q.ur : q.en;
            return (
              <button
                key={idx}
                onClick={() => handleSend(promptText)}
                className="p-2.5 rounded-xl bg-white hover:bg-emerald-100/60 border border-emerald-200 text-left text-xs font-semibold text-stone-800 transition-colors shadow-2xs flex items-center justify-between group cursor-pointer"
              >
                <span className={`line-clamp-2 ${isRtl ? 'font-urdu' : ''}`}>{promptText}</span>
                <span className="text-emerald-700 group-hover:translate-x-1 transition-transform ml-2 shrink-0">→</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Chat Conversation Box */}
      <div className="bg-white rounded-3xl border border-stone-200 shadow-sm overflow-hidden flex flex-col h-[520px]">
        
        {/* Messages Scroll Area */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
          {messages.map((msg) => {
            const isUser = msg.role === 'user';
            return (
              <div
                key={msg.id}
                className={`flex gap-3 ${isUser ? 'justify-end' : 'justify-start'}`}
              >
                {!isUser && (
                  <div className="w-8 h-8 rounded-full bg-emerald-800 text-emerald-300 flex items-center justify-center shrink-0 mt-1 shadow-2xs">
                    <Bot className="w-4 h-4" />
                  </div>
                )}

                <div className={`max-w-[85%] sm:max-w-[75%] space-y-1.5`}>
                  <div
                    className={`p-4 rounded-2xl text-xs sm:text-sm leading-relaxed ${
                      isUser
                        ? 'bg-emerald-800 text-white rounded-br-xs font-medium'
                        : 'bg-stone-100 text-stone-900 rounded-bl-xs border border-stone-200/80 shadow-2xs'
                    } ${isRtl ? 'font-urdu' : ''}`}
                  >
                    <p className="whitespace-pre-line">{msg.content}</p>
                  </div>

                  {/* Actions for Assistant replies */}
                  <div className={`flex items-center gap-2 text-[10px] text-stone-400 ${isUser ? 'justify-end' : 'justify-start'}`}>
                    <span>{msg.timestamp}</span>

                    {!isUser && (
                      <>
                        <button
                          onClick={() => handleReadAloud(msg.content, msg.id)}
                          className="hover:text-emerald-700 flex items-center gap-1 font-semibold ml-2 cursor-pointer"
                          title="Read out aloud"
                        >
                          {activeSpeechId === msg.id ? (
                            <>
                              <VolumeX className="w-3.5 h-3.5 text-amber-600" />
                              <span className="text-amber-600">Stop Voice</span>
                            </>
                          ) : (
                            <>
                              <Volume2 className="w-3.5 h-3.5" />
                              <span>Listen (سنیں)</span>
                            </>
                          )}
                        </button>

                        <button
                          onClick={() => handleCopyMessage(msg.content, msg.id)}
                          className="hover:text-emerald-700 flex items-center gap-1 font-semibold ml-2 cursor-pointer"
                          title="Copy text"
                        >
                          {copiedId === msg.id ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                          <span>{copiedId === msg.id ? 'Copied' : 'Copy'}</span>
                        </button>
                      </>
                    )}
                  </div>
                </div>

                {isUser && (
                  <div className="w-8 h-8 rounded-full bg-stone-700 text-white flex items-center justify-center shrink-0 mt-1 shadow-2xs">
                    <User className="w-4 h-4" />
                  </div>
                )}
              </div>
            );
          })}

          {/* Assistant Typing Indicator */}
          {isLoading && (
            <div className="flex gap-3 justify-start">
              <div className="w-8 h-8 rounded-full bg-emerald-800 text-emerald-300 flex items-center justify-center shrink-0 shadow-2xs">
                <Bot className="w-4 h-4" />
              </div>
              <div className="p-4 rounded-2xl rounded-bl-xs bg-stone-100 border border-stone-200 text-xs sm:text-sm text-stone-600 flex items-center gap-2">
                <Loader2 className="w-4 h-4 animate-spin text-emerald-700" />
                <span>Consulting Sindh agronomic repository...</span>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input Bar */}
        <div className="p-3 sm:p-4 border-t border-stone-200 bg-stone-50">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="flex items-center gap-2"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={t.chatPlaceholder}
              disabled={isLoading}
              className={`flex-1 px-4 py-3 rounded-xl border border-stone-300 bg-white focus:outline-hidden focus:ring-2 focus:ring-emerald-700 text-xs sm:text-sm ${
                isRtl ? 'font-urdu' : ''
              }`}
            />

            <button
              type="submit"
              disabled={!input.trim() || isLoading}
              className="px-5 py-3 rounded-xl bg-emerald-800 hover:bg-emerald-700 disabled:opacity-50 text-white font-bold text-xs sm:text-sm shadow-xs flex items-center gap-2 cursor-pointer transition-colors"
            >
              <span>{t.btnSend}</span>
              <Send className="w-4 h-4" />
            </button>
          </form>

          <p className="text-[10px] text-stone-500 text-center mt-2">
            {t.disclaimerBanner}
          </p>
        </div>

      </div>

    </div>
  );
};
