import { create } from 'zustand';

interface MapState {
	location: google.maps.LatLngLiteral | undefined;
	isStreetView: boolean;
	setLocation: (location: google.maps.LatLngLiteral) => void;
}

export const useMapStore = create<MapState>((set) => ({
	location: undefined,
	isStreetView: false,
	setLocation: (location) => set(() => ({ location })),
}));
