// Legends Online: monthly live session with a top speaker (Zoom, 60 minutes).
// TODO: `url` - link to the session landing once it is published (cards show "Registration opens soon" while it is empty).
// TODO: the next session below is the current template (speaker and date to be confirmed).
export const ONLINE_NEXT = {
  slug: 'legends-online-06',
  no: '06',
  title: 'How a $200M+ Family Office Decides What Gets a $1-10M Direct Investment',
  speaker: 'Alex Felman',
  role: 'General Partner, Felman Family Office',
  day: 27, dow: 'Tue', month: 'October', iso: '2026-10-27',
  times: [['Dubai', '5:00 PM'], ['London', '1:00 PM'], ['New York', '9:00 AM'], ['Singapore', '9:00 PM']],
  format: '30-minute talk, then a closed discussion with the speaker',
  seats: 40,
  photo: 'https://belegends.club/api/files/pbc_2443081517/kfzgg99w8mivqcf/alex_f_l_q_rd9qlb3hjv.png',
  url: '/events/legends-online-06',
  startsAt: '2026-10-27T13:00:00Z',
  lead: 'Alex Felman on what it takes to get to a yes - and why a yes means an 8-10-year horizon.',
  idea: { quote: ['A yes is a decade,', 'not a round.'], text: 'Patient capital does not answer to the pressure of a closing round. For Alex, four things matter more than the timing of the raise.',
    points: [['The science', 'Does the underlying technology actually hold?'], ['The commercial logic', 'Is there a business that can carry it?'], ['The people', 'Are the founders aligned for a decade, not a round?'], ['Staying power', 'Can it last beyond a single fundraising cycle?']] },
  bio: [
    'Alex came to investing from the lab. Trained in molecular toxicology and biochemistry, he spent the first part of his career on scientific commercialisation - the hard step between a discovery and a business that can carry it.',
    'Today he leads technology investments at Felman Family Office, a $200M+ family office where around 90% of the portfolio sits in direct investments. Typical checks are $1-10M across biotech, healthcare, agriculture and energy.',
    'His approach combines scientific rigor with family office discipline: the underlying science, commercial viability, founders’ alignment and the capacity to last beyond a single fundraising cycle. A yes from Alex means an 8-10-year minimum horizon.',
  ],
  creds: [['Family office', '$200M+, 90% direct'], ['Invests in', 'Biotech · Healthcare · Agriculture · Energy'], ['Typical check', '$1-10M'], ['Horizon', '8-10 years minimum']],
  hour: [[1, '01 · 10 min', 'The journey', 'How molecular toxicology and scientific commercialisation shaped his investment philosophy and risk framework.'], [2, '02 · 20 min', 'The decision framework', 'Underlying science, commercial viability, founders’ alignment and the capacity to last beyond a single fundraising cycle.'], [3, '03 · 30 min', 'The closed discussion', 'Questions from the room, candid discussion and relevant introductions with the speaker.']],
  forWho: ['An investor building a direct-investment practice', 'A fund manager working with family offices', 'A founder who wants to understand how patient capital decides'],
  notFor: 'pitching the speaker or looking for clients as a service provider.',
};

// Previous sessions (most recent first) - same cards as belegends.club/events.
const BF = 'https://belegends.club/api/files/pbc_1687431684', LU = 'https://images.lumacdn.com/uploads';
export const ONLINE_PAST = [
  { speaker: 'Alex Felman', role: 'General Partner, Felman Family Office', title: 'How a $200M+ Family Office Decides What Gets a $1-10M Direct Investment', date: 'Tue, 29 Sept 2026', label: 'InvestHack', img: `${BF}/8orlny5gc6hpprk/how_200_m_family_office_decides_what_gets_1_10_m_direct_investment_bd2byiyiet.png`, url: 'https://belegends.club/events/after-20-investments-what-makes-me-say-yes' },
  { speaker: 'Janneke Niessen', role: 'Founding Partner, CapitalT', title: 'How a Startup With No Revenue Raises Up to €2.5M', date: 'Tue, 22 Sept 2026', label: 'InvestHack', img: `${BF}/kwj6ys0yl8rpp2z/84lqdbvecvo_jxfp00qtbs.png`, url: 'https://belegends.club/events/how-a-startup-with-no-revenue-raises-up-to-2-5m' },
  { speaker: 'Walied Albasheer', role: 'Founder & Managing Partner', title: 'How a 30-Year Tech Founder Spots Real Companies Behind AI-Perfect Pitches', date: 'Tue, 15 Sept 2026', label: 'InvestHack', img: `${BF}/vl5gdqr1s6vdjjp/walied_albasheer_6at4u98zk4.png`, url: 'https://belegends.club/events/how-to-spot-real-companies-in-the-age-of-ai' },
  { speaker: 'Varun Malik', role: 'Founder & CEO, Konsälidön', title: 'How to Profit as a Human in an Unforgiving AI World', date: 'Tue, 8 Sept 2026', label: 'InvestHack', img: `${BF}/senl9tnhxv04zgw/varun_prev_f85bcua4y1.jpg`, url: 'https://belegends.club/events/one-business-hundreds-of-independent-minds' },
  { speaker: 'Julius Bachmann', role: 'Founder, Bachmann Catalyst', title: 'How to Build Ownership Culture & Care: Insights from 200+ Scale-Up Companies', date: 'Tue, 25 Aug 2026', label: 'Speaker session', img: `${LU}/bs/ac902c55-d881-468b-bfdb-320677d8a8ec.png`, url: 'https://belegends.club/events/ownership-culture-and-care' },
  { speaker: 'Vijay Sivaram', role: 'Co-Founder, RVAI Global', title: 'How to Build a $2B Company and Manage 650k+ People', date: 'Tue, 11 Aug 2026', label: 'Speaker session', img: `${LU}/2o/559112b4-ca42-4a7d-bfe8-66797fbb0833.png`, url: 'https://luma.com/gxeiw4sg' },
  { speaker: 'Abhineet Singh', role: 'CIO, Al Siraj Holdings', title: 'Inside the Family Office: How Patient Capital Decides', date: 'Thu, 30 Jul 2026', label: 'Speaker session', img: `${LU}/sx/b253d992-9e8f-48f5-b19e-2ce299ddee0c.png`, url: 'https://luma.com/2uelini6' },
  { speaker: 'Radhesh Kanumury', role: 'Managing Partner, Suvan Ventures', title: 'AI in the Enterprise: An Investor’s View', date: 'Thu, 23 Jul 2026', label: 'Speaker session', img: `${LU}/f1/589abc2d-6f41-4c2f-b9d2-dc4b90c88713.png`, url: 'https://luma.com/au6shx7n' },
];
