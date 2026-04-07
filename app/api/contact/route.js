import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const body = await request.json();
    const { name, email, phone, message } = body;
    if (!name || !message) return NextResponse.json({ success:false, message:'Name and message required' }, { status:400 });
    console.log(`📩 Contact: ${name} <${email}> — ${message.slice(0,80)}`);
    return NextResponse.json({ success:true, message:'Message received! We will contact you within 24 hours.' });
  } catch {
    return NextResponse.json({ success:false, message:'Server error' }, { status:500 });
  }
}
