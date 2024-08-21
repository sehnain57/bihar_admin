import axios from 'axios';
import { baseUrl } from './config'; // Adjust the import path according to your project structure

// 1. Login or Register User
export const loginUser = async (mobileNumber, fcmToken) => {
  try {
    const response = await axios.post(`${baseUrl}/api/epicUser/v1/login`, {
      mobileNumber,
      fcmToken
    });
    return response.data;
  } catch (error) {
    console.error('Error logging in:', error);
    throw error;
  }
};

// 2. Register or Update User
export const registerUser = async (mobileNumber, authorizationCode) => {
  try {
    const response = await axios.post(`${baseUrl}/api/epicUser/v1/register`, {
      mobileNumber,
      authorizationCode
    });
    return response.data;
  } catch (error) {
    console.error('Error registering user:', error);
    throw error;
  }
};

// 3. Update User Details
export const updateUserDetails = async (mobileNumber, userData, imageFile) => {
  try {
    const formData = new FormData();
    formData.append('mobileNumber', mobileNumber);
    formData.append('userData', JSON.stringify(userData)); // Assuming userData is an object with the user's details
    if (imageFile) {
      formData.append('image', imageFile);
    }

    const response = await axios.put(`${baseUrl}/api/epicUser/v1/update`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error updating user details:', error);
    throw error;
  }
};

// 4. Retrieve Users List
export const getUsers = async (page = 1, limit = 10, query = '') => {
  try {
    const response = await axios.get(`${baseUrl}/api/epicUser/v1/users`, {
      params: {
        page,
        limit,
        query,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error;
  }
};

// 5. Delete User by ID
export const deleteUserById = async (userId) => {
  try {
    const response = await axios.delete(`${baseUrl}/api/epicUser/v1/users/${userId}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting user:', error);
    throw error;
  }
};

// 6. Retrieve Authenticated User Details
export const getAuthenticatedUserDetails = async () => {
  try {
    const response = await axios.get(`${baseUrl}/api/epicUser/v1/users/me`);
    return response.data;
  } catch (error) {
    console.error('Error fetching authenticated user details:', error);
    throw error;
  }
};
