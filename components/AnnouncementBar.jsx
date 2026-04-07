'use client';
import { useState } from 'react';

const MESSAGES = [
  '🚚  Free Delivery on orders above PKR 10,000',
  '📞  Call / WhatsApp: +92 321 4877048',
  '📍  Ichra Furniture Market, Street #83 Rasool Pura Colony, Lahore',
  '✨  Solid Sheesham Wood — Quality is our First Priority',
  '🛡️  2-Year Warranty on all Bedroom Sets',
  '🎁  Visit our Showroom for Special Discounts',
];

export default function AnnouncementBar() {
  const [visible, setVisible] = useState(true);
  if (!visible) return null;
  const ticker = [...MESSAGES, ...MESSAGES].join('   •   ');
  return (
    <aside style={{ background:'var(--obsidian)', borderBottom:'1px solid rgba(201,168,76,0.18)', padding:'.45rem 0', position:'relative', overflow:'hidden' }}>
      <div style={{ overflow:'hidden', whiteSpace:'nowrap' }}>
        <span style={{ display:'inline-block', animation:'marquee 45s linear infinite', fontFamily:'var(--ff-caps)', fontSize:'.58rem', letterSpacing:'.18em', color:'var(--gold-light)', textTransform:'uppercase', paddingRight:'4rem' }}>
          {ticker}
        </span>
      </div>
      <button onClick={() => setVisible(false)} style={{ position:'absolute', right:'.8rem', top:'50%', transform:'translateY(-50%)', background:'none', border:'none', color:'rgba(201,168,76,.4)', cursor:'pointer', fontSize:'.75rem', padding:'4px' }}>✕</button>
    </aside>
  );
}
