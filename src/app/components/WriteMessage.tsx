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
			<span>{message}</span>
			<MessageSlot
				id="template"
				label="Templates"
				string={template}
				setString={setTemplate}
			/>
			<MessageSlot id="word" label="Words" string={word} setString={setWord} />
		</>
	);
}
