import axios from "axios";


export const externalAxiosClient = axios.create({
  timeout: 10_000,
});