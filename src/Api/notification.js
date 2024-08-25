import axios from 'axios';
import Swal from 'sweetalert2';
import { baseUrl, getToken } from './config';


export const addNotification = async (notificationData) => {
    console.log('check datataaaa---->',notificationData)
    try {
        const response = await axios.post(
            `${baseUrl}/api/notifications/v1/notifications`,
            {
                title: notificationData.title,
                description: notificationData.description,
                date: notificationData.date,
                time: notificationData.time,
                "timezone": notificationData.timezone
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
        Swal.fire("Success", "Notification Added successfully", "success")
        return response.data;
    } catch (err) {
        Swal.fire("Error", err.response ? err.response.data.message : err.message, "error");
        console.error('Notification failed:', err.response ? err.response.data : err.message);
        throw err;
    }
};
