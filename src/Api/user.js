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

export const registerEpicUser = async (userData) => {
    try {
        const response = await axios.post(
            `${baseUrl}/api/epicUser/v1/user`,
            {
                fullName: userData.fullName,
                fatherName: userData.fatherName,
                epicId: userData.epicId,
                mobileNumber: userData.mobileNumber,
                gender: userData.gender,
                age: userData.age,
                email: userData.email,
                legislativeConstituency: userData.legislativeConstituency,
                boothNameOrNumber: userData.boothNameOrNumber,
                image: "",
                fcmToken: "",
                timeZone: userData.timeZone,
                status: "1"

            },
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                   
                }
            }
        );
        // If the request is successful, the response will be returned
        Swal.fire("Success", "User Added successfully", "success")
        return response.data;
    } catch (err) {
        Swal.fire("Error", err.response ? err.response.data.message : err.message, "error");
        console.error('Registration failed:', err.response ? err.response.data : err.message);
        throw err;
    }
};

export const loginAndSaveToken = async () => {
    const email = 'admin@example.com';  // Fixed email value
    const password = 'admin';           // Fixed password value

    try {
        const response = await axios.post(
            `${baseUrl}/api/admin/v1/login`,
            {
                email,
                password
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            }
        );

        if (response.data.success && response.data.data && response.data.data.token) {
            // Save the token in local storage
            localStorage.setItem('token', response.data.data.token);
            return response.data.data.token;
        } 
        
        Swal.fire("Error", response.data.message || "Login failed", "error");
        throw new Error(response.data.message || "Login failed");

    } catch (err) {
        console.error('Login failed:', err.response ? err.response.data : err.message);
        Swal.fire("Error", err.response ? err.response.data.message : err.message, "error");
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
        // Swal.fire("No", "No user Founds", "Found");
        console.error('Failed to fetch users:', err.response ? err.response.data : err.message);
        throw err;
    }
};
export const getEpicUsers = async (query, page = 1, limit = 10) => {
    try {
        const response = await axios.get(`${baseUrl}/api/epicUser/v1/users`, {
            params: {
                page,
                limit,
                query
            },
            headers: {
                'accept': 'application/json',
            }
        });
        return response.data;
    } catch (err) {
        // Swal.fire("No", "No user Founds", "Found");
        console.error('Failed to fetch users:', err.response ? err.response.data : err.message);
        throw err;
    }
};
export const removeUser = async (userId) => {
    try {
        const response = await axios.delete(`${baseUrl}/api/user/v1/users/${userId}`, {
            headers: {
                'accept': 'application/json',
               Authorization: `Bearer ${getToken()}`
            }
        });
        Swal.fire("Success", "User removed successfully", "success")
        return response.data;
    } catch (err) {
        console.error('Failed to remove user:', err.response ? err.response.data : err.message);
        throw err;
    }
};

export const searchEpicUsers = async (mobileNumber,epicId, page = 1, limit = 10) => {

    console.log("user------->",mobileNumber,epicId);
    try {
        const response = await axios.get(`${baseUrl}/api/epicUser/v1/users/search`, {
            params: {
                mobileNumber,
                epicId,
                page,
                limit,
            },
            headers: {
                'accept': 'application/json'
            }
        });
        Swal.fire("Success", "User Search successfully", "success")
        return response.data;
    } catch (err) {
        console.error('Failed to fetch users:', err.response ? err.response.data : err.message);
        throw err;
    }
};

// Add New Karyakartha


export const searchUsers = async (mobileNumber,epicId, page = 1, limit = 10) => {

    console.log("user------->",mobileNumber,epicId);
    try {
        const response = await axios.get(`${baseUrl}/api/user/v1/users/search`, {
            params: {
                mobileNumber,
                epicId,
                page,
                limit,
            },
            headers: {
                'accept': 'application/json',
                Authorization: `Bearer ${getToken()}`
            }
        });
        Swal.fire("Success", "User Search successfully", "success")
        return response.data;
    } catch (err) {
        console.error('Failed to fetch users:', err.response ? err.response.data : err.message);
        throw err;
    }
};
export const removeEpicUser = async (userId) => {
    try {
        const response = await axios.delete(`${baseUrl}/api/epicUser/v1/users/${userId}`, {
            headers: {
                'accept': 'application/json',
               Authorization: `Bearer ${getToken()}`
            }
        });
        Swal.fire("Success", "User removed successfully", "success")
        return response.data;
    } catch (err) {
        console.error('Failed to remove user:', err.response ? err.response.data : err.message);
        throw err;
    }
};