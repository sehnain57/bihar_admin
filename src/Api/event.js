import axios from "axios";
import Swal from "sweetalert2";
import { baseUrl, getToken } from "./config";

export const addEvent = async (formData) => {
    try {

        const response = await axios.post(
            `${baseUrl}/api/events/v1/adminEvent`,
            formData,
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${getToken()}`
                }
            }
        );
        console.log(response.data);
        Swal.fire("Success", "Event Added successfully", "success")

    } catch (err) {
        console.error('Failed to submit event:', err.response ? err.response.data : err.message);
        Swal.fire("Error", err.response.data.message, "error")
    }

}


export const getEvents = async (page) => {
    try {
        const response = await axios.get(`${baseUrl}/api/events/v1/events`, {
            headers: {
                'Accept': 'application/json'
            },
            params: { page }
        });

        console.log("all events from api", response.data)
        // Return the response data
        return response.data;
    } catch (error) {
        // Handle any errors
        console.error('Error fetching events:', error);
        throw error;
    }
};
export const updateStatus = async (id, statuss) => {
    if (!id || statuss === undefined) {
        throw new Error('Invalid input: id and status are required');
    }

    try {
        // console.log("id check------------>", id, "statuss----->", statuss);
        
        // Ensure status is a number


        const response = await axios.patch(
            `${baseUrl}/api/events/v1/events/status/${id}`,
            { status: statuss },
            {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            }
        );
        Swal.fire("Success", "Status updated successfully", "success")
        console.log('Status updated successfully', response.data);
        return response.data;
    } catch (err) {
        console.error('Error updating status:', err.response ? err.response.data : err.message);
        throw err; // Re-throw the error if you want to handle it elsewhere
    }
};


export const updateEvent = async (eventId, data) => {
    try {
        const formData = new FormData();

        // Append each field to the form data
        formData.append('eventTitle', data.eventTitle);
        formData.append('date', data.date);
        formData.append('fromTime', data.fromTime);
        formData.append('toTime', data.toTime);
        formData.append('constituency', data.constituency);
        formData.append('boothNumber', data.boothNumber);
        formData.append('documents', data.documents); // If documents is a file, pass the file object
        formData.append('status', data.status);

        const response = await axios.put(`${baseUrl}/api/events/v2/events/${eventId}`, formData, {
            headers: {
                'accept': 'application/json',
                'Content-Type': 'multipart/form-data',
                Authorization: `Bearer ${getToken()}`
            }
        });
        Swal.fire("Success", "Event updated successfully", "success")
        return response.data;
    } catch (err) {
        console.error('Failed to update event:', err.response ? err.response.data : err.message);
        throw err;
    }
};

export const deleteEvent = async (id) => {
    try {
        const response = await axios.delete(
            `${baseUrl}/api/events/v1/events/${id}`,
            {
                headers: {
                    'accept': 'application/json',
                    Authorization: `Bearer ${getToken()}`
                }
            }
        );
        console.log('Event deleted successfully', response.data);
        Swal.fire("deleted", "Event deleted successfully", "deleted")
        return response.data;
    } catch (err) {
        console.error('Error deleting event:', err);
        throw err; // Re-throw the error if you want to handle it elsewhere
    }
};
