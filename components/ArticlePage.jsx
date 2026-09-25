import Link from 'next/link';
import Arrow from './Arrow';
import Band from './Band';
import ReadProgress from './ReadProgress';
import { ARTICLES } from '@/data/knowledge';
import { getEssay } from '@/lib/blog';

function Blocks({ blocks, cover }) {
  return blocks.map((b, k) => {
    if (b.h) return <h2 key={k}>{b.h}</h2>;
    if (b.h3) return <h3 key={k}>{b.h3}</h3>;
    if (b.quote) return <blockquote key={k}>{b.quote}</blockquote>;
    if (b.list) { const L = b.ordered ? 'ol' : 'ul'; return <L key={k}>{b.list.map((x) => <li key={x}>{x}</li>)}</L>; }
    if (b.img) {
      if (b.img === cover) return null;
      return <figure key={k}><img src={b.img} alt={b.alt} loading="lazy" />{b.caption && <figcaption>{b.caption}</figcaption>}</figure>;
    }
    return <p key={k} dangerouslySetInnerHTML={{ __html: b.p }} />;
  });
}

export default async function ArticlePage({ slug }) {
  const a = ARTICLES.find((x) => x.slug === slug);
  if (!a) return null;
  const blocks = await getEssay(slug);
  const more = ARTICLES.filter((x) => x.slug !== slug).slice(0, 3);

  return (
    <>
      <ReadProgress />
      <section className="art-hero">
        <div className="wrap">
          <div className="crumbs"><Link href="/">Home</Link><span>/</span><Link href="/knowledge">Knowledge</Link><span>/</span><span>{a.tag}</span></div>
          <div className="art-head">
            <span className="kicker">{a.tag} · {a.date} · {a.read} read</span>
            <h1 className="h1">{a.title}</h1>
            <p className="lead">{a.excerpt}</p>
            <div className="art-author">
              <div className="me-av">{a.author.split(' ').map((w) => w[0]).join('')}</div>
              <div><b>{a.author}</b><small>{a.authorRole}</small></div>
            </div>
          </div>
          <div className="art-cover"><img src={a.img} alt="" /></div>
        </div>
      </section>

      <section className="sec" style={{ paddingTop: 'clamp(40px,5vw,72px)' }}>
        <div className="wrap art-grid">
          <aside className="art-side">
            <div className="art-from">
              <span className="kicker">From the InvestHack</span>
              <p>{a.eventTitle}</p>
              <small>{a.eventDate}</small>
              <a className="tlink" href={a.eventUrl} target="_blank" rel="noopener noreferrer" style={{ fontSize: 14 }}>About the event <Arrow className="" /></a>
            </div>
          </aside>
          <article className="prose">
            {blocks ? <Blocks blocks={blocks} cover={a.img} /> : (
              <>
                <p>{a.excerpt}</p>
                <div className="prose-note">
                  <span className="kicker">Full essay</span>
                  <p>The full text is published on the Legends blog.</p>
                  <a className="btn" href={a.original} target="_blank" rel="noopener noreferrer">Read the essay <Arrow /></a>
                </div>
              </>
            )}
          </article>
        </div>
      </section>

      <section className="sec" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <div className="row-head">
            <div className="sec-head rv"><span className="kicker">Keep reading</span><h2 className="h2">More from Knowledge.</h2></div>
            <Link className="tlink rv" href="/knowledge">All essays <Arrow className="" /></Link>
          </div>
          <div className="kn-grid">
            {more.map((m, k) => (
              <Link key={m.slug} className={'kn rv d' + k} href={m.href}>
                <div className="kn-img"><img loading="lazy" src={m.img} alt="" /></div>
                <div className="kn-txt"><span className="kicker">{m.tag} · {m.read}</span><h3>{m.title}</h3><span className="by">{m.author} · {m.date}</span></div>
              </Link>
            ))}
          </div>
        </div>
      </section>
      <Band />
    </>
  );
}
