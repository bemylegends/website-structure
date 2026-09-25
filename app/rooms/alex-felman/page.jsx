import Link from 'next/link';

export const metadata = { title: "Legends \u2014 InvestHack with Alex Felman" };

export default function Page() {
  return (
    <>
      <section className="phero">
        <div className="wrap">
          <div className="crumbs"><Link href="/">Home</Link><span>/</span><Link href="/rooms">Rooms</Link><span>/</span><span>InvestHack</span></div>
          <div className="evhero" style={{marginTop:"28px"}}>
            <div>
              <span className="kicker">Online InvestHack · Upcoming</span>
              <h1 className="h1 rv" style={{fontSize:"clamp(38px,4.6vw,64px)"}}>How a $200M+ family office decides what gets a $1–10M direct investment</h1>
              <p className="lead rv d1">Some investments take years to understand — and a decade to prove. Join Alex Felman to explore how scientific thinking and patient capital lead to a yes.</p>
              <div className="evfacts rv d2">
                <span><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="5" width="18" height="16" rx="4"/><path d="M8 3v4M16 3v4M3 10h18"/></svg>Tue, 29 September 2026</span>
                <span><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>17:00 GST</span>
                <span><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="6" width="13" height="12" rx="3"/><path d="M16 10l5-3v10l-5-3"/></svg>Online · Zoom</span>
              </div>
              <div className="ctas rv d3"><Link className="btn gold" href="/apply">Reserve a seat <svg className="arr" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M13 6l6 6-6 6"/></svg></Link><Link className="btn ghost" href="/login">Members: join from your account</Link></div>
            </div>
            <div className="cover-lg rv d1"><img src="https://belegends.club/api/files/pbc_1687431684/8orlny5gc6hpprk/how_200_m_family_office_decides_what_gets_1_10_m_direct_investment_bd2byiyiet.png" alt="" /></div>
          </div>
        </div>
      </section>
      <section className="sec" style={{paddingTop:"0"}}>
        <div className="wrap">
          <div className="sec-head rv"><span className="kicker">The session</span><h2 className="h2">From the first look to a yes.</h2></div>
          <div className="agenda">
            <div className="step rv"><span className="n">01</span><h3>The journey</h3><p>How a scientist and educator ended up running patient capital for a family office.</p></div>
            <div className="step rv d1"><span className="n">02</span><h3>The InvestHack</h3><p>What a $200M+ family office checks before committing $1–10M directly.</p></div>
            <div className="step rv d2"><span className="n">03</span><h3>The Closed Room</h3><p>Members stay for deeper questions immediately after the open session.</p></div>
          </div>
        </div>
      </section>
      <section className="sec" style={{paddingTop:"0"}}>
        <div className="wrap two">
          <div className="card rv">
            <span className="kicker">The speaker</span>
            <div className="speaker" style={{marginTop:"18px"}}>
              <div className="av-lg">AF</div>
              <div><h3>Alex Felman</h3><p>General Partner · Family office investor · Scientist &amp; educator</p></div>
            </div>
          </div>
          <div className="card goldc rv d1">
            <span className="kicker">Members only</span>
            <h3>Full recording and closed-room notes after the session.</h3>
            <Link className="btn" href="/login" style={{marginTop:"14px"}}>Open in member area <svg className="arr" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M13 6l6 6-6 6"/></svg></Link>
          </div>
        </div>
      </section>
    </>
  );
}
