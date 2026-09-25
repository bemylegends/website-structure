// Source: belegends.club/blog. Articles open on the live blog for now.
const B = 'https://belegends.club/blog/';
const img = (u) => u;

export const ARTICLES = [
  { slug: 'before-the-numbers-i-read-the-team', tag: 'Essay', author: 'Janneke Niessen', date: '23 Sept 2026',
    title: 'Before the Numbers, I Read the Team',
    excerpt: 'How CapitalT assesses founding teams before revenue exists: traits, human capital, team dynamics and what drives the founders.',
    img: img('https://belegends.club/api/files/pbc_1687431684/kwj6ys0yl8rpp2z/84lqdbvecvo_jxfp00qtbs.png') },
  { slug: 'slop-is-not-bad-work', tag: 'Essay', author: 'Walied Albasheer', date: '19 Sept 2026',
    title: 'Slop Is Not Bad Work',
    excerpt: '265 fund pitches, zero fraudulent submissions. What AI changed about pitch artifacts — and what it did not change about the gatekeeping.',
    img: img('https://belegends.club/api/files/pbc_1687431684/vl5gdqr1s6vdjjp/walied_albasheer_6at4u98zk4.png') },
  { slug: 'your-moat-was-never-the-product', tag: 'Essay', author: 'Varun Malik', date: '13 Sept 2026',
    title: 'Your Moat Was Never the Product',
    excerpt: 'When intermediary services stop being necessary, the value proposition dissolves. Why AI makes distribution the real advantage.',
    img: img('https://belegends.club/api/files/pbc_1687431684/senl9tnhxv04zgw/varun_prev_f85bcua4y1.jpg') },
  { slug: 'what-we-mean-when-we-ask-for-ownership', tag: 'Essay', author: 'Julius Bachmann', date: '9 Sept 2026',
    title: 'What We Mean When We Ask for Ownership',
    excerpt: 'Boards keep asking management to act like owners. The equity mechanisms that turn that expectation into something real.',
    img: img('https://images.lumacdn.com/uploads/bs/ac902c55-d881-468b-bfdb-320677d8a8ec.png') },
  { slug: 'what-is-not-core-i-make-it-my-core', tag: 'Essay', author: 'Vijay Sivaram', date: '9 Sept 2026',
    title: 'What Is Not Core to a Company, I Make It My Core',
    excerpt: 'Managing 600,000 people through trust and values — and how the peripheral functions became the strategic focus.',
    img: img('https://images.lumacdn.com/uploads/2o/559112b4-ca42-4a7d-bfe8-66797fbb0833.png') },
].map((a) => ({ ...a, url: B + a.slug }));
