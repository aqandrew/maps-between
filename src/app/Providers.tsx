'use client';

import { ReactNode } from 'react';
import { ClerkProvider } from '@clerk/nextjs';
import { APIProvider as GoogleMapsProvider } from '@vis.gl/react-google-maps';
import { ConvexClientProvider } from './ConvexClientProvider';

export default function Providers({ children }: { children: ReactNode }) {
	return (
		<ClerkProvider>
			<ConvexClientProvider>
				<GoogleMapsProvider
					apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!}
				>
					{children}
				</GoogleMapsProvider>
			</ConvexClientProvider>
		</ClerkProvider>
	);
}
