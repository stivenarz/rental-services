import axios from "axios";

const API_URL = "https://192.168.1.105:3000"; // ⬅️ Cambia por tu backend

// Puedes obtener token del localStorage si lo usas
const getToken = () => localStorage.getItem("token");

const api = axios.create({
  baseURL: API_URL,
});

// Interceptor para agregar token automáticamente
api.interceptors.request.use((config) => {
  const token = getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

const apiService = {
  // GET ALL
  async getAll(endpoint) {
    try {
      const { data } = await api.get(`/${endpoint}`);
      return data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  // GET BY ID
  async getById(endpoint, id) {
    try {
      const { data } = await api.get(`/${endpoint}/${id}`);
      return data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  // CREATE
  async create(endpoint, payload) {
    try {
      const { data } = await api.post(`/${endpoint}`, payload);
      return data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  // UPDATE
  async update(endpoint, id, payload) {
    try {
      const { data } = await api.put(`/${endpoint}/${id}`, payload);
      return data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  // DELETE
  async remove(endpoint, id) {
    try {
      const { data } = await api.delete(`/${endpoint}/${id}`);
      return data;
    } catch (error) {
      throw error.response?.data || error;
    }
  }
};

export default apiService;
