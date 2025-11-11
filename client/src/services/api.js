import axios from 'axios';

// Create a configured instance of axios.
// All requests made with this 'api' instance will automatically go to our
// backend's public routes.
const api = axios.create({
 baseURL: 'https://personal-portfolio-8s2r.onrender.com/api/public',
});


/**
 * @description Fetches the "About Me" content from the backend.
 * @returns {Promise<Object>} A promise that resolves to the about content object.
 */
export const getAboutContent = async () => {
  try {
    const response = await api.get('/about');
    return response.data;
  } catch (error) {
    console.error('Error fetching about content:', error);
    throw error;
  }
};

/**
 * @description Fetches the list of all technical skills from the backend.
 * @returns {Promise<Array>} A promise that resolves to an array of skill objects.
 */
export const getSkills = async () => {
  try {
    const response = await api.get('/skills');
    return response.data;
  } catch (error) {
    console.error('Error fetching skills:', error);
    throw error;
  }
};

/**
 * @description Fetches the list of all projects from the backend.
 * @returns {Promise<Array>} A promise that resolves to an array of project objects.
 */
export const getProjects = async () => {
  try {
    const response = await api.get('/projects');
    return response.data;
  } catch (error) {
    console.error('Error fetching projects:', error);
    throw error;
  }
};

/**
 * @description Submits the contact form data to the backend.
 * @param {Object} formData - The form data containing name, email, and message.
 * @returns {Promise<Object>} A promise that resolves to the success message from the backend.
 */
export const submitContactForm = async (formData) => {
  try {
    const response = await api.post('/contact', formData);
    return response.data;
  } catch (error) {
    console.error('Error submitting contact form:', error);
    throw error.response ? error.response.data : error;
  }
};


// (Optional but good practice) Export all functions as a single object.
const apis = {
  getAboutContent,
  getSkills,
  getProjects,
  submitContactForm,
};

export default apis;