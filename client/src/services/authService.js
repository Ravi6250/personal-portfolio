import axios from 'axios';

const API_URL = 'https://personal-portfolio-8s2r.onrender.com/api/auth';
/**
 * @description Sends a login request to the backend.
 * @param {Object} userData - Contains username and password.
 * @returns {Promise<Object>} The response data, which includes the JWT token.
 */
const login = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/login`, userData);
    // If login is successful, store the token in localStorage
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
    }
    return response.data;
  } catch (error) {
    console.error('Login error:', error.response.data);
    throw error.response.data;
  }
};

const authService = {
  login,
};

export default authService;