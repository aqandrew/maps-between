import { AdvancedMarker, useMap } from '@vis.gl/react-google-maps';
import { useMapStore } from '@/app/lib/store';

interface Props {
	position: google.maps.LatLngLiteral;
}

export default function Marker({ position }: Props) {
	const map = useMap('gmap');
	const setLocation = useMapStore((state) => state.setLocation);
	const setIsStreetView = useMapStore((state) => state.setIsStreetView);

	function openStreetView() {
		if (!map) return;

		const panorama = map.getStreetView();

		panorama.addListener('visible_changed', () => {
			if (!panorama.getVisible()) {
				setLocation(undefined);
				setIsStreetView(false);
			}
		});

		panorama.addListener('position_changed', () => {
			const { latLng } = panorama.getLocation() ?? {};

			if (latLng) {
				setLocation({ lat: latLng.lat(), lng: latLng.lng() });
			}
		});

		panorama.setPosition(position);
		panorama.setVisible(true);
		setLocation(position);
		setIsStreetView(true);
	}

	return (
		<AdvancedMarker
			position={position}
			clickable={true}
			onClick={openStreetView}
		/>
	);
}
