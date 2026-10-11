import React, { useState } from 'react';
import { Copy, Check } from 'lucide-react';

export function GeminiMarkdownRenderer({ content = '', isStreaming = false }) {
  const [copiedIndex, setCopiedIndex] = useState(null);

  if (!content) return null;

  // Split by code blocks first
  const parts = content.split(/(```[\s\S]*?```)/g);

  const handleCopyCode = (index, codeText) => {
    navigator.clipboard.writeText(codeText);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <div style={{ lineHeight: 1.7, fontSize: '0.94rem', color: '#1f1f1f' }}>
      {parts.map((part, index) => {
        // Code Block
        if (part.startsWith('```') && part.endsWith('```')) {
          const lines = part.slice(3, -3).trim().split('\n');
          const firstLine = lines[0].trim();
          const isLang = /^[a-zA-Z0-9_-]+$/.test(firstLine);
          const language = isLang ? firstLine : '';
          const codeBody = isLang ? lines.slice(1).join('\n') : lines.join('\n');

          return (
            <div
              key={index}
              style={{
                margin: '14px 0',
                borderRadius: '12px',
                overflow: 'hidden',
                backgroundColor: '#1e1f20',
                color: '#e3e3e3',
                fontFamily: 'Consolas, Monaco, "Courier New", monospace',
                fontSize: '0.86rem',
                boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
              }}
            >
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '8px 14px',
                backgroundColor: '#282a2c',
                borderBottom: '1px solid #3c4043',
                fontSize: '0.74rem',
                color: '#c4c7c5'
              }}>
                <span>{language || 'code'}</span>
                <button
                  onClick={() => handleCopyCode(index, codeBody)}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: copiedIndex === index ? '#81c995' : '#c4c7c5',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                    fontSize: '0.72rem'
                  }}
                >
                  {copiedIndex === index ? <Check size={13} /> : <Copy size={13} />}
                  <span>{copiedIndex === index ? 'কপি হয়েছে' : 'কপি করুন'}</span>
                </button>
              </div>
              <pre style={{
                margin: 0,
                padding: '12px 16px',
                overflowX: 'auto',
                lineHeight: 1.5
              }}>
                <code>{codeBody}</code>
              </pre>
            </div>
          );
        }

        // Regular Markdown Text
        const paragraphs = part.split('\n');

        return (
          <React.Fragment key={index}>
            {paragraphs.map((line, lIdx) => {
              const trimmed = line.trim();

              if (!trimmed) {
                return <div key={lIdx} style={{ height: '8px' }} />;
              }

              // H3 Heading
              if (trimmed.startsWith('### ')) {
                return (
                  <h3 key={lIdx} style={{
                    fontSize: '1.15rem',
                    fontWeight: 700,
                    color: '#1a73e8',
                    margin: '16px 0 8px',
                    letterSpacing: '-0.01em'
                  }}>
                    {renderInlineFormatting(trimmed.slice(4))}
                  </h3>
                );
              }

              // H4 Heading
              if (trimmed.startsWith('#### ')) {
                return (
                  <h4 key={lIdx} style={{
                    fontSize: '1rem',
                    fontWeight: 700,
                    color: '#1f1f1f',
                    margin: '12px 0 6px'
                  }}>
                    {renderInlineFormatting(trimmed.slice(5))}
                  </h4>
                );
              }

              // Blockquote
              if (trimmed.startsWith('> ')) {
                return (
                  <blockquote key={lIdx} style={{
                    margin: '10px 0',
                    padding: '8px 16px',
                    backgroundColor: '#f0f4f9',
                    borderLeft: '4px solid #4285F4',
                    borderRadius: '4px 8px 8px 4px',
                    fontStyle: 'italic',
                    color: '#3c4043'
                  }}>
                    {renderInlineFormatting(trimmed.slice(2))}
                  </blockquote>
                );
              }

              // Bullet List Item
              if (trimmed.startsWith('- ') || trimmed.startsWith('* ')) {
                return (
                  <div key={lIdx} style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '8px',
                    margin: '4px 0',
                    paddingLeft: '6px'
                  }}>
                    <span style={{ color: '#4285F4', fontSize: '1.1rem', lineHeight: '1.2' }}>•</span>
                    <span style={{ flex: 1 }}>{renderInlineFormatting(trimmed.slice(2))}</span>
                  </div>
                );
              }

              // Numbered List Item
              const numMatch = trimmed.match(/^(\d+)\.\s+(.*)$/);
              if (numMatch) {
                return (
                  <div key={lIdx} style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '8px',
                    margin: '4px 0',
                    paddingLeft: '4px'
                  }}>
                    <span style={{ fontWeight: 700, color: '#1a73e8', minWidth: '18px' }}>
                      {numMatch[1]}.
                    </span>
                    <span style={{ flex: 1 }}>{renderInlineFormatting(numMatch[2])}</span>
                  </div>
                );
              }

              // Normal Line
              return (
                <div key={lIdx} style={{ margin: '3px 0' }}>
                  {renderInlineFormatting(line)}
                </div>
              );
            })}
          </React.Fragment>
        );
      })}

      {/* Streaming cursor */}
      {isStreaming && (
        <span 
          style={{
            display: 'inline-block',
            width: '8px',
            height: '15px',
            backgroundColor: '#1a73e8',
            marginLeft: '4px',
            verticalAlign: 'middle',
            animation: 'pulse 1s infinite'
          }} 
        />
      )}
    </div>
  );
}

// Inline formatting helper (**bold**, `inline code`, *italic*)
function renderInlineFormatting(text) {
  if (!text) return '';

  // Split by bold (**bold**) and inline code (`code`)
  const tokens = text.split(/(\*\*.*?\*\*|`.*?`)/g);

  return tokens.map((token, i) => {
    if (token.startsWith('**') && token.endsWith('**')) {
      return (
        <strong key={i} style={{ fontWeight: 700, color: '#000000' }}>
          {token.slice(2, -2)}
        </strong>
      );
    }
    if (token.startsWith('`') && token.endsWith('`')) {
      return (
        <code key={i} style={{
          backgroundColor: '#f0f4f9',
          color: '#1a73e8',
          padding: '2px 6px',
          borderRadius: '4px',
          fontFamily: 'monospace',
          fontSize: '0.88em'
        }}>
          {token.slice(1, -1)}
        </code>
      );
    }
    return token;
  });
}
