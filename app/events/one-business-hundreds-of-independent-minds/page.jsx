import EventPage from '@/components/EventPage';
import { EVENTS } from '@/data/events';

const SLUG = 'one-business-hundreds-of-independent-minds';
const e = EVENTS.find((x) => x.slug === SLUG);
export const metadata = { title: 'Legends — ' + (e ? e.title : 'Event') };

export default function Page() {
  return <EventPage slug={SLUG} />;
}
