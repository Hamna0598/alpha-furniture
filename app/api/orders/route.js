import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

function getDeliveryDate(days) {
  const d = new Date();
  d.setDate(d.getDate() + days);
  return d.toLocaleDateString('en-PK', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
}

function generateOrderId() {
  return 'AF-' + Math.random().toString(36).slice(2, 10).toUpperCase();
}

export async function POST(request) {
  try {
    const body = await request.json();
    const { customerName, email, phone, address, city, items, paymentMethod, notes } = body;

    if (!customerName || !phone || !address || !city || !items?.length || !paymentMethod) {
      return NextResponse.json({ success: false, message: 'Missing required fields' }, { status: 400 });
    }

    const subtotal    = items.reduce((s, i) => s + (i.price * i.quantity), 0);
    const deliveryFee = subtotal >= 10000 ? 0 : 500;
    const total       = subtotal + deliveryFee;
    const orderId     = generateOrderId();

    const { error } = await supabase.from('orders').insert({
      order_id:       orderId,
      customer_name:  customerName,
      email:          email || '',
      phone,
      address,
      city,
      items,
      subtotal,
      delivery_fee:   deliveryFee,
      total,
      payment_method: paymentMethod,
      notes:          notes || '',
      status:         'pending',
    });

    if (error) {
      console.error('Supabase insert error:', error.message);
      return NextResponse.json({ success: false, message: 'Failed to save order' }, { status: 500 });
    }

    const whatsappMsg = encodeURIComponent(
      `🛒 *New Order Received!*\n\n` +
      `*Order ID:* ${orderId}\n` +
      `*Customer:* ${customerName}\n` +
      `*Phone:* ${phone}\n` +
      `*City:* ${city}\n` +
      `*Items:* ${items.length} product(s)\n` +
      `*Total:* PKR ${total.toLocaleString()}\n` +
      `*Payment:* ${paymentMethod}\n` +
      `*Address:* ${address}\n\n` +
      `Please confirm this order.`
    );

    return NextResponse.json({
      success: true,
      message: 'Order placed successfully!',
      data: {
        orderId,
        total,
        subtotal,
        deliveryFee,
        status:            'pending',
        estimatedDelivery: `${getDeliveryDate(5)} — ${getDeliveryDate(7)}`,
        guaranteedBy:      getDeliveryDate(7),
        whatsappUrl:       `https://wa.me/923214877048?text=${whatsappMsg}`,
        customerName,
        phone,
        paymentMethod,
      },
    });

  } catch (err) {
    console.error('Order error:', err);
    return NextResponse.json({ success: false, message: 'Server error' }, { status: 500 });
  }
}

export async function GET() {
  const { data, error } = await supabase
    .from('orders')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  return NextResponse.json({ success: true, data });
}