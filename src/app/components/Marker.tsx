import { useState } from 'react';
import {
	AdvancedMarker,
	InfoWindow,
	useAdvancedMarkerRef,
} from '@vis.gl/react-google-maps';
import { usePanorama } from '@/app/hooks/usePanorama';

interface MarkerProps {
	position: google.maps.LatLngLiteral;
	message: string;
}

export default function Marker({ position, message }: MarkerProps) {
	const [markerRef, marker] = useAdvancedMarkerRef();
	const [isHovering, setIsHovering] = useState(false);
	const panorama = usePanorama();

	function openStreetView() {
		if (panorama) {
			panorama.setPosition(position);
			panorama.setVisible(true);
		}
	}

	return (
		<>
			<AdvancedMarker
				ref={markerRef}
				position={position}
				clickable={true}
				onClick={openStreetView}
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
