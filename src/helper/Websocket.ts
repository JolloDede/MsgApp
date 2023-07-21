import { io } from "socket.io-client";
import { API_URL } from "./Constants";

const socket = io(API_URL, { autoConnect: false });

socket.onAny((event, ...args) => {
    console.log(event, args);
});

export default socket;