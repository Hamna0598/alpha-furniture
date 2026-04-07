'use client';
import { useState } from 'react';
import Link from 'next/link';
import styles from './contact.module.css';

export default function ContactPage() {
  const [form, setForm] = useState({ name:'', email:'', phone:'', message:'' });
  const [sent, setSent]   = useState(false);
  const [sending, setSending] = useState(false);

  const handle = e => setForm(f=>({...f,[e.target.name]:e.target.value}));
  const submit = async e => {
    e.preventDefault();
    setSending(true);
    try {
      await fetch('/api/contact', { method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify(form) });
      setSent(true);
    } catch {}
    setSending(false);
  };

  return (
    <>
      <header className="page-header">
        <div className="container">
          <h1 className="page-header__title">Contact <em>Us</em></h1>
          <nav className="breadcrumb"><Link href="/">Home</Link><span>›</span><span>Contact</span></nav>
        </div>
      </header>
      <section className={styles.section}>
        <div className="container">
          <div className={styles.grid}>
            <div>
              {sent ? (
                <div className={styles.successMsg}>
                  <span>✓</span><h3>Message Sent!</h3>
                  <p>We'll get back to you within 24 hours at <strong>{form.phone || form.email}</strong>.</p>
                </div>
              ) : (
                <form onSubmit={submit} className={styles.form}>
                  <h2 className={styles.formTitle}>Send Us a Message</h2>
                  <div className="form-group"><label>Full Name *</label><input name="name" type="text" value={form.name} onChange={handle} required placeholder="Ahmed Raza"/></div>
                  <div className="form-group"><label>Email</label><input name="email" type="email" value={form.email} onChange={handle} placeholder="you@example.com"/></div>
                  <div className="form-group"><label>Phone / WhatsApp *</label><input name="phone" type="tel" value={form.phone} onChange={handle} required placeholder="+92 321 4877048"/></div>
                  <div className="form-group"><label>Message *</label><textarea name="message" rows={4} value={form.message} onChange={handle} required placeholder="Tell us how we can help..."/></div>
                  <button type="submit" className="btn btn--primary btn--full" disabled={sending}>{sending?'Sending...':'Send Message'}</button>
                </form>
              )}
            </div>
            <div className={styles.infoSide}>
              <h2 className={styles.formTitle}>Get In Touch</h2>
              {[
                {icon:'📍',label:'Address',val:'Street #83 Rasool Pura Colony, Ichra Furniture Market, Lahore 54600, Pakistan'},
                {icon:'📞',label:'Phone',val:'+92 321 4877048'},
                {icon:'💬',label:'WhatsApp',val:'+92 321 4877048'},
                {icon:'✉️',label:'Email',val:'info@alphafurniture.pk'},
                {icon:'🕐',label:'Hours',val:'Monday – Saturday: 10:00am – 8:00pm'},
              ].map(i=>(
                <div key={i.label} className={styles.contactItem}>
                  <span>{i.icon}</span>
                  <div><strong>{i.label}</strong><p>{i.val}</p></div>
                </div>
              ))}
              <a href="https://wa.me/923214877048" target="_blank" rel="noopener noreferrer" className={`btn btn--dark ${styles.waBtn}`}>
                💬 Chat on WhatsApp
              </a>
              <div className={styles.map}>
                <iframe src="https://maps.google.com/maps?q=Ichra+Furniture+Market+Lahore&output=embed&z=15" width="100%" height="220" style={{border:'none',display:'block'}} title="Alpha Furniture" loading="lazy"/>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
