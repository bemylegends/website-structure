'use client';
import { useEffect } from 'react';
import { startSite } from '@/lib/site';

export default function Interactions() {
  useEffect(() => { startSite(); }, []);
  return null;
}
