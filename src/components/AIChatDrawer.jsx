import React, { useState, useRef, useEffect } from 'react';
import { 
  X, 
  Send, 
  Volume2, 
  VolumeX, 
  Copy, 
  Check, 
  Brain, 
  Maximize2, 
  Minimize2, 
  RefreshCw,
  Plus,
  Paperclip,
  FileText,
  Image as ImageIcon
} from 'lucide-react';
import { 
  PROFESSOR_PROFILE, 
  ACADEMIC_SUBJECTS, 
  TEACHING_MODES, 
  PROFESSOR_QUICK_PROMPTS 
} from '../data/aiProfessorData';
import { INSTITUTION } from '../data/mockData';
import { TwentyQuestionQuizSuite } from './TwentyQuestionQuizSuite';
import { GeminiSparkleIcon } from './AIProfessorSection';
import { GeminiMarkdownRenderer } from './GeminiMarkdownRenderer';
import { askGeminiAI } from '../data/geminiEngine';

export function AIChatDrawer() {
  const [isOpen, setIsOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [selectedSubject, setSelectedSubject] = useState('all');
  const [copiedId, setCopiedId] = useState(null);
  const [isSpeaking, setIsSpeaking] = useState(false);
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

  const [messages, setMessages] = useState([
    {
      id: 'init-1',
      sender: 'gemini',
      title: 'Tanzim AI (OpenAI Powered)',
      content: `Hello! আমি ${INSTITUTION.name}-এর Tanzim AI প্রফেসর (OpenAI Powered)। গণিত, বিজ্ঞান, আইসিটি বা ব্যাকরণের যেকোনো প্রশ্ন জিজ্ঞেস করতে পারো, কিংবা একসাথে **২০টি প্রশ্নের কুইজ মডেল টেস্ট** দিতে পারো। আজ কী জানতে চাও?`,
      timestamp: 'এইমাত্র'
    }
  ]);
  const [inputQuery, setInputQuery] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const synthRef = useRef(null);
  const activeIntervalRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  // Speech Synthesis setup
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

  const handleSend = async (textToSend = null, overrideMode = null) => {
    const query = (textToSend || inputQuery).trim();
    const currentAttachment = attachment;
    if (!query && !currentAttachment) return;

    // User message
    const userMsg = {
      id: `user-${Date.now()}`,
      sender: 'user',
      content: query,
      attachment: currentAttachment,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setMessages(prev => [...prev, userMsg]);
    if (!textToSend) setInputQuery('');
    setAttachment(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
    setIsTyping(true);

    try {
      const resp = await askGeminiAI(query, selectedSubject, overrideMode || 'concept', currentAttachment, messages);
      setIsTyping(false);

      if (resp.type === 'quiz_set_20') {
        const quizMsg = {
          id: `gemini-${Date.now()}`,
          sender: 'gemini',
          promptOrigin: query,
          ...resp,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
        setMessages(prev => [...prev, quizMsg]);
      } else {
        // Typewriter streaming in drawer
        const msgId = `gemini-${Date.now()}`;
        const fullContent = resp.content;

        setMessages(prev => [
          ...prev,
          {
            id: msgId,
            sender: 'gemini',
            promptOrigin: query,
            title: resp.title,
            content: '',
            isStreaming: true,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
          }
        ]);

        const words = fullContent.split(' ');
        let wordIdx = 0;
        let accumulated = '';

        if (activeIntervalRef.current) clearInterval(activeIntervalRef.current);

        activeIntervalRef.current = setInterval(() => {
          if (wordIdx < words.length) {
            accumulated += (wordIdx === 0 ? '' : ' ') + words[wordIdx];
            wordIdx++;
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

  return (
    <div style={{ position: 'fixed', bottom: '24px', right: '24px', zIndex: 9999 }}>
      {/* Trigger Button when Closed (Google Gemini Style Floating Pill) */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          style={{
            borderRadius: '28px',
            padding: '10px 20px',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            backgroundColor: '#ffffff',
            boxShadow: '0 4px 20px rgba(66, 133, 244, 0.28), 0 0 0 1px #e1e3e1',
            border: 'none',
            cursor: 'pointer',
            color: '#1f1f1f',
            transition: 'all 0.25s ease'
          }}
          onMouseEnter={e => {
            e.currentTarget.style.transform = 'translateY(-2px) scale(1.02)';
            e.currentTarget.style.boxShadow = '0 6px 24px rgba(66, 133, 244, 0.35), 0 0 0 1px #c2e7ff';
          }}
          onMouseLeave={e => {
            e.currentTarget.style.transform = 'translateY(0) scale(1)';
            e.currentTarget.style.boxShadow = '0 4px 20px rgba(66, 133, 244, 0.28), 0 0 0 1px #e1e3e1';
          }}
        >
          <GeminiSparkleIcon size={24} />
          <div style={{ textAlign: 'left' }}>
            <div style={{ fontSize: '0.88rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span>Ask Tanzim AI</span>
              <span style={{
                fontSize: '0.62rem',
                backgroundColor: '#e8f0fe',
                color: '#1a73e8',
                padding: '1px 6px',
                borderRadius: '8px',
                fontWeight: 700
              }}>Pro</span>
            </div>
            <div style={{ fontSize: '0.68rem', color: '#70757a' }}>
              সহজ সমাধান ও ২০টি প্রশ্নের কুইজ
            </div>
          </div>
        </button>
      )}

      {/* Expanded Gemini Drawer */}
      {isOpen && (
        <div 
          className="animate-fade-in"
          style={{
            width: isExpanded ? '660px' : '420px',
            height: isExpanded ? '740px' : '580px',
            maxWidth: '92vw',
            maxHeight: '85vh',
            display: 'flex',
            flexDirection: 'column',
            backgroundColor: '#ffffff',
            borderRadius: '24px',
            overflow: 'hidden',
            boxShadow: '0 20px 48px rgba(0, 0, 0, 0.15), 0 0 0 1px #e1e3e1',
            border: '1px solid #dadce0',
            transition: 'width 0.25s ease, height 0.25s ease',
            fontFamily: 'inherit'
          }}
        >
          {/* Drawer Header in Google Gemini Style */}
          <div style={{
            padding: '14px 18px',
            backgroundColor: '#ffffff',
            borderBottom: '1px solid #f1f3f4',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <GeminiSparkleIcon size={22} />
              <div>
                <div style={{ fontSize: '0.92rem', fontWeight: 700, color: '#1f1f1f', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <span>Tanzim AI</span>
                  <span style={{
                    fontSize: '0.65rem',
                    backgroundColor: '#e8f0fe',
                    color: '#1a73e8',
                    padding: '1px 6px',
                    borderRadius: '8px'
                  }}>OpenAI Powered</span>
                </div>
                <div style={{ fontSize: '0.68rem', color: '#70757a' }}>
                  OpenAI ChatGPT Architecture
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                title={isExpanded ? "ছোট করুন" : "বড় করুন"}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#5e5e5e',
                  cursor: 'pointer',
                  padding: '6px',
                  borderRadius: '50%'
                }}
              >
                {isExpanded ? <Minimize2 size={16} /> : <Maximize2 size={16} />}
              </button>

              <button
                onClick={() => setIsOpen(false)}
                title="বন্ধ করুন"
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#5e5e5e',
                  cursor: 'pointer',
                  padding: '6px',
                  borderRadius: '50%'
                }}
              >
                <X size={18} />
              </button>
            </div>
          </div>

          {/* Quick Prompts Bar */}
          <div style={{
            padding: '8px 14px',
            backgroundColor: '#f8fafd',
            borderBottom: '1px solid #f1f3f4',
            display: 'flex',
            gap: '6px',
            overflowX: 'auto',
            whiteSpace: 'nowrap'
          }}>
            <button
              onClick={() => handleSend('আমাকে ২০টি প্রশ্নের পূর্ণাঙ্গ কুইজ মডেল টেস্ট দিন', 'quiz')}
              style={{
                padding: '4px 10px',
                borderRadius: '16px',
                border: 'none',
                backgroundColor: '#e8f0fe',
                color: '#1a73e8',
                fontSize: '0.72rem',
                fontWeight: 700,
                cursor: 'pointer',
                flexShrink: 0,
                display: 'flex',
                alignItems: 'center',
                gap: '4px'
              }}
            >
              <Brain size={12} />
              <span>২০টি কুইজ টেস্ট</span>
            </button>

            {PROFESSOR_QUICK_PROMPTS.slice(0, 5).map((qp, i) => (
              <button
                key={i}
                onClick={() => handleSend(qp.text)}
                style={{
                  padding: '4px 10px',
                  borderRadius: '16px',
                  border: '1px solid #dadce0',
                  backgroundColor: '#ffffff',
                  color: '#3c4043',
                  fontSize: '0.72rem',
                  fontWeight: 500,
                  cursor: 'pointer',
                  flexShrink: 0
                }}
              >
                {qp.text}
              </button>
            ))}
          </div>

          {/* Chat Messages Body in Gemini Style */}
          <div style={{
            flex: 1,
            overflowY: 'auto',
            padding: '16px',
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
            backgroundColor: '#ffffff'
          }}>
            {messages.map((m) => {
              const isUser = m.sender === 'user';

              if (isUser) {
                return (
                  <div
                    key={m.id}
                    style={{
                      alignSelf: 'flex-end',
                      maxWidth: '85%'
                    }}
                  >
                    <div style={{
                      padding: '10px 16px',
                      borderRadius: '20px',
                      backgroundColor: '#f0f4f9',
                      color: '#1f1f1f',
                      fontSize: '0.86rem',
                      lineHeight: 1.5
                    }}>
                      {m.attachment && (
                        <div style={{ marginBottom: m.content ? '8px' : '0' }}>
                          {m.attachment.fileType === 'image' ? (
                            <img 
                              src={m.attachment.dataUrl} 
                              alt={m.attachment.name} 
                              style={{ maxWidth: '100%', maxHeight: '180px', borderRadius: '10px', display: 'block', objectFit: 'contain' }} 
                            />
                          ) : (
                            <div style={{
                              display: 'flex',
                              alignItems: 'center',
                              gap: '8px',
                              backgroundColor: '#ffffff',
                              padding: '8px 10px',
                              borderRadius: '10px',
                              border: '1px solid #e2e8f0'
                            }}>
                              <FileText size={18} color="#dc2626" />
                              <div style={{ overflow: 'hidden' }}>
                                <div style={{ fontSize: '0.78rem', fontWeight: 600, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '180px' }}>
                                  {m.attachment.name}
                                </div>
                                <div style={{ fontSize: '0.68rem', color: '#64748b' }}>
                                  {formatFileSize(m.attachment.size)} • PDF
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      )}
                      {m.content && <div>{m.content}</div>}
                    </div>
                  </div>
                );
              }

              return (
                <div
                  key={m.id}
                  style={{
                    display: 'flex',
                    gap: '10px',
                    alignItems: 'flex-start',
                    maxWidth: '96%',
                    alignSelf: 'flex-start'
                  }}
                >
                  <GeminiSparkleIcon size={18} />

                  <div style={{ flex: 1, color: '#1f1f1f' }}>
                    {m.title && (
                      <div style={{ fontSize: '0.84rem', fontWeight: 700, color: '#1a73e8', marginBottom: '4px' }}>
                        {m.title}
                      </div>
                    )}

                    {/* Gemini Markdown Formatter */}
                    <GeminiMarkdownRenderer 
                      content={m.content} 
                      isStreaming={m.isStreaming} 
                    />

                    {/* 20-Question Full Model Test Suite */}
                    {m.type === 'quiz_set_20' && m.quizSet && (
                      <TwentyQuestionQuizSuite
                        quizSet={m.quizSet}
                        title={m.title}
                        subjectName={m.subjectName || 'সকল বিষয়'}
                        compact={!isExpanded}
                        onRetake={() => handleSend('আমাকে ২০টি প্রশ্নের পূর্ণাঙ্গ কুইজ মডেল টেস্ট দিন', 'quiz')}
                      />
                    )}

                    {/* Action bar */}
                    {!m.isStreaming && (
                      <div style={{ display: 'flex', gap: '8px', marginTop: '8px', color: '#70757a' }}>
                        <button
                          onClick={() => handleSpeak(m.content)}
                          style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#70757a' }}
                          title="শুনুন"
                        >
                          <Volume2 size={13} />
                        </button>
                        <button
                          onClick={() => handleCopy(m.id, m.content)}
                          style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#70757a' }}
                          title="কপি করুন"
                        >
                          {copiedId === m.id ? <Check size={13} /> : <Copy size={13} />}
                        </button>
                        <button
                          onClick={() => handleSend(m.promptOrigin || m.content.slice(0, 30))}
                          style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#70757a' }}
                          title="আবার জেনারেট করুন"
                        >
                          <RefreshCw size={13} />
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}

            {isTyping && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '6px 10px' }}>
                <GeminiSparkleIcon size={16} className="animate-spin-slow" />
                <span style={{ fontSize: '0.76rem', color: '#70757a' }}>
                  Tanzim AI (OpenAI Powered) উত্তর প্রস্তুত করছে...
                </span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Gemini Style Floating Input Capsule */}
          <div style={{
            padding: '10px 14px',
            backgroundColor: '#ffffff',
            borderTop: '1px solid #f1f3f4'
          }}>
            {/* Attachment Preview Chip in Drawer */}
            {attachment && (
              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                backgroundColor: '#eff6ff',
                border: '1px solid #bfdbfe',
                borderRadius: '12px',
                padding: '4px 8px',
                marginBottom: '8px'
              }}>
                {attachment.fileType === 'image' ? (
                  <img 
                    src={attachment.dataUrl} 
                    alt="attachment" 
                    style={{ width: '24px', height: '24px', borderRadius: '4px', objectFit: 'cover' }} 
                  />
                ) : (
                  <FileText size={16} color="#dc2626" />
                )}
                <span style={{ fontSize: '0.74rem', fontWeight: 600, color: '#1e293b', maxWidth: '160px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  {attachment.name}
                </span>
                <button
                  type="button"
                  onClick={handleRemoveAttachment}
                  style={{
                    backgroundColor: 'transparent',
                    border: 'none',
                    color: '#64748b',
                    cursor: 'pointer',
                    padding: '2px',
                    display: 'flex',
                    alignItems: 'center'
                  }}
                >
                  <X size={13} />
                </button>
              </div>
            )}

            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend();
              }}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}
            >
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileSelect}
                accept="image/*,application/pdf,.pdf,.doc,.docx,.txt"
                style={{ display: 'none' }}
              />

              <div style={{
                flex: 1,
                display: 'flex',
                alignItems: 'center',
                backgroundColor: '#f0f4f9',
                borderRadius: '24px',
                padding: '4px 10px 4px 6px'
              }}>
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  title="ছবি বা PDF যুক্ত করুন"
                  style={{
                    width: '28px',
                    height: '28px',
                    borderRadius: '50%',
                    backgroundColor: attachment ? '#dbeafe' : 'transparent',
                    color: attachment ? '#1a73e8' : '#5f6368',
                    border: 'none',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    marginRight: '4px',
                    flexShrink: 0
                  }}
                >
                  <Paperclip size={15} />
                </button>

                <input
                  type="text"
                  value={inputQuery}
                  onChange={e => setInputQuery(e.target.value)}
                  placeholder={attachment ? "ফাইলটি নিয়ে প্রশ্ন লিখুন..." : "Tanzim AI-কে যেকোনো প্রশ্ন করুন..."}
                  style={{
                    flex: 1,
                    border: 'none',
                    outline: 'none',
                    backgroundColor: 'transparent',
                    color: '#1f1f1f',
                    fontSize: '0.84rem'
                  }}
                />
                <button
                  type="submit"
                  disabled={!inputQuery.trim() && !attachment}
                  style={{
                    width: '30px',
                    height: '30px',
                    borderRadius: '50%',
                    backgroundColor: (inputQuery.trim() || attachment) ? '#1a73e8' : '#dadce0',
                    color: '#ffffff',
                    border: 'none',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: (inputQuery.trim() || attachment) ? 'pointer' : 'default',
                    flexShrink: 0
                  }}
                >
                  <Send size={13} />
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
