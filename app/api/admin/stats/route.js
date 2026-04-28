import { NextResponse } from 'next/server';
import products from '@/lib/products';

export async function GET() {
  const totalProducts = products.length;
  const outOfStock    = products.filter(p => !p.inStock).length;
  const lowStock      = products.filter(p => p.inStock && p.stockQty <= 3).length;
  const totalRevenue  = 155400000; // PKR 155.4M as shown in screenshots

  return NextResponse.json({
    success: true,
    data: {
      totalProducts,
      outOfStock,
      lowStock,
      totalRevenue,
      totalOrders:    847,
      totalCustomers: 1284,
      averageRating: (products.reduce((s, p) => s + (p.rating || 0), 0) / (products.length || 1)).toFixed(1),
    },
  });
}
