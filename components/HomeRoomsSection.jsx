import Link from 'next/link';
import Arrow from './Arrow';
import { EVENTS, eventHref } from '@/data/events';

export default function HomeRoomsSection() {
  const [a, b, c] = EVENTS;
  return (
    <section className="sec" id="rooms" style={{ paddingTop: 0 }}>
      <div className="wrap">
        <div className="row-head">
          <div className="sec-head rv">
            <span className="kicker">Rooms</span>
            <h2 className="h2">Where members meet and learn from each other.</h2>
          </div>
          <Link className="tlink rv" href="/rooms">All rooms <Arrow className="" /></Link>
        </div>
        <div className="rooms">
          <Link className="room feat2 rv" href={eventHref(a)}>
            <div className="rings"><i /><i /><i /></div>
            <div className="top"><span className="kicker">{a.format}</span><span className="date-pill">{a.date}</span></div>
            <div className="cover"><img src={a.img} alt="" /></div>
            <h3>{a.title}</h3>
            <div className="sp"><span>{a.speaker}</span><Arrow className="" /></div>
          </Link>
          {[b, c].map((e, i) => (
            <Link key={e.title} className={`room h rv d${i + 1}${i ? ' alt' : ''}`} href={eventHref(e)}>
              <div className="cover"><img src={e.img} alt="" loading="lazy" /></div>
              <div className="txt">
                <div className="top"><span className="kicker">{e.format}</span><span className="date-pill">{e.date}</span></div>
                <h3 style={{ fontSize: 'clamp(20px,1.9vw,26px)' }}>{e.title}</h3>
                <div className="sp"><span>{e.speaker.split(' · ')[0]} · recording for members</span><Arrow className="" /></div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
