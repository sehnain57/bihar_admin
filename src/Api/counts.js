import axios from "axios";
import { baseUrl, getToken } from "./config";


export const CountsTotalGet = async () => {
    try {
        const response = await axios.get(`${baseUrl}/api/counts/v1/all`, {
            headers: {
                'accept': 'application/json',
                Authorization: `Bearer ${getToken()}`
            }
        });
        return response.data;
    } catch (err) {
        console.error('Failed to fetch counts:', err.response ? err.response.data : err.message);
        throw err;
    }
};

export const CountsStatusGet = async () => {
    try {
        const response = await axios.get(`${baseUrl}/api/counts/v1/counts-by-status`, {
            headers: {
                'accept': 'application/json',
                Authorization: `Bearer ${getToken()}`
            }
        });
        return response.data;
    } catch (err) {
        console.error('Failed to fetch counts:', err.response ? err.response.data : err.message);
        throw err;
    }
};