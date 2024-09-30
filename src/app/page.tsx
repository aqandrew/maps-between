import MessagesMenu from '@/app/components/MessagesMenu';
import GoogleMap from '@/app/components/GoogleMap';

export default function Home() {
	return (
		<main className="h-full">
			{/* TODO put MessagesMenu in a sidebar */}
			{/* <MessagesMenu /> */}
			<GoogleMap />
		</main>
	);
}
