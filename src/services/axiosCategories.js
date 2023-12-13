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

export const getSubCategory = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/api/subcategory/`, {
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

export const postNewCategory = async (jsonData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/api/category/`, jsonData, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
