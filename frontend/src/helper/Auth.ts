import { user } from "../stores";
import { axiosInstance } from "./Axios";
import socket from "./Websocket";

export async function Auth(name: string): Promise<boolean> {
    return await axiosInstance
			.post('/login', {
				username: name
			})
			.then((res) => {
				let resObj = res.data[0];
				// console.log(resObj);
				user.set(resObj);
				socket.auth = { id: resObj.id };
				socket.connect();
                return true;
			})
			.catch((err) => {
				console.log(err);
                return false;
			});
}