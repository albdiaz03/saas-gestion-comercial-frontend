import axios from "axios";

const API_URL = "http://localhost:5152/api/Product";

export const getProducts = async () => {

  const token = localStorage.getItem("token");

  const response = await axios.get(API_URL, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};