import { useEffect, useState } from 'react';
import {
	AdvancedMarker,
	InfoWindow,
	useAdvancedMarkerRef,
	useMap,
} from '@vis.gl/react-google-maps';
import { MAP_ID } from '@/app/lib/constants';
import { usePanorama } from '@/app/hooks/usePanorama';

const MESSAGE_ICON =
	'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><text y=".9em" font-size="90">📝</text></svg>';

interface MarkerProps {
	position: google.maps.LatLngLiteral;
	message: string;
}

export default function Marker({ position, message }: MarkerProps) {
	const map = useMap(MAP_ID);
	const [markerRef, marker] = useAdvancedMarkerRef();
	const [isHovering, setIsHovering] = useState(false);
	const { openStreetView } = usePanorama();

	useEffect(() => {
		// need to use deprecated Marker class for icons to be visible in street view
		// https://developers.google.com/maps/documentation/javascript/examples/streetview-overlays
		new google.maps.Marker({
			map,
			position,
			icon: MESSAGE_ICON,
		});
	}, []);

	return (
		<>
			<AdvancedMarker
				ref={markerRef}
				position={position}
				clickable={true}
				onClick={() => openStreetView(position)}
				onMouseEnter={() => setIsHovering(true)}
				onMouseLeave={() => setIsHovering(false)}
			/>
			{isHovering ? (
				<InfoWindow anchor={marker} headerDisabled={true}>
					{message}
				</InfoWindow>
			) : null}
		</>
	);
}
