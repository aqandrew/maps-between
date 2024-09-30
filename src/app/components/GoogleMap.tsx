'use client';

import { APIProvider, Map } from '@vis.gl/react-google-maps';
import { SplitLayout } from '@googlemaps/extended-component-library/react';
import { MAP_ID } from '@/app/lib/constants';
import Sidebar from '@/app/components/Sidebar';
import Marker from '@/app/components/Marker';

const chargingBullLocation: google.maps.LatLngLiteral = {
	lat: 40.705576,
	lng: -74.013421,
};

export default function GoogleMap() {
	return (
		<APIProvider apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!}>
			<SplitLayout>
				<Sidebar />

				<div className="h-full" slot="main">
					<Map
						id={MAP_ID}
						defaultCenter={{ lat: 22.54992, lng: 0 }}
						mapId={'3a9db3895a3964fd'}
						defaultZoom={2}
						gestureHandling={'greedy'}
					>
						<Marker position={chargingBullLocation} />
					</Map>
				</div>
			</SplitLayout>
		</APIProvider>
	);
}
