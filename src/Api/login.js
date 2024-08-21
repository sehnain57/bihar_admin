import axios from 'axios';
import { baseUrl } from './config';

export const loginUser = async (mobileNumber, fcmToken) => {
    try {
        const response = await axios.post(
            `${baseUrl}/api/user/v1/login`,
            {
                mobileNumber,
                fcmToken,
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
            }
        );
        localStorage.setItem("token", response.data.data.token)
        localStorage.setItem("user", JSON.stringify(response.data.data.user))
        console.log('Login successful:', response.data.data, response.data.data.user);
        return response.data.data;
    } catch (err) {
        console.error('Login failed:', err.response ? err.response.data : err.message);
        throw err;
    }
};
