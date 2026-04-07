import { NextResponse } from 'next/server';
import products from '@/lib/products';

export async function GET(request, { params }) {
  const product = products.find(p => p.slug === params.slug || p.id === params.slug);
  if (!product) return NextResponse.json({ success:false, message:'Not found' }, { status:404 });
  const related = products.filter(p => p.category === product.category && p.id !== product.id).slice(0,4);
  return NextResponse.json({ success:true, data:product, related });
}
