import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

type Location = google.maps.LatLngLiteral | undefined;
type Pov = google.maps.StreetViewPov | undefined;

interface MapState {
	location: Location;
	isStreetView: boolean;
	pov: Pov;
	setLocation: (location: Location) => void;
	setIsStreetView: (isStreetView: boolean) => void;
	setPov: (pov: Pov) => void;
}

export const useMapStore = create<MapState>()(
	devtools((set) => ({
		location: undefined,
		isStreetView: false,
		pov: undefined,
		setLocation: (location) => set(() => ({ location })),
		setIsStreetView: (isStreetView) => set(() => ({ isStreetView })),
		setPov: (pov) => set(() => ({ pov })),
	})),
);
