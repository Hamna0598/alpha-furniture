import { NextResponse } from 'next/server';
import { v4 as uuidv4 } from 'uuid';
import { saveOrder } from '@/lib/supabase';

function getDeliveryDate(days) {
  const d = new Date();
  d.setDate(d.getDate() + days);
  return d.toLocaleDateString('en-PK', {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
  });
}

export async function POST(request) {
  try {
    const body = await request.json();
    const { customerName, email, phone, address, city,
            items, paymentMethod, notes } = body;

    if (!customerName || !phone || !address || !city || !items?.length || !paymentMethod) {
      return NextResponse.json(
        { success: false, message: 'Missing required fields' },
        { status: 400 }
      );
    }

    const subtotal    = items.reduce((s, i) => s + (i.price * i.quantity), 0);
    const deliveryFee = subtotal >= 10000 ? 0 : 500;
    const total       = subtotal + deliveryFee;
    const orderId     = `AF-${uuidv4().slice(0,8).toUpperCase()}`;

    // Save to Supabase — permanently stored!
    await saveOrder({
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

    console.log(`📦 Order saved: ${orderId} — PKR ${total.toLocaleString()} — ${customerName} — ${city}`);

    // WhatsApp message for Alpha Furniture (your number)
    const whatsappMsg = encodeURIComponent(
      `🛒 *New Alpha Furniture Order!*\n\n` +
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
        status: 'pending',
        estimatedDelivery: `${getDeliveryDate(5)} — ${getDeliveryDate(7)}`,
        guaranteedBy:      getDeliveryDate(7),
        whatsappUrl:       `https://wa.me/923214877048?text=${whatsappMsg}`,
        customerName,
        phone,
        paymentMethod,
      },
    });
  } catch (err) {
    console.error('Orders error:', err.message);
    return NextResponse.json(
      { success: false, message: 'Server error — please try again' },
      { status: 500 }
    );
  }
}

export async function GET() {
  // Orders are in Supabase — view them in Supabase Table Editor
  return NextResponse.json({ success: true, message: 'View orders in Supabase dashboard' });
}