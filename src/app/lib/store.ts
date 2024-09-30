import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

type Location = google.maps.LatLngLiteral | undefined;

interface MapState {
	location: Location;
	isStreetView: boolean;
	setLocation: (location: Location) => void;
	setIsStreetView: (isStreetView: boolean) => void;
}

export const useMapStore = create<MapState>()(
	devtools((set) => ({
		location: undefined,
		isStreetView: false,
		setLocation: (location) => set(() => ({ location })),
		setIsStreetView: (isStreetView) => set(() => ({ isStreetView })),
	}))
);
