'use client';

import { useState } from 'react';
import MessageSlot from '@/app/components/MessageSlot';

export default function WriteMessage() {
	const [template, setTemplate] = useState('');
	const [word, setWord] = useState('');

	const message = word ? template.replaceAll('****', word) : template;

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
