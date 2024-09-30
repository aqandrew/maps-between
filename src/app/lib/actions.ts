'use server';

export async function writeMessage({
	message,
	location,
}: {
	message: string;
	location: google.maps.LatLngLiteral;
}) {
	console.log('TODO: write message w/location to db:', message, location);
}
