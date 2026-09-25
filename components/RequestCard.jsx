'use client';
import { useEffect, useState } from 'react';

const REQUESTS = [
  { q: 'Looking for a co-investor who knows GCC fintech at Series A.', tags: ['Fintech', 'Series A', 'GCC', '$250–500k'],
    people: [['FO', 'Family office principal', 'Dubai · 6 fintech deals'], ['GP', 'Fund partner, early stage', 'London · MENA thesis'], ['CV', 'Corporate venture lead', 'Riyadh · payments']] },
  { q: 'Need a lead investor for a climate seed round in Europe.', tags: ['Climate', 'Seed', 'EU', 'Lead'],
    people: [['GP', 'Climate fund partner', 'Amsterdam · 14 seed deals'], ['AN', 'Angel, ex-operator', 'Berlin · energy'], ['LP', 'LP in two climate funds', 'Zurich']] },
  { q: 'Travelling to London — who is worth meeting on AI infrastructure?', tags: ['AI infra', 'City intro', 'London'],
    people: [['SY', 'Syndicate lead', 'London · deep tech'], ['FO', 'Single family office', 'London · AI & data'], ['GP', 'Growth fund partner', 'London · infra']] },
];

// Example sample requests, placeholders for illustration only.
export default function RequestCard() {
  const [i, setI] = useState(0);
  const [typed, setTyped] = useState('');
  const [stage, setStage] = useState(0); // 0 typing, 1 tags, 2 matching, 3 done
  const [shown, setShown] = useState(0);
  const r = REQUESTS[i % REQUESTS.length];

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const timers = [];
    const T = (fn, ms) => timers.push(setTimeout(fn, ms));
    setTyped(''); setStage(0); setShown(0);
    const done = (base) => {
      T(() => setStage(1), base);
      T(() => { setStage(2); window.dispatchEvent(new Event('legends:match')); }, base + 500);
      r.people.forEach((_, k) => T(() => setShown(k + 1), base + 1100 + k * 380));
      T(() => setStage(3), base + 2400);
      if (!reduce) T(() => setI((x) => x + 1), base + 7200);
    };
    if (reduce) { setTyped(r.q); done(0); }
    else {
      let c = 0;
      const iv = setInterval(() => { c++; setTyped(r.q.slice(0, c)); if (c >= r.q.length) { clearInterval(iv); done(0); } }, 28);
      timers.push({ iv });
    }
    return () => timers.forEach((t) => (t && t.iv ? clearInterval(t.iv) : clearTimeout(t)));
  }, [i]); // eslint-disable-line react-hooks/exhaustive-deps

  const label = ['Typing…', 'Typing…', 'Matching…', '3 matches'][stage];
  return (
    <aside className="reqcard rv d2" aria-label="Example of a member request">
      <div className="rc-top"><span className="kicker">Live request</span><span className="rc-step">{label}</span></div>
      <p className="rc-q"><span>{typed}</span><span className="caret" /></p>
      <div className="rc-tags">
        {stage >= 1 && r.tags.map((t, k) => <TagIn key={i + t} delay={120 * k}>{t}</TagIn>)}
      </div>
      <div className="rc-list">
        {r.people.map((p, k) => (
          <div key={i + '-' + k} className={'rc-p' + (k < shown ? ' in' : '')}>
            <div className="av">{p[0]}</div>
            <div><b>{p[1]}</b><small>{p[2]}</small></div>
            <span className="fit">{k < 2 ? 'Strong fit' : 'Good fit'}</span>
          </div>
        ))}
      </div>
      <div className={'rc-foot' + (stage === 3 ? ' in' : '')}>
        <i><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M5 12l5 5 9-10" /></svg></i>
        Checked by the team · intro after both sides consent
      </div>
    </aside>
  );
}

function TagIn({ delay, children }) {
  const [on, setOn] = useState(false);
  useEffect(() => { const t = setTimeout(() => setOn(true), delay + 20); return () => clearTimeout(t); }, [delay]);
  return <span className={on ? 'in' : ''}>{children}</span>;
}
