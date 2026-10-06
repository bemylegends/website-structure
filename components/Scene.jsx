'use client';
import { useEffect, useRef } from 'react';
import { startTable, startInsight } from '@/lib/scene';

// Line-drawn 3D scene for page headers: kind="table" (Events) or "book" (Blog).
export default function Scene({ kind, only = false }) {
  const ref = useRef(null);
  useEffect(() => (kind === 'insight' ? startInsight : startTable)(ref.current), [kind]);
  return <div className={'scene' + (only ? ' only' : '')} data-scene={kind} data-only={only ? '1' : undefined} ref={ref} aria-hidden="true"><canvas /></div>;
}
