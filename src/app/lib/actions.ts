'use server';

import { auth } from '@clerk/nextjs/server';

export async function writeMessage({
	message,
	location,
}: {
	message: string;
	location: google.maps.LatLngLiteral;
}) {
	const { userId } = auth();

	console.log('TODO: write to db:', {
		message,
		location,
		userId,
	});
}
