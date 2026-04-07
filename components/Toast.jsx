'use client';
import { useEffect, useState } from 'react';

let toastFn = null;
export function showToast(msg, type = 'success') {
  if (toastFn) toastFn(msg, type);
}

export default function Toast() {
  const [toasts, setToasts] = useState([]);
  useEffect(() => {
    toastFn = (msg, type) => {
      const id = Date.now();
      setToasts(p => [...p, { id, msg, type }]);
      setTimeout(() => setToasts(p => p.filter(t => t.id !== id)), 3500);
    };
    return () => { toastFn = null; };
  }, []);
  return (
    <div style={{ position:'fixed', bottom:'1.5rem', right:'1.5rem', zIndex:9999, display:'flex', flexDirection:'column', gap:'.5rem' }}>
      {toasts.map(t => (
        <div key={t.id} style={{ background: t.type === 'error' ? '#8B1A1A' : 'var(--dark)', color: t.type === 'error' ? '#FFE5E5' : 'var(--gold-light)', border:'1px solid var(--gold-border)', padding:'.75rem 1.2rem', fontFamily:'var(--ff-caps)', fontSize:'.65rem', letterSpacing:'.12em', animation:'slideInRight .3s ease', minWidth:'240px', boxShadow:'0 8px 24px rgba(0,0,0,.4)' }}>
          {t.msg}
        </div>
      ))}
    </div>
  );
}
