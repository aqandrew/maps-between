import { SignedIn, SignedOut, useUser } from '@clerk/nextjs';
import { useQuery } from 'convex/react';
import { api } from '../../../convex/_generated/api';
import MessageWritten from './MessageWritten';

export default function MessagesWritten() {
	const { user } = useUser();
	const userMessages = useQuery(api.messages.getForUser, { userId: user!.id });

	return (
		<div className="h-full">
			<SignedOut>
				<p>You must sign in to view previously written messages.</p>
			</SignedOut>

			<SignedIn>
				{/* TODO occupy full modal height while enabling scroll if message list is long */}
				<ol className="h-96 flex flex-col gap-1 p-4 overflow-y-auto">
					{userMessages?.map((message) => (
						<li key={message._id}>
							<MessageWritten message={message} />
						</li>
					))}
				</ol>
			</SignedIn>
		</div>
	);
}
