import EventPage from '@/components/EventPage';
import { EVENTS } from '@/data/events';

const SLUG = 'how-to-spot-real-companies-in-the-age-of-ai';
const e = EVENTS.find((x) => x.slug === SLUG);
export const metadata = { title: 'Legends — ' + (e ? e.title : 'Event') };

export default function Page() {
  return <EventPage slug={SLUG} />;
}
