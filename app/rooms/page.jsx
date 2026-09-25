import Link from 'next/link';
import EventsGrid from '@/components/EventsGrid';
import Inside from '@/components/Inside';

export const metadata = { title: "Legends \u2014 Rooms" };

export default function Page() {
  return (
    <>
      <section className="phero">
        <img className="sym" src="/brand/symbol.png" alt="" />
        <div className="wrap">
          <div className="crumbs"><Link href="/">Home</Link><span>/</span><span>Rooms</span></div>
          <h1 className="h1 rv" style={{marginTop:"22px"}}>Rooms where everyone is vetted.</h1>
          <p className="lead rv d1">Online InvestHacks, closed rooms and small dinners in the cities where capital actually meets.</p>
        </div>
      </section>
      <section className="sec" style={{paddingTop:"0"}}>
        <div className="wrap">
          <EventsGrid />
        </div>
      </section>
      <section className="sec" style={{paddingTop:"0"}}>
        <div className="wrap">
          <div className="sec-head rv"><span className="kicker">Formats</span><h2 className="h2">Four ways to be in the room.</h2></div>
          <div className="formats">
            <div className="fmt rv"><b>InvestHack</b><h4>The operating knowledge behind a result</h4><p>Decisions, systems, mistakes and lessons — from the person who made them.</p></div>
            <div className="fmt rv d1"><b>Meet the Legends</b><h4>The journey behind the name</h4><p>A person-first conversation about how the guest got to what they know today.</p></div>
            <div className="fmt rv d2"><b>Closed Room</b><h4>After the audience leaves</h4><p>A smaller members-only conversation right after the open session.</p></div>
            <div className="fmt rv d3"><b>Private formats</b><h4>Dinners and small gatherings</h4><p>Eight seats, one table, people at the same level.</p></div>
          </div>
        </div>
      </section>
      <Inside />
    </>
  );
}
