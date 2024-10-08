import axios from 'axios';
import Swal from 'sweetalert2';

import { baseUrl , getToken } from './config';

export const createConstituencies = async (formData) => {
    try {
        const response = await axios.post(
            `${baseUrl}/api/constituencies/v1/constituencies`,
            formData, // Pass the entire formData object
            {
                headers: {
                    'accept': 'application/json',
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${getToken()}`,
                },
            }
        );
        Swal.fire("Success", "Constituency Added", "success");
        return response.data;
    } catch (err) {
        console.error('Failed to create constituency:', err.response ? err.response.data : err.message);
        throw err;
    }
};
export const getAllConstituencies = async () => {
    try {
      const response = await axios.get(`${baseUrl}/api/constituencies/v1/constituencies/all`, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching all constituencies:', error);
      throw error;
    }
  };
export const getConstituencies = async (page = 1, limit = 10) => {
    try {
        const response = await axios.get(`${baseUrl}/api/constituencies/v1/constituencies`, {
            params: {
                page,
                limit
            },
            headers: {
                'accept': 'application/json',
                Authorization: `Bearer ${getToken()}`
            }
        });

        return response.data;
    } catch (err) {
        Swal.fire("No", "No Found constituencies.", "Found");
        console.error('Failed to fetch constituencies:', err.response ? err.response.data : err.message);
        // No re-throwing of the error here, so the function won't propagate the error further.
        return null; 
    }
};

export const updateConstituency = async (constituencyId, data) => {
    try {
        const response = await axios.put(`${baseUrl}/api/constituencies/v1/constituencies/${constituencyId}`, data, {
            headers: {
                'accept': 'application/json',
                'Content-Type': 'application/json',
                Authorization: `Bearer ${getToken()}`
            }
        });

        Swal.fire("Success", "Constituency updated successfully", "success")
        return response.data;
    } catch (err) {
        console.error('Failed to update constituency:', err.response ? err.response.data : err.message);
        throw err;
    }
};


export const deleteConstituency = async (constituencyId) => {
    try {
        const response = await axios.delete(`${baseUrl}/api/constituencies/v1/constituencies/${constituencyId}`, {
            headers: {
                'accept': 'application/json',
                Authorization: `Bearer ${getToken()}`
            }
        });
        Swal.fire("Success", "Constituency deleted successfully", "success")
        return response.data;
    } catch (err) {
        console.error('Failed to delete constituency:', err.response ? err.response.data : err.message);
        throw err;
    }
};
