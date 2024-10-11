import { useState } from 'react';
import { useMutation } from 'convex/react';
import { useUser } from '@clerk/nextjs';
import { api } from '../../../convex/_generated/api';
import { useMapStore } from '@/app/lib/store';
import MessageSlot from '@/app/components/MessageSlot';

function createMessage(template: string, word: string) {
	let message = template;
	message = message.replaceAll('****', word);
	message = message[0].toUpperCase() + message.slice(1);

	return message;
}

export interface WriteMessageProps {
	onSubmit?: () => void;
}

export default function WriteMessage({ onSubmit }: WriteMessageProps) {
	const writeMessage = useMutation(api.messages.add);
	const { user } = useUser();
	const location = useMapStore((state) => state.location!);
	const [template, setTemplate] = useState('');
	const [word, setWord] = useState('');

	const message = word ? createMessage(template, word) : template;

	async function handleSubmit() {
		await writeMessage({ message, location, userId: user!.id });
		onSubmit?.();
	}

	return (
		<form action={handleSubmit} className="h-full flex flex-col">
			<div className="flex justify-center mt-6 mx-12 mb-5 border-b-2">
				<span className="min-h-[1lh] text-lg">{message}</span>
			</div>

			<div className="grid grid-cols-[1fr_240px_1fr] gap-y-1 gap-x-16">
				<MessageSlot
					id="template"
					label="Templates"
					string={template}
					setString={setTemplate}
				/>
				<MessageSlot
					id="word"
					label="Words"
					string={word}
					setString={setWord}
				/>
			</div>

			<div className="flex-1"></div>

			<div className="flex justify-center pb-12">
				{/* TODO autofocus Finish button when all inputs in Component are filled */}
				<button
					className="w-60 p-1 bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
					disabled={!(template && word)}
				>
					Finish
				</button>
			</div>
		</form>
	);
}
