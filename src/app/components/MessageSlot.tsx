import { Dispatch, SetStateAction } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { TEMPLATES, WORDS } from '@/constants';

interface MessageSlotProps {
	id: string;
	label: string;
	string: string;
	setString: Dispatch<SetStateAction<string>>;
}

export default function MessageSlot({
	id,
	label,
	string,
	setString,
}: MessageSlotProps) {
	// TODO handle words submenus
	const choices = label === 'Templates' ? TEMPLATES : WORDS.Enemies;

	return (
		<Dialog.Root>
			<div>
				<label htmlFor={id} className="cursor-pointer">
					{label}
				</label>

				<Dialog.Trigger asChild>
					<input
						type="text"
						name={id}
						id={id}
						value={string}
						onChange={(e) => setString(e.target.value)}
						readOnly
						className="border-2 cursor-pointer"
					/>
				</Dialog.Trigger>
			</div>

			<Dialog.Portal>
				<Dialog.Overlay />

				<Dialog.Content className="fixed inset-36 flex flex-col border-2 bg-white">
					<Dialog.Title className="text-center underline">{label}</Dialog.Title>

					{/* TODO add dialog description */}
					<Dialog.Description />

					<div className="flex flex-col items-center gap-2 overflow-y-auto">
						{choices.map((t, i) => (
							<Dialog.Close asChild key={i}>
								<button
									onClick={() => setString(t)}
									className="w-60 bg-gray-200"
								>
									{t}
								</button>
							</Dialog.Close>
						))}
					</div>
				</Dialog.Content>
			</Dialog.Portal>
		</Dialog.Root>
	);
}
