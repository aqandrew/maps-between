import { Dispatch, SetStateAction, useState } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { CATEGORIES, TEMPLATES, WORDS } from '@/constants';
import WordList from '@/app/components/WordList';

type Category = keyof typeof WORDS;

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
	const [category, setCategory] = useState<Category>(
		Object.keys(WORDS)[0] as Category
	);
	const isTemplates = label === 'Templates';
	const choices = isTemplates ? TEMPLATES : WORDS[category];

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

				<Dialog.Content className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-60 flex flex-col border-2 bg-white">
					<Dialog.Title className="text-center underline">{label}</Dialog.Title>

					{/* TODO add dialog description */}
					<Dialog.Description />

					{/* TODO max-h-full isn't quite the right rule to limit WordList height */}
					<div className="max-h-full flex-1 flex gap-10 justify-center mx-10">
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
