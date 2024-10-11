import { getAllMessages } from '@/app/lib/actions';
import GoogleMap from '@/app/components/GoogleMap';

export default async function Home() {
	const messages = await getAllMessages();

	return (
		<main className="h-full">
			<GoogleMap messages={messages} />
		</main>
	);
}
