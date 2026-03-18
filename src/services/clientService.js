import axios from "axios";

const API_URL = "http://localhost:5152/api/Clients";

const getHeaders = () => {
  const token = localStorage.getItem("token") || sessionStorage.getItem("token");
  return { Authorization: `Bearer ${token}` };
};

export const getClients = async () => {
  const response = await axios.get(API_URL, { headers: getHeaders() });
  return response.data;
};

export const createClient = async (dto) => {
  const response = await axios.post(API_URL, dto, { headers: getHeaders() });
  return response.data;
};

export const updateClient = async (id, dto) => {
  const response = await axios.put(`${API_URL}/${id}`, dto, { headers: getHeaders() });
  return response.data;
};

export const deleteClient = async (id) => {
  const response = await axios.delete(`${API_URL}/${id}`, { headers: getHeaders() });
  return response.data;
};