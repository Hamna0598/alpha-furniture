import { NextResponse } from 'next/server';
import { fetchProducts } from '@/lib/supabase';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const filters = {
      category: searchParams.get('category') || undefined,
      featured:  searchParams.get('featured') === 'true' ? true : undefined,
      search:   searchParams.get('search') || undefined,
      sort:     searchParams.get('sort') || undefined,
    };

    const rawData = await fetchProducts(filters);

    // Normalize Supabase column names back to camelCase for the frontend
    const data = rawData.map(p => ({
      id:            p.id,
      name:          p.name,
      slug:          p.slug,
      category:      p.category,
      subcategory:   p.subcategory,
      price:         p.price,
      originalPrice: p.original_price,
      badge:         p.badge,
      inStock:       p.in_stock,
      stockQty:      p.stock_qty,
      rating:        p.rating,
      reviewCount:   p.review_count,
      isFeatured:    p.is_featured,
      isNew:         p.is_new,
      description:   p.description,
      images:        p.images || [],
      colors:        p.colors || [],
      specifications: p.specifications || {},
    }));

    return NextResponse.json({ success: true, data });
  } catch (err) {
    console.error('Products API error:', err.message);
    return NextResponse.json(
      { success: false, message: err.message },
      { status: 500 }
    );
  }
}