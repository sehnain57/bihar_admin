import axios from 'axios';
import Swal from 'sweetalert2';
import { baseUrl, getToken } from './config';


export const createGrievance = async (data) => {
    try {
        const formData = new FormData();

        // Append each field to the form data
        formData.append('gender', data.gender);
        formData.append('voterId', data.voterId);
        formData.append('isAdmin', data.isAdmin);
        formData.append('fatherName', data.fatherName);
        formData.append('contactNumber', data.contactNumber);
        formData.append('ticketTitle', data.ticketTitle);
        formData.append('boothNameOrNumber', data.boothNameOrNumber);
        formData.append('attachments', data.attachments); // If attachments is a file, pass the file object
        formData.append('legislativeConstituency', data.legislativeConstituency);
        formData.append('fullName', data.fullName);
        formData.append('description', data.description);
        formData.append('category', data.category);
        formData.append('subCategory', data.subCategory);
        formData.append('age', data.age);

        const response = await axios.post(`${baseUrl}/api/grievances/v1/admin/grievances`, formData, {
            headers: {
                'accept': 'application/json',
                'Content-Type': 'multipart/form-data',
                Authorization: `Bearer ${getToken()}`
            }
        });
        Swal.fire("Success", "Grievance added successfully", "success")
        return response.data;
    } catch (err) {
        console.error('Failed to create grievance:', err.response ? err.response.data : err.message);
        throw err;
    }
};


export const GrievancesGet = async (page = 1, limit = 10) => {
    try {
        const response = await axios.get(`${baseUrl}/api/grievances/v1/admin/grievances`, {
            params: {
                page,
                limit,
            },
            headers: {
                'accept': 'application/json',
                Authorization: `Bearer ${getToken()}`
            }
        });
        return response.data;
    } catch (err) {
        console.error('Failed to fetch grievances:', err.response ? err.response.data : err.message);
        throw err;
    }
};

export const updateGrievance = async (grievanceId, data) => {
    try {
        const formData = new FormData();

        // Append each field to the form data
        formData.append('gender', data.gender);
        formData.append('voterId', data.voterId);
        formData.append('fatherName', data.fatherName);
        formData.append('contactNumber', data.contactNumber);
        formData.append('ticketTitle', data.ticketTitle);
        formData.append('boothNameOrNumber', data.boothNameOrNumber);
        formData.append('attachments', data.attachments); // If attachments is a file, pass the file object
        formData.append('note', data.note);
        formData.append('status', data.status);
        formData.append('legislativeConstituency', data.legislativeConstituency);
        formData.append('fullName', data.fullName);
        formData.append('description', data.description);
        formData.append('category', data.category);
        formData.append('subCategory', data.subCategory);
        formData.append('age', data.age);

        const response = await axios.put(`${baseUrl}/api/grievances/v2/grievances/${grievanceId}`, formData, {
            headers: {
                'accept': 'application/json',
                'Content-Type': 'multipart/form-data',
                Authorization: `Bearer ${getToken()}`
            }
        });
        Swal.fire("Success", "Grievance updated successfully", "success")
        return response.data;
    } catch (err) {
        console.error('Failed to update grievance:', err.response ? err.response.data : err.message);
        throw err;
    }
};

export const deleteGrievance = async (grievanceId) => {
    try {
        const response = await axios.delete(`${baseUrl}/api/grievances/v1/grievances/${grievanceId}`, {
            headers: {
                'accept': 'application/json',
                Authorization: `Bearer ${getToken()}`
            }
        });
        Swal.fire("Success", "Grievance deleted successfully", "success")
        return response.data;
    } catch (err) {
        console.error('Failed to delete grievance:', err.response ? err.response.data : err.message);
        throw err;
    }

}

