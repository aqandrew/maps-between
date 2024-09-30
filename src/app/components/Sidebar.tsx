import { useEffect, useRef, useState } from 'react';
import { useMap } from '@vis.gl/react-google-maps';
import { PlacePicker as TPlacePicker } from '@googlemaps/extended-component-library/place_picker.js';
import { PlacePicker } from '@googlemaps/extended-component-library/react';
import MessagesMenu from '@/app/components/MessagesMenu';

export default function Sidebar() {
	const map = useMap('gmap');
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
				forMap="gmap"
				placeholder="Search"
				onPlaceChange={() => {
					setPlace(pickerRef.current?.value ?? undefined);
				}}
			/>
			<MessagesMenu />
		</div>
	);
}
