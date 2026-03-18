import axios from "axios";

const API_URL = "http://localhost:5152/api/Project";

const getHeaders = () => {
  const token = localStorage.getItem("token") || sessionStorage.getItem("token");
  return { Authorization: `Bearer ${token}` };
};

export const getProjects = async () => {
  const response = await axios.get(API_URL, { headers: getHeaders() });
  return response.data;
};

export const createProjects = async (dto) => {
  const response = await axios.post(API_URL, dto, { headers: getHeaders() });
  return response.data;
};

export const updateProjects = async (id, dto) => {
  const response = await axios.put(`${API_URL}/${id}`, dto, { headers: getHeaders() });
  return response.data;
};

export const deleteProjects = async (id) => {
  const response = await axios.delete(`${API_URL}/${id}`, { headers: getHeaders() });
  return response.data;
};