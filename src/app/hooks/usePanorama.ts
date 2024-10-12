import { useMap } from '@vis.gl/react-google-maps';
import { MAP_ID } from '@/app/lib/constants';
import { useMapStore } from '@/app/lib/store';

export function usePanorama() {
	const map = useMap(MAP_ID);
	const setLocation = useMapStore((state) => state.setLocation);
	const setIsStreetView = useMapStore((state) => state.setIsStreetView);

	const panorama = map!.getStreetView();

	panorama.addListener('visible_changed', () => {
		const isVisible = panorama.getVisible();
		setIsStreetView(isVisible);

		if (!isVisible) {
			setLocation(undefined);
			panorama.setPov({ heading: 0, pitch: 0 });
		}
	});

	panorama.addListener('position_changed', () => {
		const { latLng } = panorama.getLocation() ?? {};

		if (latLng) {
			setLocation({ lat: latLng.lat(), lng: latLng.lng() });
		}
	});

	function openStreetView(position: google.maps.LatLngLiteral) {
		panorama.setPosition(position);
		panorama.setVisible(true);
	}

	return { openStreetView };
}
