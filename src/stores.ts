import { writable, type Writable } from "svelte/store";

export const activeContact: Writable<Contact|null> = writable(null);