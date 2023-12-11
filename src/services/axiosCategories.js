import axios from "axios"

const API_BASE_URL = "http://192.168.56.1:8090";

export const getCategory = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/api/category/`, {
      headers: {
        "Content-Type": "application/json",
        // Puedes incluir aquí otros encabezados necesarios, como tokens de autorización.
      },
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};