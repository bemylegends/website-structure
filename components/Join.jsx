import { ApplyButton } from './ApplyModal';

const Arr = () => <svg className="arr" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M13 6l6 6-6 6" /></svg>;

export default function Join() {
  return (
    <section className="sec" style={{ paddingTop: 0 }}><div className="wrap">
      <div className="join rv">
        <h2 className="h2">Membership by approval</h2>
        <p className="lead">Legends is for people who invest their own capital or manage it for a family office, fund or institution. Every application is reviewed personally.</p>
        <ApplyButton className="g-btn">Apply to join <Arr /></ApplyButton>
        <figure className="join-q">
          <blockquote>“Every deal I regret started with the wrong introduction. Every one I’m proud of started with the right one.”</blockquote>
          <figcaption><img src="/brand/yanis.webp" alt="Yanis Chkhatval" /><span><b>Yanis Chkhatval</b>Private investor &amp; entrepreneur. Founder of Legends.</span></figcaption>
        </figure>
      </div>
    </div></section>
  );
}
