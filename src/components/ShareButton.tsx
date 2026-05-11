import React, { useState } from 'react';
import { toast } from './Toast';

interface ShareButtonProps {
  title: string;
  url?: string;
  size?: number;
}

export const ShareButton: React.FC<ShareButtonProps> = ({ title, url, size = 18 }) => {
  const [showOptions, setShowOptions] = useState(false);
  const shareUrl = url || window.location.href;

  const shareWhatsApp = () => {
    window.open(`https://wa.me/?text=${encodeURIComponent(title + ' - ' + shareUrl)}`, '_blank');
    setShowOptions(false);
  };

  const shareFacebook = () => {
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`, '_blank');
    setShowOptions(false);
  };

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      toast.success('تم نسخ الرابط');
    } catch {
      toast.error('فشل نسخ الرابط');
    }
    setShowOptions(false);
  };

  return (
    <div style={{ position: 'relative', display: 'inline-block' }}>
      <button onClick={() => setShowOptions(!showOptions)} style={{
        background: 'none', border: 'none', cursor: 'pointer', padding: 4, fontSize: size,
      }}>
        📤
      </button>
      
      {showOptions && (
        <div style={{
          position: 'absolute', top: '100%', right: 0, background: 'white', borderRadius: 12,
          boxShadow: '0 8px 24px rgba(0,0,0,0.15)', padding: 8, zIndex: 100,
          display: 'flex', flexDirection: 'column', gap: 4, minWidth: 160,
        }}>
          <button onClick={shareWhatsApp} style={optionStyle}>💬 واتساب</button>
          <button onClick={shareFacebook} style={optionStyle}>📘 فيسبوك</button>
          <button onClick={copyLink} style={optionStyle}>📋 نسخ الرابط</button>
        </div>
      )}
    </div>
  );
};

const optionStyle: React.CSSProperties = {
  background: 'none', border: 'none', cursor: 'pointer', padding: '8px 12px',
  borderRadius: 8, textAlign: 'right', fontSize: 13, fontWeight: 500,
};
