import { Dispatch, SetStateAction, useState } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { VisuallyHidden } from '@radix-ui/react-visually-hidden';
import { CATEGORIES, TEMPLATES, WORDS } from '@/app/lib/constants';
import WordList from '@/app/components/WordList';

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
	const [category, setCategory] = useState(Object.keys(WORDS)[0]);
	const isTemplates = label === 'Templates';
	const choices = isTemplates
		? TEMPLATES
		: WORDS[category as keyof typeof WORDS];
	const isCategories = choices === CATEGORIES;

	return (
		<Dialog.Root>
			<div className="grid col-span-full grid-cols-subgrid">
				<label htmlFor={id} className="justify-self-end cursor-pointer">
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
						className="w-60 border-2 cursor-pointer text-center"
					/>
				</Dialog.Trigger>
			</div>

			<Dialog.Portal>
				<Dialog.Overlay />

				<Dialog.Content className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[640px] border-2 bg-white">
					<Dialog.Title className="text-center underline">{label}</Dialog.Title>

					<VisuallyHidden asChild>
						<Dialog.Description>
							Click to select a{' '}
							{isTemplates ? 'template' : isCategories ? 'category' : 'word'}.
						</Dialog.Description>
					</VisuallyHidden>

					<div className="flex gap-10 justify-center">
						{isTemplates ? null : (
							<WordList choices={CATEGORIES} setWord={setCategory} />
						)}

						<WordList choices={choices} setWord={setString} />
					</div>
				</Dialog.Content>
			</Dialog.Portal>
		</Dialog.Root>
	);
}
