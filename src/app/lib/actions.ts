'use server';

import { auth } from '@clerk/nextjs/server';
import { fetchMutation } from 'convex/nextjs';
import { api } from '../../../convex/_generated/api';
import { Id } from '../../../convex/_generated/dataModel';

const REVERSE_GEOCODING_ENDPOINT =
	'https://maps.googleapis.com/maps/api/geocode/json';

async function getPlaceName(location: google.maps.LatLngLiteral) {
	const result = await fetch(
		REVERSE_GEOCODING_ENDPOINT +
			'?' +
			new URLSearchParams({
				latlng: `${location.lat},${location.lng}`,
				key: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!,
			}).toString(),
	);
	const data = await result.json();
	const { formatted_address } = data.results.find(
		({
			types,
			formatted_address,
		}: {
			types: Array<string>;
			formatted_address: string;
		}) =>
			types.includes('political') &&
			(formatted_address.match(/\d/g) || []).length === 0 &&
			(formatted_address.match(/,/g) || []).length <= 2,
	);

	return formatted_address;
}

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
	const placeName = await getPlaceName(location);
	await fetchMutation(api.messages.add, {
		location,
		pov,
		placeName,
		message,
		userId: userId!,
	});
}

export async function deleteMessage({ id }: { id: Id<'messages'> }) {
	await fetchMutation(api.messages.remove, { id });
}
