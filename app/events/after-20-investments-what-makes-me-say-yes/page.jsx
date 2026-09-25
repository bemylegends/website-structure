import Link from 'next/link';
import Arrow from '@/components/Arrow';

export const metadata = { title: 'Legends — How a $200M+ Family Office Decides What Gets a $1–10M Direct Investment' };

const Cal = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="5" width="18" height="16" rx="4" /><path d="M8 3v4M16 3v4M3 10h18" /></svg>;
const Clock = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></svg>;
const Cam = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="6" width="13" height="12" rx="3" /><path d="M16 10l5-3v10l-5-3" /></svg>;

export default function Page() {
  return (
    <>
      <section className="phero">
        <div className="wrap">
          <div className="crumbs"><Link href="/">Home</Link><span>/</span><Link href="/events">Events</Link><span>/</span><span>InvestHack</span></div>
          <div className="evhero" style={{ marginTop: 28 }}>
            <div>
              <span className="kicker">Private online InvestHack · Upcoming</span>
              <h1 className="h1 rv" style={{ fontSize: 'clamp(36px,4.4vw,62px)', marginTop: 16 }}>How a $200M+ Family Office Decides What Gets a $1–10M Direct Investment</h1>
              <p className="lead rv d1">A $200M+ family office with 90% direct investments and $5–10M checks. Alex Felman on why a yes means an 8–10-year minimum horizon — and why scientific depth and commercial logic matter more than the pressure of a closing round.</p>
              <div className="evfacts rv d2">
                <span><Cal />Tue, 29 September 2026</span>
                <span><Clock />17:00 Dubai · 14:00 London · 9:00 New York</span>
                <span><Cam />Online · small group, cameras on</span>
              </div>
              <div className="ctas rv d3">
                <Link className="btn gold" href="/apply">Apply to join <Arrow /></Link>
                <Link className="btn ghost" href="/login">Members: join from your account</Link>
              </div>
            </div>
            <div className="cover-lg rv d1"><img src="https://belegends.club/api/files/pbc_1687431684/8orlny5gc6hpprk/how_200_m_family_office_decides_what_gets_1_10_m_direct_investment_bd2byiyiet.png" alt="" /></div>
          </div>
        </div>
      </section>

      <section className="sec" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <div className="sec-head rv"><span className="kicker">What you will take away</span><h2 className="h2">From the first look to a yes.</h2></div>
          <div className="agenda">
            <div className="step rv"><span className="n">01</span><h3>The journey</h3><p>How molecular toxicology and scientific commercialisation shaped his investment philosophy and risk framework.</p></div>
            <div className="step rv d1"><span className="n">02</span><h3>The hacks</h3><p>Underlying science, commercial viability, founders’ alignment and the capacity to last beyond a single fundraising cycle.</p></div>
            <div className="step rv d2"><span className="n">03</span><h3>The closed session</h3><p>Members-only Q&amp;A, candid discussion and relevant introductions with the speaker.</p></div>
          </div>
        </div>
      </section>

      <section className="sec" style={{ paddingTop: 0 }}>
        <div className="wrap two">
          <div className="card rv">
            <span className="kicker">The speaker</span>
            <div className="speaker" style={{ marginTop: 18 }}>
              <img className="av-lg" src="https://belegends.club/api/files/pbc_2443081517/kfzgg99w8mivqcf/alex_f_l_q_rd9qlb3hjv.png" alt="Alex Felman" style={{ objectFit: 'cover' }} />
              <div>
                <h3>Alex Felman</h3>
                <p>General Partner at Felman Family Office; Founder of Exponential U. Trained in molecular toxicology and biochemistry, he leads technology investments across biotech, healthcare, agriculture and energy — combining scientific rigor with family office discipline.</p>
              </div>
            </div>
          </div>
          <div className="card goldc rv d1">
            <div className="rings"><i /><i /><i /></div>
            <span className="kicker">How to join</span>
            <h3>Register and we’ll send your invite with the joining link.</h3>
            <p>Full recording and closed-session notes stay available to members after the event.</p>
            <Link className="btn" href="/apply" style={{ marginTop: 18, position: 'relative' }}>Apply to join <Arrow /></Link>
          </div>
        </div>
      </section>
    </>
  );
}
