'use client';

import { useState } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { TEMPLATES } from '@/constants';

interface MessageSlotProps {
	id: string;
	label: string;
}

export default function MessageSlot({ id, label }: MessageSlotProps) {
	// TODO handle words
	const [template, setTemplate] = useState('');

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
						value={template}
						onChange={(e) => setTemplate(e.target.value)}
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

					<div className="flex flex-col items-center gap-2 overflow-y-scroll">
						{TEMPLATES.map((t, i) => (
							<Dialog.Close asChild key={i}>
								<button
									onClick={() => setTemplate(t)}
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
