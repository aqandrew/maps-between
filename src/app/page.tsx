import { fetchQuery } from 'convex/nextjs';
import { api } from '../../convex/_generated/api';
import GoogleMap from '@/app/components/GoogleMap';

export default async function Home() {
	const messages = await fetchQuery(api.messages.get);

	return (
		<main className="h-full">
			<GoogleMap messages={messages} />
		</main>
	);
}
