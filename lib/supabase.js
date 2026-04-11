import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseKey);

// Fetch products with optional filters
export async function fetchProducts({ category, featured, search, sort } = {}) {
  let query = supabase.from('products').select('*');

  if (category) query = query.eq('category', category);
  if (featured) query = query.eq('is_featured', true);
  if (search)   query = query.ilike('name', `%${search}%`);
  if (sort === 'price-asc')  query = query.order('price', { ascending: true });
  if (sort === 'price-desc') query = query.order('price', { ascending: false });

  const { data, error } = await query;
  if (error) throw error;
  return data || [];
}

// Save an order to Supabase
export async function saveOrder(order) {
  const { data, error } = await supabase
    .from('orders')
    .insert([order])
    .select()
    .single();
  if (error) throw error;
  return data;
}

// Save a contact message
export async function saveContact(msg) {
  const { data, error } = await supabase
    .from('contacts')
    .insert([msg])
    .select()
    .single();
  if (error) throw error;
  return data;
}