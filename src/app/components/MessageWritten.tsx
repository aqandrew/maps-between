import * as Dialog from '@radix-ui/react-dialog';
import * as AccessibleIcon from '@radix-ui/react-accessible-icon';
import { VisuallyHidden } from '@radix-ui/react-visually-hidden';
import { Doc } from '../../../convex/_generated/dataModel';

interface MessageWrittenProps {
	message: Doc<'messages'>;
}

export default function MessageWritten({
	message: { message, location },
}: MessageWrittenProps) {
	return (
		<Dialog.Root>
			<Dialog.Trigger className="flex items-center w-full py-1 px-2 border-2 text-left">
				<AccessibleIcon.Root label="message icon">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 100 100"
						className="w-16"
					>
						<text y="0.9em" fontSize="90">
							📓
						</text>
					</svg>
				</AccessibleIcon.Root>

				<div className="flex-1">
					<p className="border-b-2">{message}</p>
					{/* TODO display human-friendly location */}
					<p>{JSON.stringify(location)}</p>

					<dl className="flex gap-16 w-fit ml-auto">
						<div className="flex gap-10">
							<dt>Good</dt>
							<dd>TODO</dd>
						</div>
						<div className="flex gap-10">
							<dt>Poor</dt>
							<dd>TODO</dd>
						</div>
					</dl>
				</div>
			</Dialog.Trigger>

			<Dialog.Portal>
				<Dialog.Overlay className="fixed inset-0 bg-black opacity-50" />

				<Dialog.Content className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[640px] py-2 border-2 bg-white text-center">
					<Dialog.Title>Delete this message from list?</Dialog.Title>

					<VisuallyHidden asChild>
						<Dialog.Description>
							Delete this message you previously wrote.
						</Dialog.Description>
					</VisuallyHidden>

					<div className="flex justify-center gap-12 mt-4">
						<Dialog.Close
							className="w-60 p-1 bg-gray-200"
							onClick={() => console.log('TODO remove message')}
						>
							YES
						</Dialog.Close>
						<Dialog.Close className="w-60 p-1 bg-gray-200">NO</Dialog.Close>
					</div>
				</Dialog.Content>
			</Dialog.Portal>
		</Dialog.Root>
	);
}
