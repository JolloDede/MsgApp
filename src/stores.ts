import { writable, type Writable } from "svelte/store";

export const activeContact: Writable<Contact | null> = writable(null);
export const user: Writable<User | null> = writable(null);