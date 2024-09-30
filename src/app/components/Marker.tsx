import { AdvancedMarker, useMap } from '@vis.gl/react-google-maps';

interface Props {
	position: google.maps.LatLngLiteral;
}

export default function Marker({ position }: Props) {
	const map = useMap('gmap');

	function openStreetView() {
		if (!map) return;

		const panorama = map.getStreetView();
		panorama.setPosition(position);
		panorama.setVisible(true);
	}

	return (
		<AdvancedMarker
			position={position}
			clickable={true}
			onClick={openStreetView}
		/>
	);
}
