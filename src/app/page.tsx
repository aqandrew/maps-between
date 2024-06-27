import { FC } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import * as Tabs from '@radix-ui/react-tabs';
import WriteMessage from '@/app/components/WriteMessage';
import MessagesWritten from '@/app/components/MessagesWritten';
import MessagesDiscovered from '@/app/components/MessagesDiscovered';

type Tab = {
	value: string;
	label: string;
	component: FC;
};

const TABS: Tab[] = [
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

						{/* TODO add dialog description */}
						<Dialog.Description />

						<Tabs.Root>
							<Tabs.List className="flex gap-2">
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
									<Tabs.Content value={value} key={value}>
										<Component />
									</Tabs.Content>
								);
							})}
						</Tabs.Root>

						<div className="flex-1"></div>

						<div className="flex justify-center pb-12">
							<Dialog.Close asChild>
								<button className="w-48 p-2 bg-gray-200">Finish</button>
							</Dialog.Close>
						</div>
					</Dialog.Content>
				</Dialog.Portal>
			</Dialog.Root>
		</main>
	);
}
