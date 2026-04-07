import { NextResponse } from 'next/server';
import products from '@/lib/products';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get('category');
  const search   = searchParams.get('search');
  const featured = searchParams.get('featured');
  const sort     = searchParams.get('sort');

  let result = [...products];
  if (category) result = result.filter(p => p.category === category);
  if (featured) result = result.filter(p => p.isFeatured);
  if (search)   result = result.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    p.category.toLowerCase().includes(search.toLowerCase())
  );
  if (sort === 'price-asc')  result.sort((a,b) => a.price - b.price);
  if (sort === 'price-desc') result.sort((a,b) => b.price - a.price);

  return NextResponse.json({ success:true, data:result });
}
