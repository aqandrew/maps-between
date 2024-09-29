import { FC } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import * as Tabs from '@radix-ui/react-tabs';
import { VisuallyHidden } from '@radix-ui/react-visually-hidden';
import WriteMessage from '@/app/components/WriteMessage';
import MessagesWritten from '@/app/components/MessagesWritten';
import MessagesDiscovered from '@/app/components/MessagesDiscovered';

type Tab = {
	value: string;
	label: string;
	component: FC;
};

const TABS: Array<Tab> = [
	{ value: 'write-message', label: 'Write Message', component: WriteMessage },
	{
		value: 'messages-written',
		label: 'Messages Written',
		component: MessagesWritten,
	},
	{
		value: 'messages-discovered',
		label: 'Messages Discovered',
		component: MessagesDiscovered,
	},
];

export default function Home() {
	return (
		<main>
			<Dialog.Root>
				<Dialog.Trigger asChild>
					<button className="p-2 bg-gray-200">Messages</button>
				</Dialog.Trigger>

				<Dialog.Portal>
					<Dialog.Overlay className="fixed inset-0 bg-black opacity-50" />

					<Dialog.Content className="fixed top-0 bottom-0 left-48 right-48 flex flex-col bg-white">
						<Dialog.Title>Messages</Dialog.Title>

						<VisuallyHidden asChild>
							<Dialog.Description>
								Write a new message, view previously written messages, or view
								messages discovered from others. Click Finish when you&apos;re
								done.
							</Dialog.Description>
						</VisuallyHidden>

						<Tabs.Root className="flex-1 flex flex-col">
							<Tabs.List className="flex gap-2 border-y-2">
								{TABS.map(({ value, label }) => (
									<Tabs.Trigger
										value={value}
										className="data-[state=active]:shadow-[inset_0_-1px_0_0,0_1px_0_0] data-[state=active]:shadow-current data-[state=active]:focus:relative data-[state=active]:focus:shadow-[0_0_0_2px] data-[state=active]:focus:shadow-black"
										key={value}
									>
										{label}
									</Tabs.Trigger>
								))}
							</Tabs.List>

							{TABS.map(({ value, component }) => {
								const Component = component;
								return (
									<Tabs.Content value={value} className="flex-1" key={value}>
										<Component />
									</Tabs.Content>
								);
							})}
						</Tabs.Root>
					</Dialog.Content>
				</Dialog.Portal>
			</Dialog.Root>
		</main>
	);
}
