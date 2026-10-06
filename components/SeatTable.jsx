// Ten equal seats around one round table. Seats fill one by one, hold, then reset (CSS animation).
const C = 150;
const SEATS = Array.from({ length: 10 }, (_, i) => {
  const a = -90 + i * 36;
  const r = (a * Math.PI) / 180;
  const f = (n) => Math.round(n * 100) / 100;
  return { x: f(C + 116 * Math.cos(r)), y: f(C + 116 * Math.sin(r)), r: a + 90, px: f(C + 66 * Math.cos(r)), py: f(C + 66 * Math.sin(r)) };
});

export default function SeatTable() {
  return (
    <div className="seats rv" aria-hidden="true">
      <svg viewBox="0 0 300 300">
        <defs>
          <radialGradient id="st-wood" cx=".4" cy=".35" r=".8">
            <stop offset="0" stopColor="#fffaf0" /><stop offset="1" stopColor="#f1dfb9" />
          </radialGradient>
          <radialGradient id="st-glow"><stop offset="0" stopColor="#f6d68c" stopOpacity=".9" /><stop offset="1" stopColor="#f6d68c" stopOpacity="0" /></radialGradient>
        </defs>
        <circle className="st-shadow" cx={C} cy={C + 8} r="86" />
        <circle className="st-table" cx={C} cy={C} r="88" fill="url(#st-wood)" />
        <circle className="st-inner" cx={C} cy={C} r="74" />
        <circle className="st-glow" cx={C} cy={C} r="40" fill="url(#st-glow)" />
        <circle className="st-candle" cx={C} cy={C} r="4" />
        {SEATS.map((s, i) => (
          <g key={i} style={{ '--i': i }}>
            <circle className="st-plate" cx={s.px} cy={s.py} r="9" />
            <g transform={`translate(${s.x} ${s.y}) rotate(${s.r})`}>
              <rect className="st-chair" x="-17" y="-12" width="34" height="24" rx="10" />
              <rect className="st-back" x="-12" y="-16" width="24" height="5" rx="2.5" />
            </g>
          </g>
        ))}
      </svg>
    </div>
  );
}
