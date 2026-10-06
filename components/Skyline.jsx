'use client';
import { useEffect, useRef } from 'react';
import { startCity } from '@/lib/city';

// City drawn in perspective (canvas, code in lib/city.js). band = shorter page header version.
export default function Skyline({ band = false }) {
  const ref = useRef(null);
  useEffect(() => startCity(ref.current), []);
  return (
    <div className={'sk' + (band ? ' band' : '')} aria-hidden="true" ref={ref}>
      <div className="sk-glow" />
      <canvas className="sk-cv" />
      <div className="gl-grain" />
      <div className="sk-vig" />
    </div>
  );
}
