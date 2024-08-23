export const baseUrl = "https://biharb.leadgenadvertisements.com";

export const getToken = () => {
  // Retrieve the token from local storage
  const storedToken = localStorage.getItem('token');
  
  // Return the token from local storage, or null if not found
  return storedToken || null;
};