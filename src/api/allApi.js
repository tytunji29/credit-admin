import axios from "axios";

// create axios instance with base URL from .env
const api = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// ====================== AUTH APIs ======================
export const login = async (credentials) => {
  const response = await api.post("/LoginUser", credentials);
  return response;
};

export const register = async (data) => {
  const response = await api.post("/AddAdminUser", data);
  return response;
};

// ====================== USER APIs ======================
export const getDefaulters = async () => {
  const response = await api.get("/defaulters");
  return response.data;
};

export const getCustomersByImei = async (imei) => {
  const response = await api.get(`/customers/${imei}`);
  return response.data;
};

// ====================== COUNTRY APIs ======================
export const getCountries = async () => {
  const response = await api.get("/countries");
  return response.data;
};

export const addCountry = async (country) => {
  const response = await api.post("/countries", country);
  return response.data;
};

export const deleteCountry = async (id) => {
  const response = await api.delete(`/countries/${id}`);
  return response.data;
};
// ====================== LockUser APIs ======================
export const lockUser = async (imei) => {
  const response = await api.put(`/LockDevice/${imei}`);
  return response.data;
};

export const unlockUser = async (imei) => {
  const response = await api.put(`/UnlockDevice/${imei}`);
  return response.data;
};
