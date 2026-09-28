import { permanentRedirect } from 'next/navigation';

// The site's example is the demo persona's live portfolio (src/content/demo/priya.ts).
export default function Page() {
  permanentRedirect('/p/priya_r');
}
