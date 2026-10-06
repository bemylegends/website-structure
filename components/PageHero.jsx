import Scene from './Scene';

// Light page header: title and text on the left, a line-drawn scene on the right.
// The cream wash fades into the page background, so there is no hard edge.
export default function PageHero({ title, lead, children, scene }) {
  return (
    <section className={'phero' + (scene ? ' has-scene' : '')}>
      <div className="ph-bg" aria-hidden="true"><i className="ph-glow" /><i className="ph-grid" /></div>
      <div className="wrap phero-in">
        <div className="ph-main">
          <h1 className="h1 rv">{title}</h1>
          {lead && <p className="lead rv d1">{lead}</p>}
          {children}
        </div>
        {scene && <Scene kind={scene} />}
      </div>
    </section>
  );
}
