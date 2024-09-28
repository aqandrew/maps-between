import { Dispatch, SetStateAction } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { CATEGORIES } from '@/constants';

interface WordListProps {
	choices: string[];
	setWord: Dispatch<SetStateAction<string>>;
}

export default function WordList({ choices, setWord }: WordListProps) {
	const isCategories = choices === CATEGORIES;

	return (
		<div className="h-80 my-3 flex flex-col items-center gap-2 overflow-y-auto">
			{choices.map((choice, i) => {
				const Button = () => (
					<button onClick={() => setWord(choice)} className="w-60 bg-gray-200">
						{choice}
					</button>
				);

				return isCategories ? (
					<Button key={i} />
				) : (
					<Dialog.Close key={i}>
						<Button />
					</Dialog.Close>
				);
			})}
		</div>
	);
}
