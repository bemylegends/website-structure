import Link from 'next/link';
import Band from '@/components/Band';

export const metadata = { title: "Legends \u2014 Insights" };

export default function Page() {
  return (
    <>
      <section className="phero">
        <img className="sym" src="/brand/symbol.png" alt="" />
        <div className="wrap">
          <div className="crumbs"><Link href="/">Home</Link><span>/</span><span>Insights</span></div>
          <h1 className="h1 rv" style={{marginTop:"22px"}}>The knowledge stays.</h1>
          <p className="lead rv d1">Notes and ideas from InvestHacks and closed rooms. Full materials are available to members.</p>
        </div>
      </section>
      <section className="sec" style={{paddingTop:"0"}}>
        <div className="wrap">
          <div className="ins">
            <Link className="art big rv" href="/insights"><span className="kicker">AI &amp; investing</span><h3>The real company behind the perfect AI-generated pitch</h3><span className="by">Walied Albasheer · 8 min</span></Link>
            <Link className="art rv d1" href="/insights"><span className="kicker">InvestHack</span><h3>Why ownership cannot be assigned through an org chart</h3><span className="by">Julius Bachmann · 6 min</span></Link>
            <Link className="art rv" href="/insights"><span className="kicker">New organisations</span><h3>What holds one business together when nobody works for it?</h3><span className="by">Varun Malik · 5 min</span></Link>
            <Link className="art rv d1" href="/insights"><span className="kicker">Family offices</span><h3>How patient capital decides</h3><span className="by">Abhineet Singh · members only</span></Link>
            <Link className="art rv d2" href="/insights"><span className="kicker">Fundraising</span><h3>How a startup with no revenue raises up to €2.5M</h3><span className="by">Janneke Niessen · members only</span></Link>
          </div>
        </div>
      </section>
      <Band />
    </>
  );
}
