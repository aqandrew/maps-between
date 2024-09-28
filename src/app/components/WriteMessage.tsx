'use client';

import { useState } from 'react';
import MessageSlot from '@/app/components/MessageSlot';

function createMessage(template: string, word: string) {
	let message = template;
	message = message.replaceAll('****', word);
	message = message[0].toUpperCase() + message.slice(1);

	return message;
}

export default function WriteMessage() {
	const [template, setTemplate] = useState('');
	const [word, setWord] = useState('');

	const message = word ? createMessage(template, word) : template;

	return (
		<>
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
		</>
	);
}
