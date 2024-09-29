import { Dispatch, SetStateAction } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { CATEGORIES } from '@/constants';

interface WordListProps {
	choices: Array<string>;
	setWord: Dispatch<SetStateAction<string>>;
}

export default function WordList({ choices, setWord }: WordListProps) {
	const isCategories = choices === CATEGORIES;

	return (
		<div className="h-80 my-3 flex flex-col items-center gap-2 overflow-y-auto">
			{choices.map((choice, i) => {
				// TODO is there a way to DRY up this return without drilling setIsMessagesModalOpen as a prop?
				return isCategories ? (
					<button
						onClick={() => setWord(choice)}
						className="w-60 bg-gray-200"
						key={i}
					>
						{choice}
					</button>
				) : (
					<Dialog.Close
						onClick={() => setWord(choice)}
						className="w-60 bg-gray-200"
						key={i}
					>
						{choice}
					</Dialog.Close>
				);
			})}
		</div>
	);
}
