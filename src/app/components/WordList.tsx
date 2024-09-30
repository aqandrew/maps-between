import { Dispatch, SetStateAction } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { CATEGORIES } from '@/app/lib/constants';

interface WordListProps {
	choices: Array<string>;
	setWord: Dispatch<SetStateAction<string>>;
}

export default function WordList({ choices, setWord }: WordListProps) {
	const Button = choices === CATEGORIES ? 'button' : Dialog.Close;

	return (
		<div className="h-80 my-3 flex flex-col items-center gap-2 overflow-y-auto">
			{choices.map((choice, i) => (
				<Button
					onClick={() => setWord(choice)}
					className="w-60 bg-gray-200"
					key={i}
				>
					{choice}
				</Button>
			))}
		</div>
	);
}
