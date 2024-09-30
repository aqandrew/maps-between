import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

interface MapState {
	location: google.maps.LatLngLiteral | undefined;
	isStreetView: boolean;
	setLocation: (location: google.maps.LatLngLiteral) => void;
}

export const useMapStore = create<MapState>()(
	devtools((set) => ({
		location: undefined,
		isStreetView: false,
		setLocation: (location) => set(() => ({ location })),
	}))
);
