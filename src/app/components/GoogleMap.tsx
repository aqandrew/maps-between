'use client';

import { APIProvider, Map } from '@vis.gl/react-google-maps';
import { SplitLayout } from '@googlemaps/extended-component-library/react';
import { useQuery } from 'convex/react';
import { api } from '../../../convex/_generated/api';
import { MAP_ID } from '@/app/lib/constants';
import Sidebar from '@/app/components/Sidebar';
import Marker from '@/app/components/Marker';

export default function GoogleMap() {
	const messages = useQuery(api.messages.get);

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
						{messages?.map(({ _id, location, message }) => (
							<Marker position={location} message={message} key={_id} />
						))}
					</Map>
				</div>
			</SplitLayout>
		</APIProvider>
	);
}
