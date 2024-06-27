import MessageSlot from '@/app/components/MessageSlot';

export default function WriteMessage() {
	return (
		<>
			<MessageSlot id="templates" label="Templates" />
			<MessageSlot id="words" label="Words" />
		</>
	);
}
