import EventPage from '@/components/EventPage';
import { EVENTS } from '@/data/events';

const SLUG = 'ownership-culture-and-care';
const e = EVENTS.find((x) => x.slug === SLUG);
export const metadata = { title: 'Legends — ' + (e ? e.title : 'Event') };

export default function Page() {
  return <EventPage slug={SLUG} />;
}
