import axios from "axios";

export const celdApi = axios.create({
    baseURL: "http://localhost:5091/api"
});