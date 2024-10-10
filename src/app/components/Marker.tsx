import { AdvancedMarker } from '@vis.gl/react-google-maps';
import { usePanorama } from '@/app/hooks/usePanorama';

interface Props {
	position: google.maps.LatLngLiteral;
}

export default function Marker({ position }: Props) {
	const panorama = usePanorama();

	function openStreetView() {
		if (panorama) {
			panorama.setPosition(position);
			panorama.setVisible(true);
		}
	}

	// TODO preview message text on hover?

	return (
		<AdvancedMarker
			position={position}
			clickable={true}
			onClick={openStreetView}
		/>
	);
}
