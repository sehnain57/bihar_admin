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
        const response = await axios.get(`${baseUrl}/api/grievances/v1/grievances`, {
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

export const assignGrievanceUser = async (id, mobilenumber) => {
    if (!id || mobilenumber === undefined) {
        throw new Error('Invalid input: id and mobilenumber are required');
    }

    try {
        // console.log("id check------------>", id, "statuss----->", statuss);
        
        // Ensure status is a number


        const response = await axios.patch(
            `${baseUrl}/api/grievances/v1/assignGrievance/${id}`,
            { contactNumber: mobilenumber },
            {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                     Authorization: `Bearer ${getToken()}`
                }
            }
        );
        Swal.fire("Success", "Assign Grievance to User successfully", "success")
        console.log('Assign updated successfully', response.data);
        return response.data;
    } catch (err) {
        console.error('Error updating status:', err.response ? err.response.data : err.message);
        throw err; // Re-throw the error if you want to handle it elsewhere
    }
};
export const updateStatus = async (id, statuss) => {
    if (!id || statuss === undefined) {
        throw new Error('Invalid input: id and status are required');
    }

    try {
        // console.log("id check------------>", id, "statuss----->", statuss);
        
        // Ensure status is a number


        const response = await axios.put(
            `${baseUrl}/api/grievances/v1/update-status/${id}`,
            { status: statuss },
            {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                     Authorization: `Bearer ${getToken()}`
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

