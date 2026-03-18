import axios from "axios";


const API_URL_Product = "http://localhost:5152/api/Product";
const API_URL_Project = "http://localhost:5152/api/Product";

const getHeaders = () => {
  const token = localStorage.getItem("token") || sessionStorage.getItem("token");
  return { Authorization: `Bearer ${token}` };
};

export const getProducts = async () => {
  const response = await axios.get(API_URL_Product, { headers: getHeaders() });
  return response.data;
};

export const getProjects = async () => {
  const response = await axios.get(API_URL_Project, { headers: getHeaders() });
  return response.data;
};

