import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

/**
 * Axios instance with default configuration
 */
const client = axios.create({
  baseURL: API_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json'
  }
});

/**
 * Response interceptor to handle errors
 */
client.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      // Handle 401 Unauthorized - redirect to login
      if (error.response.status === 401) {
        const currentPath = window.location.pathname;
        if (currentPath !== '/login' && currentPath !== '/register' &&
          currentPath !== '/forgot-password' && !currentPath.startsWith('/reset-password')) {
          window.location.href = '/login';
        }
      }
    }
    return Promise.reject(error);
  }
);

/**
 * API methods
 */
export const api = {
  // Auth
  register: (data) => client.post('/sessions/register', data),
  login: (data) => client.post('/sessions/login', data),
  logout: () => client.post('/sessions/logout'),
  getCurrentUser: () => client.get('/sessions/current'),
  forgotPassword: (email) => client.post('/sessions/forgot-password', { email }),
  resetPassword: (token, password) => client.post('/sessions/reset-password', { token, password }),

  // Users
  getAllUsers: () => client.get('/users'),
  getUserById: (id) => client.get(`/users/${id}`),
  createUser: (data) => client.post('/users', data),
  updateUser: (id, data) => client.put(`/users/${id}`, data),
  deleteUser: (id) => client.delete(`/users/${id}`),

  // Pets
  getAllPets: () => client.get('/pets'),
  getPetById: (id) => client.get(`/pets/${id}`),
  createPet: (data) => client.post('/pets', data),
  updatePet: (id, data) => client.put(`/pets/${id}`, data),
  deletePet: (id) => client.delete(`/pets/${id}`),
  uploadPetImage: (id, formData) => client.post(`/pets/${id}/image`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  }),

  // Adoptions
  getAllAdoptions: () => client.get('/adoptions'),
  getUserAdoptions: () => client.get('/adoptions/user'),
  getAdoptionById: (id) => client.get(`/adoptions/${id}`),
  createAdoption: (userId, petId) => client.post(`/adoptions/${userId}/${petId}`),
  deleteAdoption: (id) => client.delete(`/adoptions/${id}`)
};

export default client;
