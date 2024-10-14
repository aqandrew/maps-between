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
import { Doc } from '../../../convex/_generated/dataModel';

interface MarkerProps {
	message: Doc<'messages'>;
}

export default function Marker({
	message: { location, pov, message },
}: MarkerProps) {
	const isStreetView = useMapStore((state) => state.isStreetView);
	const [markerRef, marker] = useAdvancedMarkerRef();
	const [isHovering, setIsHovering] = useState(false);
	const { openStreetView } = usePanorama();

	const messageIconProps = isStreetView
		? { x: undefined, y: '0.9em', fontSize: 90 }
		: { x: '2em', y: '4.9em', fontSize: 20 };
	const messageIcon = `data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><text x="${messageIconProps.x}" y="${messageIconProps.y}" font-size="${messageIconProps.fontSize}">📓</text></svg>`;

	return (
		<>
			<AdvancedMarker
				ref={markerRef}
				position={location}
				clickable={true}
				onClick={() => {
					openStreetView({ position: location, pov });
					setIsHovering(false);
				}}
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
			<GMMarker position={location} icon={messageIcon} zIndex={0} />
		</>
	);
}
