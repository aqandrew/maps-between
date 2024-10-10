import { useEffect, useRef, useState } from 'react';
import { SignInButton, SignedIn, SignedOut, UserButton } from '@clerk/nextjs';
import { useMap } from '@vis.gl/react-google-maps';
import { PlacePicker as TPlacePicker } from '@googlemaps/extended-component-library/place_picker.js';
import { PlacePicker } from '@googlemaps/extended-component-library/react';
import { MAP_ID } from '@/app/lib/constants';
import MessagesMenu from '@/app/components/MessagesMenu';

export default function Sidebar() {
	const map = useMap(MAP_ID);
	const pickerRef = useRef<TPlacePicker>(null);
	const [place, setPlace] = useState<google.maps.places.Place | undefined>(
		undefined
	);

	useEffect(() => {
		if (!map || !place?.location) return;

		map.panTo(place?.location);
		map.setZoom(16);
	}, [map, place]);

	return (
		<div className="h-full p-2 flex flex-col gap-2" slot="fixed">
			<h1 className="text-2xl">Maps Between</h1>
			<PlacePicker
				className="block"
				ref={pickerRef}
				forMap={MAP_ID}
				placeholder="Search"
				onPlaceChange={() => {
					setPlace(pickerRef.current?.value ?? undefined);
				}}
			/>

			<SignedOut>
				<SignInButton>
					<button className="p-2 bg-gray-200 rounded">Sign in</button>
				</SignInButton>
			</SignedOut>

			<SignedIn>
				<MessagesMenu />
				<UserButton />
			</SignedIn>
		</div>
	);
}
