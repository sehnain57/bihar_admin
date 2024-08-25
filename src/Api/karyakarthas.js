import axios from 'axios';
import Swal from 'sweetalert2';
import { baseUrl,getToken } from './config'; // Adjust the import path according to your project structure

// 1. Login or Register User
export const loginUser = async (mobileNumber, fcmToken) => {
  try {
    const response = await axios.post(`${baseUrl}/api/epicUser/v1/login`, {
      mobileNumber,
      fcmToken
    });
    Swal.fire({
      icon: 'success',
      title: 'Login Successful',
      text: 'You have been logged in successfully!',
    });
    return response.data;
  } catch (error) {
    console.error('Error logging in:', error);
    Swal.fire({
      icon: 'error',
      title: 'Login Failed',
      text: 'There was an error logging in. Please try again.',
    });
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
    Swal.fire({
      icon: 'success',
      title: 'Registration Successful',
      text: 'You have been registered successfully!',
    });
    return response.data;
  } catch (error) {
    console.error('Error registering user:', error);
    Swal.fire({
      icon: 'error',
      title: 'Registration Failed',
      text: 'There was an error registering. Please try again.',
    });
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
    Swal.fire({
      icon: 'success',
      title: 'Update Successful',
      text: 'User details have been updated successfully!',
    });
    return response.data;
  } catch (error) {
    console.error('Error updating user details:', error);
    Swal.fire({
      icon: 'error',
      title: 'Update Failed',
      text: 'There was an error updating user details. Please try again.',
    });
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
    Swal.fire({
      icon: 'error',
      title: 'Fetch Users Failed',
      text: 'There was an error fetching the users. Please try again.',
    });
    throw error;
  }
};

// 5. Delete User by ID
export const deleteUserById = async (userId) => {
  console.log("userId------>", userId);
  try {
    const response = await axios.delete(`${baseUrl}/api/user/v1/users/${userId}`, {
      headers: {
        'Accept': 'application/json',
        'Authorization': `Bearer ${getToken()}`, // Add the Bearer token
      },
    });

    Swal.fire({
      icon: 'success',
      title: 'User Deleted',
      text: 'User has been deleted successfully!',
    });
    return response.data;
  } catch (error) {
    console.error('Error deleting user:', error);
    Swal.fire({
      icon: 'error',
      title: 'Deletion Failed',
      text: 'There was an error deleting the user. Please try again.',
    });
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
    Swal.fire({
      icon: 'error',
      title: 'Fetch Details Failed',
      text: 'There was an error fetching your details. Please try again.',
    });
    throw error;
  }
};
