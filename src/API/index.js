import axios from 'axios'

const host = "localhost:8080";
export const baseURL = `http://${host}/serverMWC`;
export const api = axios.create({
    baseURL: baseURL,
    headers: {
        'Content-Type': 'application/json'
    },
});