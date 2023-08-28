<script lang="ts">
	import { browser } from '$app/environment';
	import socket from '../helper/Websocket';
	import { LOCALSTORAGE_PREFIX, activeContact } from '../stores';

	const LOCALSTORAGECHATHISTORY = LOCALSTORAGE_PREFIX + 'history-';
	let msgHistory: Message[] = [];
	let contactId: string;

	activeContact.subscribe((value) => {
		// activeContact should always be true
		contactId = value?.id!;

		if (browser) {
			let stored = localStorage.getItem(LOCALSTORAGECHATHISTORY + value?.id);
			if (stored) {
				msgHistory = JSON.parse(stored);
			} else {
				msgHistory = [];
			}
		}
	});

	function writeToLocalstorage(itemName: string, msg: Message) {
		let stored = localStorage.getItem(LOCALSTORAGECHATHISTORY + itemName);
		if (stored) {
			let oldMessages: Message[] = JSON.parse(stored);
			localStorage.setItem(
				LOCALSTORAGECHATHISTORY + itemName,
				JSON.stringify([...oldMessages, msg])
			);
		} else {
			localStorage.setItem(LOCALSTORAGECHATHISTORY + itemName, JSON.stringify([msg]));
		}
	}

	socket.on('private message', ({ content, roomId, from }) => {
		console.log('private message content: ' + content);
		if (contactId == roomId) {
			msgHistory = [...msgHistory, { roomId: roomId, senderId: from, content: content }];
		}
		writeToLocalstorage(roomId, { roomId: roomId, senderId: from, content: content });
	});
</script>

<div class="flex flex-col">
	{#each msgHistory as msg}
		<div class="bg-primary-color-100 rounded-lg p-4">
			<p>{msg.content}</p>
		</div>
	{/each}
</div>
