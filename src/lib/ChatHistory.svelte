<script lang="ts">
	import socket from '../helper/Websocket';

	let msgHistory: Message[] = [];

	socket.on('private message', ({ content, roomId, from }) => {
		console.log('private message content: ' + content);
		msgHistory = [...msgHistory, { roomId: roomId, senderId: from, content: content }];
	});
</script>

<div class="flex flex-col">
	<h1>Messages</h1>

	{#each msgHistory as msg}
		<div class="bg-primary-color-100 rounded-lg p-4">
			<p>{msg.content}</p>
		</div>
	{/each}
</div>
