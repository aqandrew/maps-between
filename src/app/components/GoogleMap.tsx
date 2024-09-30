'use client';

import { AdvancedMarker, APIProvider, Map } from '@vis.gl/react-google-maps';
import { SplitLayout } from '@googlemaps/extended-component-library/react';
import Sidebar from '@/app/components/Sidebar';

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
						id="gmap"
						defaultCenter={{ lat: 22.54992, lng: 0 }}
						mapId={'3a9db3895a3964fd'}
						defaultZoom={2}
						gestureHandling={'greedy'}
						disableDefaultUI={false}
					>
						<AdvancedMarker
							position={chargingBullLocation}
							clickable={true}
							onClick={() => console.log('marker clicked')}
						/>
					</Map>
				</div>
			</SplitLayout>
		</APIProvider>
	);
}
