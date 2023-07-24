<script lang="ts">
	import { formatContactString } from '../helper/ContactFormat';
	import socket from '../helper/Websocket';
	import { activeContact } from '../stores';
	import ChatHistory from './ChatHistory.svelte';

	let msg: string;
	let activContact: Contact;

	activeContact.subscribe((value) => {
		if (value) activContact = value;
	});

	function sendMessage() {
		if (msg == '') {
			return;
		}
		const message: NewMessage = { roomId: activContact.id, content: msg };
		socket.emit("private message", message);
		msg = "";
	}

	function handleTextareaKeyPress(e: KeyboardEvent) {
		if (e.key == 'Enter' && e.ctrlKey) {
			e.preventDefault();
			msg += '\n';
		} else if (e.key == 'Enter') {
			e.preventDefault();
			sendMessage();
		}
	}
</script>

<div class="flex flex-col w-full h-screen">
	<div class="flex flex-row h-14 border bg-primary-color-400">
		{#if activContact}
			<h2 class="m-auto ml-2 font-bold">{formatContactString(activContact.to)}</h2>
		{/if}
	</div>
	<div
		class="flex h-full border border-primary-color-300 bg-gradient-to-b from-primary-color-400 to-primary-color-100"
	>
		<ChatHistory />
	</div>
	<div class="flex h-16 bg-gradient-to-b from-primary-color-100 to-primary-color-50">
		<div class="w-full">
			<div class="flex border h-full">
				<textarea
					rows="1"
					placeholder="Your message..."
					class="m-2 p-2 w-full rounded-lg text-sm resize-none outline-none focus:ring focus:ring-primary-color-500"
					bind:value={msg}
					on:keypress={handleTextareaKeyPress}
				/>
				<button
					type="submit"
					class="inline-flex justify-center items-center p-2 text-primary-color-600 rounded-full cursor-pointer hover:bg-primary-color-200"
					on:click={sendMessage}
				>
					<svg
						class="w-5 h-5 rotate-90"
						aria-hidden="true"
						xmlns="http://www.w3.org/2000/svg"
						fill="currentColor"
						viewBox="0 0 18 20"
					>
						<path
							d="m17.914 18.594-8-18a1 1 0 0 0-1.828 0l-8 18a1 1 0 0 0 1.157 1.376L8 18.281V9a1 1 0 0 1 2 0v9.281l6.758 1.689a1 1 0 0 0 1.156-1.376Z"
						/>
					</svg>
					<span class="sr-only">Send message</span>
				</button>
			</div>
		</div>
		<div class="w-20 h-full">File input</div>
	</div>
</div>
