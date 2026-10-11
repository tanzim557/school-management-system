import React, { useState } from 'react';
import { 
  CheckCircle2,
  HelpCircle,
  Check, 
  X, 
  ChevronLeft, 
  ChevronRight, 
  RefreshCw, 
  List,
  Layers
} from 'lucide-react';
import { GeminiSparkleIcon } from './AIProfessorSection';

export function TwentyQuestionQuizSuite({ 
  quizSet = [], 
  title = '২০টি প্রশ্নের পূর্ণাঙ্গ মডেল টেস্ট', 
  subjectName = 'সকল বিষয়', 
  onRetake = null,
  compact = false 
}) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState({}); // { [qId]: { selectedIdx, isCorrect } }
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [viewMode, setViewMode] = useState('stepper'); // 'stepper' or 'all'

  if (!quizSet || quizSet.length === 0) {
    return (
      <div style={{ padding: '16px', textAlign: 'center', color: '#70757a' }}>
        কোনো প্রশ্ন পাওয়া যায়নি। অনুগ্রহ করে আবার চেষ্টা করুন।
      </div>
    );
  }

  const currentQ = quizSet[currentIndex];
  const answeredCount = Object.keys(answers).length;
  const correctCount = Object.values(answers).filter(a => a.isCorrect).length;
  const totalCount = quizSet.length;
  const percentage = Math.round((correctCount / totalCount) * 100);

  const handleSelectOption = (qId, optionIdx, correctIdx) => {
    if (answers[qId]) return; // already answered

    const isCorrect = optionIdx === correctIdx;
    setAnswers(prev => ({
      ...prev,
      [qId]: { selectedIdx: optionIdx, isCorrect }
    }));
  };

  const getPerformanceGrade = (pct) => {
    if (pct >= 80) return { grade: 'A+', color: '#137333', bg: '#e6f4ea', text: 'অসাধারণ! তোমার মেধা ও বিষয়ভিত্তিক প্রস্তুতি অত্যন্ত চমৎকার।' };
    if (pct >= 70) return { grade: 'A', color: '#1a73e8', bg: '#e8f0fe', text: 'খুব ভালো প্রস্তুতি! আরও একটু রিভিশন দিলে নিশ্চিত A+ পাবে।' };
    if (pct >= 60) return { grade: 'A-', color: '#9334e6', bg: '#f3e8fd', text: 'ভালো চেষ্টা! কিছু গুরুত্বপূর্ণ অধ্যায়ের সূত্রে আরও মনোযোগ প্রয়োজন।' };
    if (pct >= 50) return { grade: 'B', color: '#b06000', bg: '#fef7e0', text: 'সন্তোষজনক। প্রফেসরের লেকচারগুলো আবার মনোযোগ দিয়ে পড়ো।' };
    return { grade: 'C', color: '#c5221f', bg: '#fce8e6', text: 'আরও নিবিড় অধ্যয়ন প্রয়োজন। প্রফেসরের সাথে টপিকগুলো বিস্তারিত আলোচনা করো।' };
  };

  const resultGrade = getPerformanceGrade(percentage);

  return (
    <div style={{
      marginTop: '16px',
      padding: compact ? '14px' : '20px',
      borderRadius: '20px',
      backgroundColor: '#ffffff',
      border: '1px solid #e1e3e1',
      boxShadow: '0 2px 10px rgba(0, 0, 0, 0.03)',
      color: '#1f1f1f',
      fontFamily: 'inherit'
    }}>
      {/* Gemini Quiz Header Bar */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '10px',
        paddingBottom: '12px',
        borderBottom: '1px solid #f1f3f4'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <GeminiSparkleIcon size={20} />
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontSize: '0.92rem', fontWeight: 700, color: '#1f1f1f' }}>
                {subjectName}
              </span>
              <span style={{
                fontSize: '0.68rem',
                fontWeight: 700,
                color: '#1a73e8',
                backgroundColor: '#e8f0fe',
                padding: '2px 8px',
                borderRadius: '10px'
              }}>
                ২০টি MCQ টেস্ট
              </span>
            </div>
            <div style={{ fontSize: '0.76rem', color: '#70757a', marginTop: '2px' }}>
              সমাধান হয়েছে: <strong>{answeredCount} / {totalCount}</strong> • সঠিক উত্তর: <strong>{correctCount}</strong>
            </div>
          </div>
        </div>

        {/* View toggle & submit button */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <button
            onClick={() => setViewMode(viewMode === 'stepper' ? 'all' : 'stepper')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              fontSize: '0.74rem',
              fontWeight: 600,
              padding: '5px 10px',
              borderRadius: '12px',
              border: '1px solid #dadce0',
              backgroundColor: '#f8f9fa',
              cursor: 'pointer',
              color: '#3c4043'
            }}
          >
            {viewMode === 'stepper' ? <List size={14} /> : <Layers size={14} />}
            <span>{viewMode === 'stepper' ? 'সব ২০টি দেখুন' : 'স্টেপ মোড'}</span>
          </button>

          {answeredCount > 0 && !isSubmitted && (
            <button
              onClick={() => setIsSubmitted(true)}
              style={{
                fontSize: '0.76rem',
                fontWeight: 600,
                padding: '6px 14px',
                borderRadius: '16px',
                border: 'none',
                backgroundColor: '#1a73e8',
                color: '#ffffff',
                cursor: 'pointer',
                boxShadow: '0 1px 3px rgba(26, 115, 232, 0.3)'
              }}
            >
              ফলাফল ও মার্কশিট
            </button>
          )}
        </div>
      </div>

      {/* Progress Bar with Gemini Gradient */}
      <div style={{
        height: '4px',
        backgroundColor: '#f1f3f4',
        borderRadius: '2px',
        margin: '12px 0 8px',
        overflow: 'hidden'
      }}>
        <div style={{
          height: '100%',
          width: `${(answeredCount / totalCount) * 100}%`,
          background: 'linear-gradient(90deg, #4285F4, #9B72CB, #D96570)',
          borderRadius: '2px',
          transition: 'width 0.25s ease'
        }} />
      </div>

      {/* 20 Questions Number Navigator Pills */}
      <div style={{
        margin: '8px 0 14px',
        display: 'flex',
        alignItems: 'center',
        gap: '4px',
        overflowX: 'auto',
        paddingBottom: '4px'
      }}>
        {quizSet.map((q, idx) => {
          const ans = answers[q.id];
          const isCurrent = currentIndex === idx && viewMode === 'stepper';
          let bgColor = '#f0f4f9';
          let color = '#444746';
          let border = '1px solid transparent';

          if (ans) {
            bgColor = ans.isCorrect ? '#e6f4ea' : '#fce8e6';
            color = ans.isCorrect ? '#137333' : '#c5221f';
            border = `1px solid ${ans.isCorrect ? '#34a853' : '#ea4335'}`;
          }

          if (isCurrent) {
            border = '2px solid #1a73e8';
            bgColor = '#c2e7ff';
            color = '#001d35';
          }

          return (
            <button
              key={q.id}
              onClick={() => {
                setCurrentIndex(idx);
                setViewMode('stepper');
              }}
              style={{
                width: '28px',
                height: '28px',
                borderRadius: '50%',
                fontSize: '0.72rem',
                fontWeight: 700,
                backgroundColor: bgColor,
                color: color,
                border: border,
                cursor: 'pointer',
                flexShrink: 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'all 0.15s ease'
              }}
              title={`প্রশ্ন ${idx + 1}`}
            >
              {idx + 1}
            </button>
          );
        })}
      </div>

      {/* Mode A: Stepper Mode (One question at a time) */}
      {viewMode === 'stepper' && currentQ && (
        <div style={{
          backgroundColor: '#f8fafd',
          borderRadius: '16px',
          padding: compact ? '12px' : '18px',
          border: '1px solid #e1e3e1'
        }}>
          {/* Question title */}
          <div style={{
            fontSize: compact ? '0.9rem' : '0.98rem',
            fontWeight: 700,
            color: '#1f1f1f',
            marginBottom: '14px',
            lineHeight: 1.5
          }}>
            <span style={{ color: '#1a73e8', marginRight: '6px' }}>
              প্রশ্ন {currentIndex + 1} / {totalCount}:
            </span>
            {currentQ.question}
          </div>

          {/* 4 Clickable Options */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {currentQ.options.map((opt, optIdx) => {
              const ansState = answers[currentQ.id];
              const isSelected = ansState?.selectedIdx === optIdx;
              const isCorrectOpt = optIdx === currentQ.correctIndex;

              let btnBg = '#ffffff';
              let btnBorder = '#dadce0';
              let btnColor = '#1f1f1f';

              if (ansState) {
                if (isCorrectOpt) {
                  btnBg = '#e6f4ea';
                  btnBorder = '#34a853';
                  btnColor = '#137333';
                } else if (isSelected && !ansState.isCorrect) {
                  btnBg = '#fce8e6';
                  btnBorder = '#ea4335';
                  btnColor = '#c5221f';
                }
              }

              return (
                <button
                  key={optIdx}
                  disabled={Boolean(ansState)}
                  onClick={() => handleSelectOption(currentQ.id, optIdx, currentQ.correctIndex)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    textAlign: 'left',
                    padding: compact ? '9px 12px' : '11px 16px',
                    borderRadius: '12px',
                    backgroundColor: btnBg,
                    border: `1.5px solid ${btnBorder}`,
                    color: btnColor,
                    fontSize: compact ? '0.84rem' : '0.9rem',
                    fontWeight: isSelected || (ansState && isCorrectOpt) ? 700 : 500,
                    cursor: ansState ? 'default' : 'pointer',
                    transition: 'all 0.15s ease'
                  }}
                >
                  <span>
                    <strong>{['(ক)', '(খ)', '(গ)', '(ঘ)'][optIdx]}</strong> {opt}
                  </span>
                  {ansState && isCorrectOpt && <Check size={16} className="text-emerald-600" />}
                  {ansState && isSelected && !ansState.isCorrect && <X size={16} className="text-red-600" />}
                </button>
              );
            })}
          </div>

          {/* Explanation Box */}
          {answers[currentQ.id] && (
            <div style={{
              marginTop: '12px',
              padding: '10px 14px',
              borderRadius: '12px',
              backgroundColor: answers[currentQ.id].isCorrect ? '#e6f4ea' : '#fef7e0',
              border: `1px solid ${answers[currentQ.id].isCorrect ? '#a8dab5' : '#feefc3'}`,
              fontSize: '0.84rem'
            }}>
              <div style={{
                fontWeight: 700,
                color: answers[currentQ.id].isCorrect ? '#137333' : '#b06000',
                marginBottom: '4px'
              }}>
                {answers[currentQ.id].isCorrect ? (
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: '5px' }}>
                    <CheckCircle2 size={16} /> সঠিক উত্তর!
                  </span>
                ) : (
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: '5px' }}>
                    <HelpCircle size={16} /> ব্যাখ্যা:
                  </span>
                )}
              </div>
              <div style={{ color: '#3c4043', lineHeight: 1.5 }}>
                {currentQ.explanation}
              </div>
            </div>
          )}

          {/* Stepper Navigation */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginTop: '14px',
            paddingTop: '10px',
            borderTop: '1px solid #e1e3e1'
          }}>
            <button
              disabled={currentIndex === 0}
              onClick={() => setCurrentIndex(prev => Math.max(0, prev - 1))}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
                padding: '6px 12px',
                borderRadius: '12px',
                border: '1px solid #dadce0',
                backgroundColor: currentIndex === 0 ? '#f1f3f4' : '#ffffff',
                color: currentIndex === 0 ? '#9aa0a6' : '#3c4043',
                fontSize: '0.8rem',
                fontWeight: 600,
                cursor: currentIndex === 0 ? 'not-allowed' : 'pointer'
              }}
            >
              <ChevronLeft size={15} />
              <span>পূর্ববর্তী</span>
            </button>

            <span style={{ fontSize: '0.78rem', color: '#70757a' }}>
              প্রশ্ন {currentIndex + 1} / {totalCount}
            </span>

            <button
              disabled={currentIndex === totalCount - 1}
              onClick={() => setCurrentIndex(prev => Math.min(totalCount - 1, prev + 1))}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
                padding: '6px 14px',
                borderRadius: '12px',
                border: 'none',
                backgroundColor: currentIndex === totalCount - 1 ? '#dadce0' : '#1a73e8',
                color: '#ffffff',
                fontSize: '0.8rem',
                fontWeight: 600,
                cursor: currentIndex === totalCount - 1 ? 'not-allowed' : 'pointer'
              }}
            >
              <span>পরবর্তী</span>
              <ChevronRight size={15} />
            </button>
          </div>
        </div>
      )}

      {/* Mode B: All 20 Questions in a Scrollable Test Sheet */}
      {viewMode === 'all' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', maxHeight: '420px', overflowY: 'auto', paddingRight: '6px' }}>
          {quizSet.map((q, idx) => {
            const ans = answers[q.id];
            return (
              <div 
                key={q.id}
                style={{
                  padding: '12px',
                  borderRadius: '12px',
                  backgroundColor: '#f8fafd',
                  border: '1px solid #e1e3e1'
                }}
              >
                <div style={{ fontWeight: 700, fontSize: '0.88rem', color: '#1f1f1f', marginBottom: '8px' }}>
                  {idx + 1}. {q.question}
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '6px' }}>
                  {q.options.map((opt, optI) => {
                    const isCorrectOpt = optI === q.correctIndex;
                    const isSelected = ans?.selectedIdx === optI;
                    let bBg = '#ffffff';
                    let bBrd = '#dadce0';
                    if (ans) {
                      if (isCorrectOpt) {
                        bBg = '#e6f4ea';
                        bBrd = '#34a853';
                      } else if (isSelected && !ans.isCorrect) {
                        bBg = '#fce8e6';
                        bBrd = '#ea4335';
                      }
                    }
                    return (
                      <button
                        key={optI}
                        disabled={Boolean(ans)}
                        onClick={() => handleSelectOption(q.id, optI, q.correctIndex)}
                        style={{
                          padding: '7px 10px',
                          textAlign: 'left',
                          borderRadius: '8px',
                          fontSize: '0.8rem',
                          backgroundColor: bBg,
                          border: `1px solid ${bBrd}`,
                          cursor: ans ? 'default' : 'pointer'
                        }}
                      >
                        {['ক', 'খ', 'গ', 'ঘ'][optI]}. {opt}
                      </button>
                    );
                  })}
                </div>
                {ans && (
                  <div style={{ marginTop: '6px', fontSize: '0.76rem', color: '#3c4043' }}>
                    <strong>ব্যাখ্যা:</strong> {q.explanation}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* Submitted Result / Marksheet Summary in Gemini Style */}
      {(isSubmitted || answeredCount === totalCount) && (
        <div style={{
          marginTop: '14px',
          padding: '18px',
          borderRadius: '16px',
          backgroundColor: resultGrade.bg,
          border: `1px solid ${resultGrade.color}30`,
          textAlign: 'center'
        }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '48px',
            height: '48px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #4285F4, #9B72CB, #D96570)',
            color: '#ffffff',
            fontSize: '1.3rem',
            fontWeight: 800,
            marginBottom: '8px',
            boxShadow: '0 2px 8px rgba(66, 133, 244, 0.3)'
          }}>
            {resultGrade.grade}
          </div>

          <h4 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#1f1f1f', margin: '0 0 4px 0' }}>
            মডেল টেস্ট সমাপ্ত! তোমার প্রাপ্ত স্কোর: {correctCount} / {totalCount} ({percentage}%)
          </h4>
          <p style={{ fontSize: '0.85rem', color: '#3c4043', margin: '0 0 12px 0' }}>
            {resultGrade.text}
          </p>

          <button
            onClick={() => {
              setAnswers({});
              setIsSubmitted(false);
              setCurrentIndex(0);
              if (onRetake) onRetake();
            }}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '8px 18px',
              borderRadius: '18px',
              backgroundColor: '#1a73e8',
              color: '#ffffff',
              border: 'none',
              fontWeight: 600,
              fontSize: '0.84rem',
              cursor: 'pointer',
              boxShadow: '0 1px 4px rgba(26, 115, 232, 0.3)'
            }}
          >
            <RefreshCw size={14} />
            <span>নতুন ২০টি প্রশ্নের পরীক্ষা দিন</span>
          </button>
        </div>
      )}
    </div>
  );
}
