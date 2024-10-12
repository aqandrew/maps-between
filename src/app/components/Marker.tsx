import { useState } from 'react';
import {
	AdvancedMarker,
	InfoWindow,
	Marker as GMMarker,
	useAdvancedMarkerRef,
	Pin,
} from '@vis.gl/react-google-maps';
import { useMapStore } from '@/app/lib/store';
import { usePanorama } from '@/app/hooks/usePanorama';

const MESSAGE_ICON =
	'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><text x="2em" y="4.9em" font-size="20">📓</text></svg>';
const MESSAGE_ICON_STREET_VIEW =
	'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><text y=".9em" font-size="90">📓</text></svg>';

interface MarkerProps {
	position: google.maps.LatLngLiteral;
	message: string;
}

export default function Marker({ position, message }: MarkerProps) {
	const isStreetView = useMapStore((state) => state.isStreetView);
	const [markerRef, marker] = useAdvancedMarkerRef();
	const [isHovering, setIsHovering] = useState(false);
	const { openStreetView } = usePanorama();

	return (
		<>
			<AdvancedMarker
				ref={markerRef}
				position={position}
				clickable={true}
				onClick={() => openStreetView(position)}
				onMouseEnter={() => setIsHovering(true)}
				onMouseLeave={() => setIsHovering(false)}
				zIndex={1}
			>
				<Pin
					background="transparent"
					borderColor="transparent"
					glyphColor="transparent"
				/>
			</AdvancedMarker>

			{isHovering ? (
				<InfoWindow anchor={marker} headerDisabled={true} pixelOffset={[0, 9]}>
					{message}
				</InfoWindow>
			) : null}

			{/* need to also use deprecated Marker class for icons to be visible in street view */}
			{/* https://developers.google.com/maps/documentation/javascript/examples/streetview-overlays */}
			<GMMarker
				position={position}
				icon={isStreetView ? MESSAGE_ICON_STREET_VIEW : MESSAGE_ICON}
				zIndex={0}
			/>
		</>
	);
}
