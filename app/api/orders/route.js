import { NextResponse } from 'next/server';
import { v4 as uuidv4 } from 'uuid';

// In-memory store (use DB in production)
const orders = [];

function getDeliveryDate(days) {
  const d = new Date();
  d.setDate(d.getDate() + days);
  return d.toLocaleDateString('en-PK', { weekday:'long', year:'numeric', month:'long', day:'numeric' });
}

export async function POST(request) {
  try {
    const body = await request.json();
    const { customerName, email, phone, address, city, items, paymentMethod, notes } = body;

    if (!customerName || !phone || !address || !city || !items?.length || !paymentMethod) {
      return NextResponse.json({ success:false, message:'Missing required fields' }, { status:400 });
    }

    const subtotal    = items.reduce((s, i) => s + (i.price * i.quantity), 0);
    const deliveryFee = subtotal >= 10000 ? 0 : 500;
    const total       = subtotal + deliveryFee;

    const order = {
      orderId:   `AF-${uuidv4().slice(0,8).toUpperCase()}`,
      customerName, email, phone, address, city,
      items, subtotal, deliveryFee, total, paymentMethod,
      notes: notes || '',
      status:    'pending',
      createdAt: new Date().toISOString(),
    };

    orders.push(order);

    console.log(`📦 New Order: ${order.orderId} — PKR ${total.toLocaleString()} — ${customerName} — ${paymentMethod}`);

    // WhatsApp notification URL for Alpha Furniture
    const whatsappMsg = encodeURIComponent(
      `🛒 *New Order Received!*\n\n` +
      `*Order ID:* ${order.orderId}\n` +
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
        orderId:           order.orderId,
        total:             order.total,
        subtotal:          order.subtotal,
        deliveryFee:       order.deliveryFee,
        status:            order.status,
        estimatedDelivery: `${getDeliveryDate(5)} — ${getDeliveryDate(7)}`,
        guaranteedBy:      getDeliveryDate(7),
        whatsappUrl:       `https://wa.me/923214877048?text=${whatsappMsg}`,
        customerName,
        phone,
        paymentMethod,
      },
    });
  } catch (err) {
    return NextResponse.json({ success:false, message:'Server error' }, { status:500 });
  }
}

export async function GET() {
  return NextResponse.json({ success:true, data:orders });
}
