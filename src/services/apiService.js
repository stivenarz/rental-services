import axios from "axios";

/**
 * URL base del backend.
 * Puedes alternar entre producción y desarrollo.
 * @type {string}
 */
const API_URL = import.meta.env.VITE_API_URL;

/**
 * Obtiene el token almacenado en localStorage.
 *
 * @returns {string|null} Token JWT si existe, de lo contrario null.
 */
const getToken = () => localStorage.getItem("token");

/**
 * Instancia de Axios configurada con el backend.
 * @type {import("axios").AxiosInstance}
 */
const api = axios.create({
  baseURL: API_URL,
});

/**
 * Interceptor que agrega automáticamente el header Authorization
 * antes de cada solicitud si existe un token.
 */
api.interceptors.request.use((config) => {
  const token = getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

/**
 * Servicio genérico para realizar solicitudes HTTP al backend.
 * Contiene métodos CRUD reutilizables para cualquier endpoint.
 *
 * @namespace apiService
 */
const apiService = {
  /**
   * Obtiene todos los registros del endpoint dado.
   *
   * @async
   * @param {string} endpoint - Nombre del endpoint (ej: "users", "agendas").
   * @returns {Promise<any>} Datos retornados por la API.
   *
   * @example
   * const users = await apiService.getAll("users");
   */
  async getAll(endpoint) {
    try {
      const { data } = await api.get(`/${endpoint}/`);
      return data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  /**
   * Obtiene un registro por su ID.
   *
   * @async
   * @param {string} endpoint - Nombre del endpoint.
   * @param {string|number} id - ID del recurso.
   * @returns {Promise<any>} Datos del recurso solicitado.
   *
   * @example
   * const user = await apiService.getById("users", 1);
   */
  async getById(endpoint, id) {
    try {
      const { data } = await api.get(`/${endpoint}/${id}`);
      return data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  /**
   * Crea un nuevo registro en el backend.
   *
   * @async
   * @param {string} endpoint - Nombre del endpoint.
   * @param {any} payload - Datos a enviar en el body.
   * @returns {Promise<any>} Recurso creado.
   *
   * @example
   * await apiService.post("users", {name: "Stiven"});
   */
  async post(endpoint, payload) {
    try {
      const { data } = await api.post(`/${endpoint}`, payload);
      return data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  /**
   * Actualiza un registro existente por su ID.
   *
   * @async
   * @param {string} endpoint - Nombre del endpoint.
   * @param {string|number} id - ID del recurso a modificar.
   * @param {any} payload - Datos para la actualización.
   * @returns {Promise<any>} Recurso actualizado.
   *
   * @example
   * await apiService.update("users", 1, {name: "Nuevo Nombre"});
   */
  async update(endpoint, id, payload) {
    try {
      const { data } = await api.put(`/${endpoint}/${id}`, payload);
      return data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  /**
   * Elimina un registro del backend.
   *
   * @async
   * @param {string} endpoint - Nombre del endpoint.
   * @param {string|number} id - ID del recurso a eliminar.
   * @returns {Promise<any>} Datos de confirmación.
   *
   * @example
   * await apiService.remove("users", 1);
   */
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
