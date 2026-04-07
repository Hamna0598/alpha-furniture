'use client';
import { useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';

export default function CategoryPage() {
  const router = useRouter();
  const { category } = useParams();
  useEffect(() => { router.replace(`/shop?category=${category}`); }, [category]);
  return null;
}
