import React, { useState, useRef, useEffect } from 'react';
import { 
  Calculator,
  Atom,
  FlaskConical,
  Dna,
  Laptop,
  Languages,
  FileText,
  School,
  BookOpen,
  Target,
  Compass,
  Send, 
  Volume2, 
  VolumeX, 
  Copy, 
  Check, 
  RefreshCw, 
  ThumbsUp, 
  ThumbsDown, 
  Brain, 
  Plus,
  Key,
  X,
  ExternalLink,
  Eye,
  EyeOff,
  CheckCircle2,
  Trash2,
  ChevronDown,
  ChevronUp,
  Settings,
  User,
  Sparkles,
  ShieldCheck,
  Zap,
  Paperclip,
  Image as ImageIcon
} from 'lucide-react';
import { ACADEMIC_SUBJECTS } from '../data/aiProfessorData';
import { TwentyQuestionQuizSuite } from './TwentyQuestionQuizSuite';
import { GeminiMarkdownRenderer } from './GeminiMarkdownRenderer';
import { askGeminiAI } from '../data/geminiEngine';

// Official Google Gemini 4-Point Star Icon
export function GeminiSparkleIcon({ size = 24, className = '' }) {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={{ flexShrink: 0 }}
    >
      <path 
        d="M12 2C12 7.52285 7.52285 12 2 12C7.52285 12 12 16.4771 12 22C12 16.4771 16.4771 12 22 12C16.4771 12 12 7.52285 12 2Z" 
        fill="url(#gemini-sparkle-gradient)" 
      />
      <defs>
        <linearGradient id="gemini-sparkle-gradient" x1="2" y1="2" x2="22" y2="22" gradientUnits="userSpaceOnUse">
          <stop stopColor="#4285F4" />
          <stop offset="0.35" stopColor="#9B72CB" />
          <stop offset="0.75" stopColor="#D96570" />
          <stop offset="1" stopColor="#1BA1E2" />
        </linearGradient>
      </defs>
    </svg>
  );
}

const SUBJECT_ICONS = {
  all: BookOpen,
  math: Calculator,
  physics: Atom,
  chemistry: FlaskConical,
  biology: Dna,
  ict: Laptop,
  english: Languages,
  bangla: FileText,
  school: School
};

