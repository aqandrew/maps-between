import { Dispatch, SetStateAction } from 'react';
import * as Dialog from '@radix-ui/react-dialog';

interface WordListProps {
	choices: string[];
	setWord: Dispatch<SetStateAction<string>>;
}

export default function WordList({ choices, setWord }: WordListProps) {
	return (
		<div className="flex flex-col items-center gap-2 overflow-y-auto">
			{choices.map((choice, i) => (
				<Dialog.Close asChild key={i}>
					<button onClick={() => setWord(choice)} className="w-60 bg-gray-200">
						{choice}
					</button>
				</Dialog.Close>
			))}
		</div>
	);
}
