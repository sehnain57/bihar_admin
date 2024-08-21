import axios from 'axios';
import Swal from 'sweetalert2';
import { baseUrl } from './config';

const getToken = () => localStorage.getItem("token")

export const registerUser = async (userData) => {
    try {
        const response = await axios.post(
            `${baseUrl}/api/user/v1/register`,
            {
                fullName: userData.fullName,
                fatherName: userData.fatherName,
                epicId: userData.epicId,
                mobileNumber: userData.mobileNumber,
                gender: userData.gender,
                age: userData.age,
                email: userData.email,
                legislativeConstituency: userData.legislativeConstituency,
                boothNameOrNumber: userData.boothNameOrNumber
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    Authorization: `Bearer ${getToken()}`
                }
            }
        );
        // If the request is successful, the response will be returned
        return response.data;
    } catch (err) {
        console.error('Registration failed:', err.response ? err.response.data : err.message);
        throw err;
    }
};

export const getUsers = async (query, page = 1, limit = 10) => {
    try {
        const response = await axios.get(`${baseUrl}/api/user/v1/users`, {
            params: {
                page,
                limit,
                query
            },
            headers: {
                'accept': 'application/json',
                Authorization: `Bearer ${getToken()}`
            }
        });
        return response.data;
    } catch (err) {
        console.error('Failed to fetch users:', err.response ? err.response.data : err.message);
        throw err;
    }
};

export const removeUser = async (userId) => {
    try {
        const response = await axios.delete(`${baseUrl}/api/user/v1/users/${userId}`, {
            headers: {
                'accept': 'application/json'
            }
        });
        Swal.fire("Success", "User removed successfully", "success")
        return response.data;
    } catch (err) {
        console.error('Failed to remove user:', err.response ? err.response.data : err.message);
        throw err;
    }
};