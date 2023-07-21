import axios from "axios";
import { API_URL } from "./Constants";

export const axiosInstance = axios.create({
    baseURL: API_URL,
})