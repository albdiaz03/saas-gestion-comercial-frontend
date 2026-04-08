import axios from "axios";

const API_URL = "http://localhost:5152/api/sales"; // ✅ http y sin duplicar

const getHeaders = () => {
  const token = localStorage.getItem("token") || sessionStorage.getItem("token");
  return { Authorization: `Bearer ${token}` };
};

export const getSales = async () => {
  const response = await axios.get(API_URL, { headers: getHeaders() }); // ✅ SIN /sales extra
  return response.data;
};

export const createSale = async (dto) => {
  const response = await axios.post(API_URL, dto, { headers: getHeaders() });
  return response.data;
};

export const updateSale = async (id, dto) => {
  const response = await axios.put(`${API_URL}/${id}`, dto, { headers: getHeaders() });
  return response.data;
};

export const deleteSale = async (id) => {
  const response = await axios.delete(`${API_URL}/${id}`, { headers: getHeaders() });
  return response.data;
};