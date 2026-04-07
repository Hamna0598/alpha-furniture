import { NextResponse } from 'next/server';
import products from '@/lib/products';

export async function GET() {
  const cats = [...new Set(products.map(p => p.category))];
  return NextResponse.json({ success:true, data:cats });
}