export function AIProfessorSection() {
  const [selectedSubject, setSelectedSubject] = useState('all');
  const [queryInput, setQueryInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [copiedId, setCopiedId] = useState(null);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [likedMessages, setLikedMessages] = useState({});
  const [dislikedMessages, setDislikedMessages] = useState({});
  const [lastUserPrompt, setLastUserPrompt] = useState('');
  
  // Multimodal Attachment State (Image / PDF)
  const [attachment, setAttachment] = useState(null);
  const fileInputRef = useRef(null);

  const handleFileSelect = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 20 * 1024 * 1024) {
      alert('ফাইলের আকার সর্বোচ্চ ২০ মেগাবাইট (20MB) হতে পারে।');
      if (fileInputRef.current) fileInputRef.current.value = '';
      return;
    }

    const isImage = file.type.startsWith('image/');
    const isPdf = file.type === 'application/pdf' || file.name.toLowerCase().endsWith('.pdf');
    const fileType = isImage ? 'image' : (isPdf ? 'pdf' : 'document');

    const reader = new FileReader();
    reader.onload = (loadEvt) => {
      setAttachment({
        name: file.name,
        size: file.size,
        type: file.type || (isPdf ? 'application/pdf' : 'image/jpeg'),
        fileType,
        dataUrl: loadEvt.target.result
      });
      if (fileInputRef.current) fileInputRef.current.value = '';
    };
    reader.onerror = () => {
      alert('ফাইলটি পড়তে সমস্যা হয়েছে। অন্য ফাইল চেষ্টা করুন।');
      if (fileInputRef.current) fileInputRef.current.value = '';
    };
    reader.readAsDataURL(file);
  };

  const handleRemoveAttachment = () => {
    setAttachment(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const formatFileSize = (bytes) => {
    if (!bytes) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
  };

  // Optional Gemini API Key modal
  const [isApiKeyModalOpen, setIsApiKeyModalOpen] = useState(false);
  const [showApiKey, setShowApiKey] = useState(false);
  const [showAdvancedSettings, setShowAdvancedSettings] = useState(false);
  const [geminiApiKeyInput, setGeminiApiKeyInput] = useState(() => {
    return (typeof window !== 'undefined' && localStorage.getItem('gemini_api_key')) || '';
  });
  const [apiKeySaved, setApiKeySaved] = useState(false);

  const handleClearApiKey = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('gemini_api_key');
      setGeminiApiKeyInput('');
    }
  };

  const chatScrollRef = useRef(null);
  const synthRef = useRef(null);
  const activeIntervalRef = useRef(null);

  // Gemini greeting & conversation state
  const [messages, setMessages] = useState([]);

  // Auto scroll down smoothly on message update
  useEffect(() => {
    if (chatScrollRef.current) {
      chatScrollRef.current.scrollTop = chatScrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  // Speech synthesis setup
  useEffect(() => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      synthRef.current = window.speechSynthesis;
    }
    return () => {
      if (synthRef.current) synthRef.current.cancel();
      if (activeIntervalRef.current) clearInterval(activeIntervalRef.current);
    };
  }, []);

  const handleSpeak = (text) => {
    if (!synthRef.current) return;
    if (isSpeaking) {
      synthRef.current.cancel();
      setIsSpeaking(false);
      return;
    }
    synthRef.current.cancel();
    const cleanText = text.replace(/[*#`_]/g, '');
    const utterance = new SpeechSynthesisUtterance(cleanText);
    const voices = synthRef.current.getVoices();
    const bnVoice = voices.find(v => v.lang.includes('bn') || v.name.includes('Bangla'));
    if (bnVoice) utterance.voice = bnVoice;
    utterance.rate = 0.95;
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);
    setIsSpeaking(true);
    synthRef.current.speak(utterance);
  };

  const handleCopy = (id, text) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleToggleLike = (id) => {
    setLikedMessages(prev => ({ ...prev, [id]: !prev[id] }));
    setDislikedMessages(prev => ({ ...prev, [id]: false }));
  };

  const handleToggleDislike = (id) => {
    setDislikedMessages(prev => ({ ...prev, [id]: !prev[id] }));
    setLikedMessages(prev => ({ ...prev, [id]: false }));
  };

  const handleSaveApiKey = () => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('gemini_api_key', geminiApiKeyInput.trim());
      setApiKeySaved(true);
      setTimeout(() => {
        setApiKeySaved(false);
        setIsApiKeyModalOpen(false);
      }, 1200);
    }
  };

  // Main Gemini Send Handler with Typewriter Streaming Effect
  const handleSend = async (forcedText = null, overrideMode = null) => {
    const text = (forcedText || queryInput).trim();
    const currentAttachment = attachment;
    if (!text && !currentAttachment) return;

    const userMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      content: text,
      attachment: currentAttachment,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMessage]);
    setLastUserPrompt(text);
    if (!forcedText) setQueryInput('');
    setAttachment(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
    setIsTyping(true);

    try {
      const botResponse = await askGeminiAI(text, selectedSubject, overrideMode || 'concept', currentAttachment, messages);
      setIsTyping(false);

      if (botResponse.type === 'quiz_set_20') {
        const quizMsg = {
          id: `gemini-${Date.now()}`,
          sender: 'gemini',
          promptOrigin: text,
          ...botResponse,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
        setMessages(prev => [...prev, quizMsg]);
      } else {
        // Typewriter streaming word-by-word
        const msgId = `gemini-${Date.now()}`;
        const fullContent = botResponse.content;

        setMessages(prev => [
          ...prev,
          {
            id: msgId,
            sender: 'gemini',
            promptOrigin: text,
            title: botResponse.title,
            content: '',
            isStreaming: true,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
          }
        ]);

        const words = fullContent.split(' ');
        let currentWordIdx = 0;
        let accumulated = '';

        if (activeIntervalRef.current) clearInterval(activeIntervalRef.current);

        activeIntervalRef.current = setInterval(() => {
          if (currentWordIdx < words.length) {
            accumulated += (currentWordIdx === 0 ? '' : ' ') + words[currentWordIdx];
            currentWordIdx++;
            setMessages(prev => prev.map(m => m.id === msgId ? { ...m, content: accumulated } : m));
          } else {
            clearInterval(activeIntervalRef.current);
            activeIntervalRef.current = null;
            setMessages(prev => prev.map(m => m.id === msgId ? { ...m, isStreaming: false } : m));
          }
        }, 18);
      }
    } catch (err) {
      console.error(err);
      setIsTyping(false);
      setMessages(prev => [
        ...prev,
        {
          id: `err-${Date.now()}`,
          sender: 'gemini',
          content: 'দুঃখিত, কোনো একটি সমস্যা হয়েছে। অনুগ্রহ করে আবার চেষ্টা করুন।',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    }
  };

  const handleStartTwentyQuiz = (subjId = null) => {
    const target = subjId || selectedSubject;
    const subjName = ACADEMIC_SUBJECTS.find(s => s.id === target)?.name || 'সকল বিষয়';
    handleSend(`আমাকে ${subjName}-এর ২০টি প্রশ্নের পূর্ণাঙ্গ কুইজ মডেল টেস্ট দিন`, 'quiz');
  };

  const handleResetChat = () => {
    if (synthRef.current) synthRef.current.cancel();
    if (activeIntervalRef.current) clearInterval(activeIntervalRef.current);
    setIsSpeaking(false);
    setMessages([]);
  };

  // Gemini Initial Prompt Cards
  const geminiSuggestionCards = [
    {
      title: 'পীথাগোরাসের উপপাদ্য',
      desc: 'সমকোণী ত্রিভুজ, বাস্তব উপমা ও সমাধান',
      prompt: 'পীথাগোরাসের উপপাদ্য বুঝিয়ে দিন ও অঙ্ক সমাধান করুন',
      icon: Compass
    },
    {
      title: '২০টি প্রশ্নের মডেল টেস্ট',
      desc: 'যেকোনো বিষয়ের এক সাথে ২০টি MCQ কুইজ',
      prompt: 'আমাকে ২০টি প্রশ্নের পূর্ণাঙ্গ কুইজ মডেল টেস্ট দিন',
      icon: Target
    },
    {
      title: 'নিউটনের ৩য় গতিসূত্র',
      desc: 'ক্রিয়া-প্রতিক্রিয়া বল ও রকেটের উড্ডয়ন',
      prompt: 'নিউটনের ৩য় সূত্র ও বাস্তব জীবনের উপমা',
      icon: Atom
    },
    {
      title: 'Right Form of Verbs',
      desc: 'বোর্ড পরীক্ষার জন্য শীর্ষ ৫টি নিয়ম',
      prompt: 'Right form of verbs-এর সবচেয়ে গুরুত্বপূর্ণ ৫টি নিয়ম',
      icon: Languages
    }
  ];

  return (
    <section 
      id="ai-professor" 
      style={{
        padding: '60px 20px 80px',
        background: 'linear-gradient(180deg, #f8fafc 0%, #f1f5f9 100%)',
        position: 'relative',
        overflow: 'hidden',
        fontFamily: 'var(--font-sans, system-ui, -apple-system, sans-serif)'
      }}
    >
      {/* Ambient Radial Gradient Glows */}
      <div style={{
        position: 'absolute',
        top: '-10%',
        right: '5%',
        width: '560px',
        height: '560px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(66, 133, 244, 0.12) 0%, rgba(155, 114, 203, 0.06) 50%, transparent 75%)',
        pointerEvents: 'none',
        filter: 'blur(70px)',
        zIndex: 0
      }} />
      <div style={{
        position: 'absolute',
        bottom: '-10%',
        left: '2%',
        width: '520px',
        height: '520px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(14, 165, 233, 0.10) 0%, rgba(52, 168, 83, 0.05) 50%, transparent 75%)',
        pointerEvents: 'none',
        filter: 'blur(60px)',
        zIndex: 0
      }} />

      <div style={{ maxWidth: '1080px', margin: '0 auto', position: 'relative', zIndex: 1 }}>

        {/* Section Header Title & Badge */}
        <div style={{ textAlign: 'center', marginBottom: '28px' }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '6px 16px',
            borderRadius: '24px',
            backgroundColor: '#ffffff',
            border: '1px solid #e2e8f0',
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.03)',
            marginBottom: '14px'
          }}>
            <GeminiSparkleIcon size={17} />
            <span style={{ fontSize: '0.82rem', fontWeight: 700, color: '#1a73e8', letterSpacing: '0.02em' }}>
              TANZIM AI • OPENAI POWERED
            </span>
          </div>
          
          <h2 style={{
            fontSize: 'clamp(1.9rem, 3.8vw, 2.7rem)',
            fontWeight: 800,
            lineHeight: 1.22,
            margin: '0 0 10px 0',
            letterSpacing: '-0.02em',
            color: '#0f172a'
          }}>
            Tanzim{' '}
            <span style={{
              background: 'linear-gradient(135deg, #1a73e8 0%, #9333ea 50%, #e11d48 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}>
              AI প্রফেসর
            </span>
          </h2>
          
          <p style={{
            fontSize: '0.98rem',
            color: '#64748b',
            maxWidth: '680px',
            margin: '0 auto',
            lineHeight: 1.6
          }}>
            ষষ্ঠ থেকে দ্বাদশ শ্রেণির গণিত, বিজ্ঞান, ব্যাকরণ ও আইসিটির যেকোনো প্রশ্নের সমাধান ও এক সাথে ২০টি বহুনির্বাচনী প্রশ্নের মডেল টেস্ট।
          </p>
        </div>

        {/* Main Gemini Studio Workspace */}
        <div style={{
          backgroundColor: '#ffffff',
          borderRadius: '28px',
          boxShadow: '0 20px 50px -10px rgba(15, 23, 42, 0.07), 0 0 0 1px rgba(226, 232, 240, 0.8)',
          minHeight: '560px',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          border: '1px solid #e2e8f0'
        }}>

          {/* Clean Integrated Gemini Top Header */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '16px 24px',
            borderBottom: '1px solid #f1f5f9',
            backgroundColor: '#ffffff'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <GeminiSparkleIcon size={24} />
              <span style={{ fontSize: '1.1rem', fontWeight: 800, color: '#0f172a', letterSpacing: '-0.01em' }}>
                Tanzim AI
              </span>
              <span style={{
                fontSize: '0.74rem',
                fontWeight: 700,
                color: '#1a73e8',
                backgroundColor: '#eff6ff',
                padding: '3px 10px',
                borderRadius: '14px',
                border: '1px solid #dbeafe'
              }}>
                OpenAI Powered
              </span>
            </div>

            {messages.length > 0 && (
              <button
                onClick={handleResetChat}
                title="নতুন চ্যাট শুরু করুন"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '7px 14px',
                  borderRadius: '18px',
                  backgroundColor: '#f1f5f9',
                  color: '#334155',
                  border: '1px solid #e2e8f0',
                  fontSize: '0.8rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  transition: 'all 0.15s ease'
                }}
              >
                <Plus size={15} />
                <span>নতুন প্রশ্ন</span>
              </button>
            )}
          </div>

          {/* Conversation Stream */}
          <div 
            ref={chatScrollRef}
            style={{
              flex: 1,
              overflowY: 'auto',
              maxHeight: '580px',
              padding: messages.length === 0 ? '48px 24px 20px' : '28px 28px 20px',
              display: 'flex',
              flexDirection: 'column',
              gap: '24px'
            }}
          >
            {/* INITIAL GEMINI GREETING HERO (when no messages yet) */}
            {messages.length === 0 && (
              <div style={{ textAlign: 'left', maxWidth: '780px', margin: '0 auto', width: '100%' }}>
                <div style={{ marginBottom: '8px' }}>
                  <h1 style={{
                    fontSize: '2.9rem',
                    fontWeight: 600,
                    lineHeight: 1.2,
                    margin: 0,
                    background: 'linear-gradient(90deg, #4285F4 0%, #9B72CB 35%, #D96570 70%, #1BA1E2 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    letterSpacing: '-0.02em'
                  }}>
                    Hello, Student.
                  </h1>
                  <h2 style={{
                    fontSize: '2.5rem',
                    fontWeight: 500,
                    color: '#c4c7c5',
                    lineHeight: 1.25,
                    margin: '4px 0 16px 0',
                    letterSpacing: '-0.01em'
                  }}>
                    আজ তোমাকে কী শিখতে সাহায্য করতে পারি?
                  </h2>
                </div>

                <p style={{ fontSize: '0.96rem', color: '#5e5e5e', lineHeight: 1.6, marginBottom: '36px' }}>
                  আমি তোমার <strong>Tanzim AI Professor</strong>। গণিত, পদার্থবিজ্ঞান, রসায়ন, জীববিজ্ঞান, আইসিটি, ইংরেজি ও ব্যাকরণের যেকোনো প্রশ্নের বাস্তবসম্মত ব্যাখ্যা অথবা <strong>একসাথে ২০টি প্রশ্নের মডেল টেস্ট</strong> দিতে নিচে প্রশ্ন লেখো বা সাজেশনে ক্লিক করো।
                </p>

                {/* 4 Suggestion Cards */}
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
                  gap: '12px'
                }}>
                  {geminiSuggestionCards.map((card, idx) => (
                    <div
                      key={idx}
                      onClick={() => handleSend(card.prompt)}
                      style={{
                        backgroundColor: '#f0f4f9',
                        borderRadius: '16px',
                        padding: '16px 18px',
                        cursor: 'pointer',
                        transition: 'all 0.18s ease-in-out',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                        minHeight: '115px'
                      }}
                      onMouseEnter={e => {
                        e.currentTarget.style.backgroundColor = '#e3e8ee';
                        e.currentTarget.style.transform = 'translateY(-2px)';
                      }}
                      onMouseLeave={e => {
                        e.currentTarget.style.backgroundColor = '#f0f4f9';
                        e.currentTarget.style.transform = 'translateY(0)';
                      }}
                    >
                      <div style={{ fontSize: '0.88rem', fontWeight: 700, color: '#1f1f1f', marginBottom: '6px' }}>
                        {card.title}
                      </div>
                      <div style={{ fontSize: '0.78rem', color: '#5e5e5e', lineHeight: 1.4 }}>
                        {card.desc}
                      </div>
                      <div style={{ alignSelf: 'flex-end', marginTop: '12px', color: '#1a73e8' }}>{(() => { const Icon = card.icon; return Icon ? <Icon size={20} /> : null; })()}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* MESSAGE STREAM */}
            {messages.map((msg) => {
              const isUser = msg.sender === 'user';

              if (isUser) {
                return (
                  <div 
                    key={msg.id} 
                    style={{ 
                      alignSelf: 'flex-end', 
                      maxWidth: '78%', 
                      display: 'flex', 
                      flexDirection: 'column', 
                      alignItems: 'flex-end'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '5px' }}>
                      <span style={{ fontSize: '0.74rem', color: '#64748b', fontWeight: 600 }}>তুমি (Student)</span>
                      <div style={{
                        width: '20px',
                        height: '20px',
                        borderRadius: '50%',
                        backgroundColor: '#e2e8f0',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#475569'
                      }}>
                        <User size={12} />
                      </div>
                    </div>
                    <div style={{
                      background: 'linear-gradient(135deg, #1a73e8 0%, #174ea6 100%)',
                      color: '#ffffff',
                      padding: '13px 20px',
                      borderRadius: '22px 22px 4px 22px',
                      fontSize: '0.95rem',
                      lineHeight: 1.55,
                      boxShadow: '0 4px 16px rgba(26, 115, 232, 0.22)',
                      wordBreak: 'break-word',
                      fontWeight: 500
                    }}>
                      {/* Uploaded Attachment preview in User Bubble */}
                      {msg.attachment && (
                        <div style={{ marginBottom: msg.content ? '10px' : '0' }}>
                          {msg.attachment.fileType === 'image' ? (
                            <div style={{
                              borderRadius: '12px',
                              overflow: 'hidden',
                              backgroundColor: 'rgba(0,0,0,0.18)',
                              border: '1px solid rgba(255,255,255,0.22)',
                              maxWidth: '320px'
                            }}>
                              <img 
                                src={msg.attachment.dataUrl} 
                                alt={msg.attachment.name} 
                                style={{ display: 'block', maxWidth: '100%', maxHeight: '220px', objectFit: 'contain', margin: '0 auto' }} 
                              />
                              <div style={{
                                fontSize: '0.72rem',
                                padding: '5px 10px',
                                color: 'rgba(255,255,255,0.9)',
                                background: 'rgba(0,0,0,0.3)',
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center'
                              }}>
                                <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: '200px' }}>
                                  {msg.attachment.name}
                                </span>
                                <span>{formatFileSize(msg.attachment.size)}</span>
                              </div>
                            </div>
                          ) : (
                            <div style={{
                              display: 'flex',
                              alignItems: 'center',
                              gap: '10px',
                              backgroundColor: 'rgba(255, 255, 255, 0.16)',
                              padding: '10px 14px',
                              borderRadius: '14px',
                              border: '1px solid rgba(255, 255, 255, 0.22)',
                              maxWidth: '320px'
                            }}>
                              <div style={{
                                width: '38px',
                                height: '38px',
                                borderRadius: '10px',
                                backgroundColor: '#ffffff',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                color: '#dc2626',
                                flexShrink: 0
                              }}>
                                <FileText size={22} />
                              </div>
                              <div style={{ overflow: 'hidden' }}>
                                <div style={{ fontWeight: 600, fontSize: '0.86rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                  {msg.attachment.name}
                                </div>
                                <div style={{ fontSize: '0.72rem', color: 'rgba(255,255,255,0.82)' }}>
                                  {formatFileSize(msg.attachment.size)} • PDF ডকুমেন্ট
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      )}
                      {msg.content && <div>{msg.content}</div>}
                    </div>
                    <div style={{ fontSize: '0.7rem', color: '#94a3b8', marginTop: '4px', paddingRight: '4px' }}>
                      {msg.timestamp || 'এখন'}
                    </div>
                  </div>
                );
              }

              // Gemini Bot Message
              return (
                <div 
                  key={msg.id}
                  style={{
                    display: 'flex',
                    gap: '14px',
                    alignItems: 'flex-start',
                    maxWidth: '92%',
                    alignSelf: 'flex-start'
                  }}
                >
                  <div style={{
                    width: '38px',
                    height: '38px',
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, #f0f4f9 0%, #e8f0fe 100%)',
                    border: '1.5px solid #d2e3fc',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                    marginTop: '2px',
                    boxShadow: '0 2px 6px rgba(66, 133, 244, 0.12)'
                  }}>
                    <GeminiSparkleIcon size={20} />
                  </div>

                  <div style={{ flex: 1, minWidth: 0 }}>
                    {/* Bot Message Card */}
                    <div style={{
                      backgroundColor: '#f8fafc',
                      borderRadius: '4px 22px 22px 22px',
                      padding: '18px 22px',
                      border: '1px solid #eef2f6',
                      boxShadow: '0 2px 10px rgba(0, 0, 0, 0.02)'
                    }}>
                      {/* Meta header */}
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        marginBottom: '10px',
                        paddingBottom: '8px',
                        borderBottom: '1px solid #edf2f7'
                      }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <span style={{ fontSize: '0.88rem', fontWeight: 700, color: '#1a73e8' }}>
                            {msg.title || 'Tanzim AI'}
                          </span>
                          <span style={{
                            fontSize: '0.68rem',
                            fontWeight: 600,
                            color: '#15803d',
                            backgroundColor: '#dcfce7',
                            padding: '1px 7px',
                            borderRadius: '10px'
                          }}>
                            ভেরিফাইড
                          </span>
                        </div>
                        <span style={{ fontSize: '0.72rem', color: '#94a3b8' }}>
                          {msg.timestamp || 'এখন'}
                        </span>
                      </div>

                      {/* Gemini Markdown Formatter */}
                      <GeminiMarkdownRenderer 
                        content={msg.content} 
                        isStreaming={msg.isStreaming} 
                      />

                      {/* 20-Question Quiz Suite */}
                      {msg.type === 'quiz_set_20' && msg.quizSet && (
                        <div style={{ marginTop: '16px' }}>
                          <TwentyQuestionQuizSuite
                            quizSet={msg.quizSet}
                            title={msg.title}
                            subjectName={msg.subjectName || 'সকল বিষয়'}
                            onRetake={() => handleStartTwentyQuiz(msg.subject)}
                          />
                        </div>
                      )}
                    </div>

                    {/* Action Toolbar */}
                    {!msg.isStreaming && (
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px',
                        marginTop: '8px',
                        paddingLeft: '6px'
                      }}>
                        <button
                          onClick={() => handleSpeak(msg.content)}
                          title={isSpeaking ? "বন্ধ করুন" : "শুনুন (Text-to-Speech)"}
                          style={{
                            background: '#f1f5f9',
                            border: '1px solid #e2e8f0',
                            cursor: 'pointer',
                            color: isSpeaking ? '#d93025' : '#475569',
                            padding: '6px 10px',
                            borderRadius: '12px',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '4px',
                            fontSize: '0.74rem',
                            fontWeight: 500,
                            transition: 'all 0.15s ease'
                          }}
                        >
                          <Volume2 size={14} />
                          <span>{isSpeaking ? 'থামুন' : 'শুনুন'}</span>
                        </button>

                        <button
                          onClick={() => handleCopy(msg.id, msg.content)}
                          title="কপি করুন"
                          style={{
                            background: '#f1f5f9',
                            border: '1px solid #e2e8f0',
                            cursor: 'pointer',
                            color: copiedId === msg.id ? '#1e8e3e' : '#475569',
                            padding: '6px 10px',
                            borderRadius: '12px',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '4px',
                            fontSize: '0.74rem',
                            fontWeight: 500,
                            transition: 'all 0.15s ease'
                          }}
                        >
                          {copiedId === msg.id ? <Check size={14} /> : <Copy size={14} />}
                          <span>{copiedId === msg.id ? 'কপি হয়েছে' : 'কপি'}</span>
                        </button>

                        <button
                          onClick={() => handleToggleLike(msg.id)}
                          title="ভালো লেগেছে"
                          style={{
                            background: likedMessages[msg.id] ? '#eff6ff' : '#f1f5f9',
                            border: `1px solid ${likedMessages[msg.id] ? '#bfdbfe' : '#e2e8f0'}`,
                            cursor: 'pointer',
                            color: likedMessages[msg.id] ? '#1a73e8' : '#475569',
                            padding: '6px 8px',
                            borderRadius: '12px',
                            display: 'flex',
                            alignItems: 'center',
                            transition: 'all 0.15s ease'
                          }}
                        >
                          <ThumbsUp size={14} />
                        </button>

                        <button
                          onClick={() => handleToggleDislike(msg.id)}
                          title="ভালো লাগেনি"
                          style={{
                            background: dislikedMessages[msg.id] ? '#fef2f2' : '#f1f5f9',
                            border: `1px solid ${dislikedMessages[msg.id] ? '#fecaca' : '#e2e8f0'}`,
                            cursor: 'pointer',
                            color: dislikedMessages[msg.id] ? '#d93025' : '#475569',
                            padding: '6px 8px',
                            borderRadius: '12px',
                            display: 'flex',
                            alignItems: 'center',
                            transition: 'all 0.15s ease'
                          }}
                        >
                          <ThumbsDown size={14} />
                        </button>

                        <button
                          onClick={() => handleSend(msg.promptOrigin || lastUserPrompt || 'আবার বুঝিয়ে বলুন')}
                          title="আবার জেনারেট করুন"
                          style={{
                            background: '#f1f5f9',
                            border: '1px solid #e2e8f0',
                            cursor: 'pointer',
                            color: '#475569',
                            padding: '6px 10px',
                            borderRadius: '12px',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '4px',
                            fontSize: '0.74rem',
                            fontWeight: 500,
                            transition: 'all 0.15s ease'
                          }}
                        >
                          <RefreshCw size={13} />
                          <span>পুনরায়</span>
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}

            {/* Typing Indicator */}
            {isTyping && (
              <div style={{ display: 'flex', gap: '14px', alignItems: 'center', padding: '6px 0' }}>
                <div style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '50%',
                  backgroundColor: '#eff6ff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  border: '1px solid #bfdbfe'
                }}>
                  <GeminiSparkleIcon size={20} className="animate-spin-slow" />
                </div>
                <div style={{
                  backgroundColor: '#f8fafc',
                  borderRadius: '16px',
                  padding: '10px 16px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  color: '#1a73e8',
                  fontSize: '0.88rem',
                  fontWeight: 600,
                  border: '1px solid #e2e8f0'
                }}>
                  <span>Tanzim AI (OpenAI Powered) উত্তর প্রস্তুত করছে</span>
                  <span className="animate-pulse">•••</span>
                </div>
              </div>
            )}
          </div>

          {/* QUICK PROMPT SUGGESTION CHIPS ROW */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            overflowX: 'auto',
            padding: '4px 24px 10px',
            scrollbarWidth: 'none',
            borderTop: '1px solid #f1f5f9',
            backgroundColor: '#ffffff'
          }}>
            <span style={{ fontSize: '0.74rem', color: '#64748b', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '4px', whiteSpace: 'nowrap' }}>
              <Zap size={13} color="#f59e0b" />
              <span>সাজেশন:</span>
            </span>
            {[
              'নিউটনের ৩য় সূত্র ব্যাখ্যা করো',
              'বৃত্তের ক্ষেত্রফল ও পরিধির সূত্র',
              'Right Form of Verbs-এর ৫টি নিয়ম',
              '২০টি বহুনির্বাচনী কুইজ চাই'
            ].map((prompt, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => handleSend(prompt)}
                style={{
                  padding: '5px 12px',
                  borderRadius: '16px',
                  backgroundColor: '#f8fafc',
                  border: '1px solid #e2e8f0',
                  fontSize: '0.75rem',
                  color: '#334155',
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                  fontWeight: 500,
                  transition: 'all 0.15s ease'
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.backgroundColor = '#eff6ff';
                  e.currentTarget.style.color = '#1a73e8';
                  e.currentTarget.style.borderColor = '#bfdbfe';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.backgroundColor = '#f8fafc';
                  e.currentTarget.style.color = '#334155';
                  e.currentTarget.style.borderColor = '#e2e8f0';
                }}
              >
                {prompt}
              </button>
            ))}
          </div>

          {/* THE ICONIC GEMINI FLOATING PROMPT PILL */}
          <div style={{
            padding: '4px 20px 16px',
            backgroundColor: '#ffffff'
          }}>
            {/* Attachment Preview Chip Above Input */}
            {attachment && (
              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '10px',
                backgroundColor: '#eff6ff',
                border: '1.5px solid #bfdbfe',
                borderRadius: '14px',
                padding: '6px 12px 6px 8px',
                marginBottom: '10px',
                boxShadow: '0 2px 8px rgba(26, 115, 232, 0.08)'
              }}>
                {attachment.fileType === 'image' ? (
                  <img 
                    src={attachment.dataUrl} 
                    alt="preview" 
                    style={{ width: '34px', height: '34px', borderRadius: '8px', objectFit: 'cover', border: '1px solid #93c5fd' }} 
                  />
                ) : (
                  <div style={{
                    width: '34px',
                    height: '34px',
                    borderRadius: '8px',
                    backgroundColor: '#fee2e2',
                    color: '#dc2626',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <FileText size={18} />
                  </div>
                )}
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <span style={{ fontSize: '0.82rem', fontWeight: 600, color: '#1e293b', maxWidth: '240px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {attachment.name}
                  </span>
                  <span style={{ fontSize: '0.7rem', color: '#64748b' }}>
                    {formatFileSize(attachment.size)} • {attachment.fileType === 'image' ? 'ছবি যুক্ত হয়েছে' : 'PDF যুক্ত হয়েছে'}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={handleRemoveAttachment}
                  title="ফাইল বাদ দিন"
                  style={{
                    backgroundColor: '#e2e8f0',
                    border: 'none',
                    color: '#475569',
                    cursor: 'pointer',
                    width: '22px',
                    height: '22px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: '50%',
                    marginLeft: '6px',
                    transition: 'all 0.15s ease'
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.backgroundColor = '#fee2e2';
                    e.currentTarget.style.color = '#dc2626';
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.backgroundColor = '#e2e8f0';
                    e.currentTarget.style.color = '#475569';
                  }}
                >
                  <X size={14} />
                </button>
              </div>
            )}

            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend();
              }}
              style={{
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                backgroundColor: '#ffffff',
                borderRadius: '32px',
                padding: '6px 8px 6px 14px',
                border: '1.5px solid #cbd5e1',
                transition: 'all 0.2s ease',
                boxShadow: '0 4px 18px rgba(15, 23, 42, 0.06)'
              }}
              onFocus={e => {
                e.currentTarget.style.borderColor = '#1a73e8';
                e.currentTarget.style.boxShadow = '0 6px 24px rgba(26, 115, 232, 0.16), 0 0 0 2px rgba(26, 115, 232, 0.12)';
              }}
              onBlur={e => {
                e.currentTarget.style.borderColor = '#cbd5e1';
                e.currentTarget.style.boxShadow = '0 4px 18px rgba(15, 23, 42, 0.06)';
              }}
            >
              {/* Hidden File Input */}
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileSelect}
                accept="image/*,application/pdf,.pdf,.doc,.docx,.txt"
                style={{ display: 'none' }}
              />

              {/* Attachment Paperclip Button */}
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                title="ছবি (Photo) বা PDF ফাইল যুক্ত করুন"
                style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '50%',
                  backgroundColor: attachment ? '#eff6ff' : 'transparent',
                  border: attachment ? '1.5px solid #1a73e8' : 'none',
                  color: attachment ? '#1a73e8' : '#64748b',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  flexShrink: 0,
                  transition: 'all 0.15s ease',
                  marginRight: '6px'
                }}
                onMouseEnter={e => {
                  if (!attachment) {
                    e.currentTarget.style.backgroundColor = '#f1f5f9';
                    e.currentTarget.style.color = '#1a73e8';
                  }
                }}
                onMouseLeave={e => {
                  if (!attachment) {
                    e.currentTarget.style.backgroundColor = 'transparent';
                    e.currentTarget.style.color = '#64748b';
                  }
                }}
              >
                <Paperclip size={18} />
              </button>

              <input
                type="text"
                value={queryInput}
                onChange={(e) => setQueryInput(e.target.value)}
                placeholder={attachment ? "সংযুক্ত ফাইল নিয়ে কোনো প্রশ্ন থাকলে লিখুন (বা সরাসরি পাঠান)..." : "Tanzim AI-কে যেকোনো প্রশ্ন করুন, ছবি/PDF যোগ করুন বা ২০টি কুইজ চান..."}
                style={{
                  flex: 1,
                  border: 'none',
                  outline: 'none',
                  backgroundColor: 'transparent',
                  fontSize: '0.94rem',
                  color: '#0f172a',
                  padding: '10px 4px'
                }}
              />

              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <button
                  type="button"
                  onClick={() => handleStartTwentyQuiz()}
                  title="২০টি প্রশ্নের কুইজ"
                  style={{
                    background: '#eff6ff',
                    border: '1px solid #bfdbfe',
                    color: '#1a73e8',
                    padding: '7px 13px',
                    borderRadius: '16px',
                    fontSize: '0.76rem',
                    fontWeight: 700,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '5px',
                    transition: 'all 0.15s ease'
                  }}
                >
                  <Brain size={14} />
                  <span>২০ কুইজ</span>
                </button>

                <button
                  type="submit"
                  disabled={!queryInput.trim() && !attachment}
                  style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '50%',
                    background: (queryInput.trim() || attachment)
                      ? 'linear-gradient(135deg, #1a73e8 0%, #1557b0 100%)' 
                      : '#e2e8f0',
                    color: '#ffffff',
                    border: 'none',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: (queryInput.trim() || attachment) ? 'pointer' : 'default',
                    boxShadow: (queryInput.trim() || attachment) ? '0 3px 10px rgba(26, 115, 232, 0.35)' : 'none',
                    transition: 'all 0.18s ease'
                  }}
                >
                  <Send size={16} />
                </button>
              </div>
            </form>

            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px',
              marginTop: '10px',
              fontSize: '0.74rem',
              color: '#64748b'
            }}>
              <ShieldCheck size={14} color="#10b981" />
              <span>Tanzim AI প্রফেসর • NCTB শিক্ষাক্রমের আলোকে প্রস্তুতকৃত নির্ভুল ও নির্ভরযোগ্য উত্তর</span>
            </div>
          </div>

        </div>

      </div>

      {/* Gemini AI Status & Configuration Modal */}
      {isApiKeyModalOpen && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 99999,
          padding: '20px'
        }}>
          <div style={{
            backgroundColor: '#ffffff',
            borderRadius: '24px',
            padding: '26px',
            maxWidth: '500px',
            width: '100%',
            boxShadow: '0 20px 48px rgba(0,0,0,0.2)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '18px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <GeminiSparkleIcon size={24} />
                <h3 style={{ margin: 0, fontSize: '1.15rem', fontWeight: 700, color: '#1f1f1f' }}>
                  Tanzim AI ইঞ্জিন
                </h3>
              </div>
              <button
                onClick={() => setIsApiKeyModalOpen(false)}
                style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '4px', color: '#5f6368' }}
              >
                <X size={20} />
              </button>
            </div>

            {/* Main Reassurance Active Card */}
            <div style={{
              backgroundColor: '#e6f4ea',
              borderRadius: '16px',
              padding: '16px 18px',
              border: '1px solid #ceead6',
              marginBottom: '16px'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
                <CheckCircle2 size={22} color="#137333" />
                <div>
                  <div style={{ fontSize: '0.96rem', fontWeight: 700, color: '#137333' }}>
                    Tanzim AI ইঞ্জিন সম্পূর্ণ সক্রিয় ও প্রস্তুত
                  </div>
                  <div style={{ fontSize: '0.78rem', color: '#1e8e3e' }}>
                    সবকিছু স্বয়ংক্রিয়ভাবে কনফিগার করা হয়েছে
                  </div>
                </div>
              </div>
              <p style={{ fontSize: '0.84rem', color: '#3c4043', margin: 0, lineHeight: 1.5 }}>
                আপনার আলাদা করে কোনো API Key খোঁজা বা পেস্ট করার প্রয়োজন নেই। শিক্ষার্থীরা সরাসরি সকল বিষয়ের উত্তর, গাণিতিক সমাধান ও ২০টি প্রশ্নের লাইভ কুইজ আনলিমিটেড ব্যবহার করতে পারছে।
              </p>
            </div>

            {/* Feature Capability Highlights */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '8px',
              marginBottom: '18px'
            }}>
              <div style={{ padding: '8px 12px', backgroundColor: '#f8fafd', borderRadius: '10px', fontSize: '0.8rem', color: '#1a73e8', display: 'flex', alignItems: 'center', gap: '6px', fontWeight: 500 }}>
                <CheckCircle2 size={15} color="#1a73e8" />
                <span>২০টি প্রশ্নের লাইভ কুইজ</span>
              </div>
              <div style={{ padding: '8px 12px', backgroundColor: '#f8fafd', borderRadius: '10px', fontSize: '0.8rem', color: '#1a73e8', display: 'flex', alignItems: 'center', gap: '6px', fontWeight: 500 }}>
                <CheckCircle2 size={15} color="#1a73e8" />
                <span>গণিত ও সমীকরণ সমাধান</span>
              </div>
              <div style={{ padding: '8px 12px', backgroundColor: '#f8fafd', borderRadius: '10px', fontSize: '0.8rem', color: '#1a73e8', display: 'flex', alignItems: 'center', gap: '6px', fontWeight: 500 }}>
                <CheckCircle2 size={15} color="#1a73e8" />
                <span>৬ষ্ঠ-১২শ NCTB পাঠ্যসূচি</span>
              </div>
              <div style={{ padding: '8px 12px', backgroundColor: '#f8fafd', borderRadius: '10px', fontSize: '0.8rem', color: '#1a73e8', display: 'flex', alignItems: 'center', gap: '6px', fontWeight: 500 }}>
                <CheckCircle2 size={15} color="#1a73e8" />
                <span>লাইভ টাইপরাইটার স্ট্রিমিং</span>
              </div>
            </div>

            {/* Advanced Settings (Optional Accordion) */}
            <div style={{ borderTop: '1px solid #e5e7eb', paddingTop: '14px', marginBottom: '20px' }}>
              <button
                type="button"
                onClick={() => setShowAdvancedSettings(!showAdvancedSettings)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  width: '100%',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  padding: '2px 0',
                  fontSize: '0.8rem',
                  color: '#5f6368',
                  fontWeight: 600
                }}
              >
                <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Settings size={14} />
                  <span>উন্নত সেটিংস: নিজস্ব API Key পরিবর্তন (ঐচ্ছিক)</span>
                </span>
                {showAdvancedSettings ? <ChevronUp size={15} /> : <ChevronDown size={15} />}
              </button>

              {showAdvancedSettings && (
                <div style={{ marginTop: '12px', backgroundColor: '#f8fafd', padding: '14px', borderRadius: '14px', border: '1px solid #e8f0fe' }}>
                  <p style={{ fontSize: '0.78rem', color: '#5f6368', margin: '0 0 10px', lineHeight: 1.4 }}>
                    যদি আপনি নিজস্ব ক্লাউড কী ব্যবহার করতে চান তবে নিচে পেস্ট করতে পারেন:
                  </p>
                  <a
                    href="https://aistudio.google.com/app/apikey"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '5px',
                      padding: '5px 10px',
                      borderRadius: '8px',
                      backgroundColor: '#e8f0fe',
                      color: '#1a73e8',
                      fontSize: '0.75rem',
                      fontWeight: 600,
                      textDecoration: 'none',
                      marginBottom: '10px'
                    }}
                  >
                    <span>Google AI Studio ফ্রি কি লিংক</span>
                    <ExternalLink size={12} />
                  </a>
                  <div style={{ position: 'relative', marginBottom: '10px' }}>
                    <input
                      type={showApiKey ? 'text' : 'password'}
                      value={geminiApiKeyInput}
                      onChange={(e) => setGeminiApiKeyInput(e.target.value)}
                      placeholder="AIzaSy..."
                      style={{
                        width: '100%',
                        padding: '9px 36px 9px 12px',
                        borderRadius: '8px',
                        border: '1px solid #dadce0',
                        fontSize: '0.82rem',
                        outline: 'none',
                        boxSizing: 'border-box'
                      }}
                    />
                    <button
                      type="button"
                      onClick={() => setShowApiKey(!showApiKey)}
                      style={{
                        position: 'absolute',
                        right: '10px',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer',
                        color: '#5f6368',
                        display: 'flex',
                        alignItems: 'center',
                        padding: 0
                      }}
                    >
                      {showApiKey ? <EyeOff size={15} /> : <Eye size={15} />}
                    </button>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px' }}>
                    {geminiApiKeyInput.trim() && (
                      <button
                        onClick={handleClearApiKey}
                        style={{
                          padding: '5px 12px',
                          borderRadius: '8px',
                          border: '1px solid #dadce0',
                          backgroundColor: '#ffffff',
                          color: '#d93025',
                          fontSize: '0.75rem',
                          cursor: 'pointer'
                        }}
                      >
                        মুছে ফেলুন
                      </button>
                    )}
                    <button
                      onClick={handleSaveApiKey}
                      style={{
                        padding: '6px 14px',
                        borderRadius: '8px',
                        border: 'none',
                        backgroundColor: '#1a73e8',
                        color: '#ffffff',
                        fontSize: '0.75rem',
                        fontWeight: 600,
                        cursor: 'pointer'
                      }}
                    >
                      {apiKeySaved ? 'সংরক্ষিত হয়েছে' : 'সেভ করুন'}
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Done / Dismiss Button */}
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <button
                onClick={() => setIsApiKeyModalOpen(false)}
                style={{
                  padding: '9px 24px',
                  borderRadius: '14px',
                  border: 'none',
                  backgroundColor: '#1a73e8',
                  color: '#ffffff',
                  fontWeight: 600,
                  cursor: 'pointer',
                  fontSize: '0.86rem'
                }}
              >
                ঠিক আছে, বুঝেছি
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
