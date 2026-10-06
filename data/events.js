// Upcoming offline events. Each one has its own landing on legends.app/events/<slug>/.
// To add a dinner: copy an entry, change the fields, keep the list in date order.
export const EVENTS = [
  { slug: 'singapore-081026', city: 'Singapore', day: 8, dow: 'Thu', month: 'October', iso: '2026-10-08', week: 'Milken Institute Asia Summit', heroWeek: 'the investment week' },
  { slug: 'dubai-141026', city: 'Dubai', day: 14, dow: 'Wed', month: 'October', iso: '2026-10-14', week: 'SuperReturn Middle East' },
  { slug: 'abu-dhabi-211026', city: 'Abu Dhabi', day: 21, dow: 'Wed', month: 'October', iso: '2026-10-21', week: 'Campden Congress' },
  { slug: 'riyadh-281026', city: 'Riyadh', day: 28, dow: 'Wed', month: 'October', iso: '2026-10-28', week: 'FII10' },
].map((e) => ({ ...e, time: '17:00-20:00', seats: 10, url: `/events/${e.slug}`, heroWeek: e.heroWeek || `${e.week} week` }));

export const event = (slug) => EVENTS.find((e) => e.slug === slug);
export const DOW = { Mon: 'Mon', Tue: 'Tue', Wed: 'Wed', Thu: 'Thu', Fri: 'Fri' };
// shared media used on every dinner page
export const MEDIA = 'https://legends.app/events/shared';

export const SCHEDULE = [
  ['17:00', 'Arrival', 'Meet the other nine investors.'],
  ['17:30', 'Introductions', 'Who you are, what you invest in.'],
  ['18:00', 'Asks & gives', 'What you need. What you can offer.'],
  ['18:30', 'Dinner', 'Deals, market views, open conversation.'],
  ['20:00', 'Close', 'The network continues after dinner.'],
];

// Events that have not ended yet (the day itself still counts as upcoming).
export const upcoming = (now = new Date()) => EVENTS.filter((e) => new Date(e.iso + 'T23:59:59Z') >= now);
