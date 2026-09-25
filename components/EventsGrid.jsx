'use client';
import { useState } from 'react';
import Link from 'next/link';
import { EVENTS, eventHref } from '@/data/events';

const FILTERS = [['all', 'All'], ['up', 'Upcoming'], ['past', 'Past'], ['online', 'Online'], ['offline', 'In person']];
const match = (f, e) => f === 'all' || (f === 'up' && e.upcoming) || (f === 'past' && !e.upcoming) || (f === 'online' && e.online) || (f === 'offline' && !e.online);

export default function EventsGrid() {
  const [f, setF] = useState('all');
  return (
    <>
      <div className="filters">
        {FILTERS.map(([k, l]) => <button key={k} className={f === k ? 'on' : ''} onClick={() => setF(k)}>{l}</button>)}
      </div>
      <div className="evgrid">
        {EVENTS.filter((e) => match(f, e)).map((e) => (
          <Link key={e.title + e.date} className="ev rv in" href={eventHref(e)}>
            <div className="cv"><img loading="lazy" src={e.img} alt="" /></div>
            <div className="bd">
              <div className="meta"><span className="kicker">{e.format}</span><span>{e.upcoming ? 'Upcoming' : e.date}</span></div>
              <h3>{e.title}</h3>
              <span className="sp">{e.speaker}</span>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
}
