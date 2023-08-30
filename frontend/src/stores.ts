import { browser } from "$app/environment";
import { writable, type Writable } from "svelte/store";

export const LOCALSTORAGE_PREFIX = "chat-app-";

export const activeContact: Writable<Contact | null> = writable(null);

let loadedUser: User = {
    id: "",
    username: ""
};
if (browser) {
    loadedUser = JSON.parse(localStorage.getItem(LOCALSTORAGE_PREFIX + "user")) || loadedUser;
}
export const user = writable<User>(loadedUser);

if (browser) {
    user.subscribe(value => {
        localStorage.setItem(LOCALSTORAGE_PREFIX + "user", JSON.stringify(value));
    });
}
