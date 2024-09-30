import { AdvancedMarker, useMap } from '@vis.gl/react-google-maps';
import { useMapStore } from '@/app/lib/store';

interface Props {
	position: google.maps.LatLngLiteral;
}

export default function Marker({ position }: Props) {
	const map = useMap('gmap');
	const setLocation = useMapStore((state) => state.setLocation);

	function openStreetView() {
		if (!map) return;

		// TODO add a visible_changed listener to setLocation back to undefined when exiting street view
		// https://developers.google.com/maps/documentation/javascript/reference/street-view#StreetViewPanorama.visible_changed
		const panorama = map.getStreetView();
		panorama.setPosition(position);
		panorama.setVisible(true);
		setLocation(position);
	}

	return (
		<AdvancedMarker
			position={position}
			clickable={true}
			onClick={openStreetView}
		/>
	);
}
