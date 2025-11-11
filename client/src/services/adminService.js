import axios from 'axios';

const adminApi = axios.create({
  baseURL: 'http://localhost:5000/api/admin',
});

adminApi.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['x-auth-token'] = token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// --- Project Functions ---
export const getAdminProjects = () => adminApi.get('/projects');
export const addProject = (projectData) => adminApi.post('/projects', projectData);
export const updateProject = (id, projectData) => adminApi.put(`/projects/${id}`, projectData);
export const deleteProject = (id) => adminApi.delete(`/projects/${id}`);

// --- Message Functions ---
export const getAdminMessages = () => adminApi.get('/messages');

// --- About Functions ---
export const getAboutAdmin = () => adminApi.get('/about');
export const updateAbout = (aboutData) => adminApi.put('/about', aboutData);