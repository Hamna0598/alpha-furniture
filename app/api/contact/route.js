import { NextResponse } from 'next/server';
import { saveContact } from '@/lib/supabase';

export async function POST(request) {
  try {
    const body = await request.json();
    const { name, email, phone, message } = body;

    if (!name || !message) {
      return NextResponse.json(
        { success: false, message: 'Name and message are required' },
        { status: 400 }
      );
    }

    // Save to Supabase contacts table
    await saveContact({ name, email: email || '', phone: phone || '', message });

    console.log(`📩 Contact saved: ${name} <${email}> — "${message.slice(0,60)}..."`);

    return NextResponse.json({
      success: true,
      message: 'Message received! We will contact you within 24 hours.'
    });
  } catch (err) {
    console.error('Contact error:', err.message);
    return NextResponse.json(
      { success: false, message: 'Server error — please try again' },
      { status: 500 }
    );
  }
}