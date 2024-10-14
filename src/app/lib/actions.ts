'use server';

import { auth } from '@clerk/nextjs/server';
import { fetchMutation } from 'convex/nextjs';
import { api } from '../../../convex/_generated/api';
import { Id } from '../../../convex/_generated/dataModel';

export async function writeMessage({
	message,
	location,
	pov,
}: {
	message: string;
	location: google.maps.LatLngLiteral;
	pov: google.maps.StreetViewPov;
}) {
	const { userId } = auth();
	await fetchMutation(api.messages.add, {
		location,
		pov,
		message,
		userId: userId!,
	});
}

export async function deleteMessage({ id }: { id: Id<'messages'> }) {
	await fetchMutation(api.messages.remove, { id });
}
