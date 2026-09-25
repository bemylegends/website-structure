import Link from 'next/link';
import Arrow from './Arrow';
import Countdown from './Countdown';
import AddToCalendar from './AddToCalendar';
import RegisterCard from './RegisterCard';
import EventCard from './EventCard';
import { EVENTS, PAST } from '@/data/events';
import { EVENT_DETAILS } from '@/data/eventDetails';

const Check = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4"><path d="M5 12l5 5 9-10" /></svg>;
const Cross = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4"><path d="M6 6l12 12M18 6L6 18" /></svg>;

// Simple event page: hero → session → speaker → who it's for → register.
export default function EventPage({ slug }) {
  const e = EVENTS.find((x) => x.slug === slug);
  const d = EVENT_DETAILS[slug];
  if (!e || !d) return null;

  return (
    <>
      <section className="ev2-hero">
        <div className="wrap ev2-grid">
          <div>
            <div className="crumbs"><Link href="/">Home</Link><span>/</span><Link href="/events">Events</Link><span>/</span><span>InvestHack</span></div>
            <span className="kicker" style={{ display: 'block', marginTop: 28 }}>{d.kicker} · {e.upcoming ? 'Upcoming' : 'Past'}</span>
            <h1 className="h1 ev-title rv">{e.title}</h1>
            <p className="lead rv d1">{d.lead}</p>
            <div className="ev2-meta rv d1">
              <b>Tue, 29 September 2026</b>
              <span>{d.times.map(([c, t]) => `${t} ${c}`).join(' · ')}</span>
            </div>
            {e.upcoming && <div className="rv d2"><Countdown to={d.startsAt} /></div>}
            <div className="ctas rv d2">
              <a className="btn gold" href="#register">Request a seat <Arrow /></a>
              <AddToCalendar title={e.title} start={d.startsAt} durationMin={d.durationMin} />
            </div>
          </div>
          <div className="ev2-photo rv d1">
            <img src={d.speaker.heroPhoto || d.speaker.photo} alt={d.speaker.name} />
            <div className="ev2-name"><b>{d.speaker.name}</b><small>{d.speaker.role}</small></div>
          </div>
        </div>
      </section>

      <section className="sec" style={{ paddingTop: 0 }}>
        <div className="wrap ev2-body">
          <div className="ev2-block rv">
            <span className="kicker">The session</span>
            <h2 className="h2 ev2-h">{d.thesis.title}</h2>
            <p className="lead">{d.thesis.text}</p>
            <div className="ev2-facts">{d.thesis.facts.map(([v, l]) => <div key={l}><b>{v}</b><span>{l}</span></div>)}</div>
          </div>

          <div className="ev2-block rv">
            <span className="kicker">What you will take away</span>
            <ol className="ev2-agenda">
              {d.agenda.map(([t, p], k) => <li key={t}><span>0{k + 1}</span><div><h3>{t}</h3><p>{p}</p></div></li>)}
            </ol>
          </div>

          <div className="ev2-block ev2-speaker rv">
            <img src={d.speaker.photo} alt="" />
            <div>
              <span className="kicker">The speaker</span>
              <h3>{d.speaker.name}</h3>
              <p className="sp-role">{d.speaker.role}</p>
              <p>{d.speaker.bio}</p>
            </div>
          </div>

          <div className="ev2-block ev2-fit rv">
            <div><span className="kicker">Who it’s for</span><ul className="list">{d.forWho.map((x) => <li key={x}><Check />{x}</li>)}</ul></div>
            <div><span className="kicker">Not the place for</span><ul className="list no">{d.notFor.map((x) => <li key={x}><Cross />{x}</li>)}</ul></div>
          </div>

          <div className="ev2-reg rv">
            <div>
              <span className="kicker">How access works</span>
              <h2 className="h2 ev2-h">A small group, reviewed by people.</h2>
              <ol className="ev2-steps">{d.access.map(([t, p]) => <li key={t}><b>{t}.</b> {p}</li>)}</ol>
              <p className="note-s">{d.note}</p>
            </div>
            <RegisterCard times={d.times} />
          </div>
        </div>
      </section>

      <section className="sec" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <div className="row-head">
            <div className="sec-head rv"><span className="kicker">Past InvestHacks</span><h2 className="h2">Recordings stay with members.</h2></div>
            <Link className="tlink rv" href="/events">All events <Arrow className="" /></Link>
          </div>
          <div className="evgrid">{PAST.slice(0, 3).map((x) => <EventCard key={x.title + x.date} e={x} />)}</div>
        </div>
      </section>

      {e.upcoming && <a className="ev-sticky" href="#register">Request a seat <Arrow /></a>}
    </>
  );
}
