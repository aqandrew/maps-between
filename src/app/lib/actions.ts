'use server';

import { auth } from '@clerk/nextjs/server';
import { fetchMutation } from 'convex/nextjs';
import { api } from '../../../convex/_generated/api';

export async function writeMessage({
	message,
	location,
}: {
	message: string;
	location: google.maps.LatLngLiteral;
}) {
	const { userId } = auth();

	await fetchMutation(api.messages.add, { location, message, userId: userId! });
}
