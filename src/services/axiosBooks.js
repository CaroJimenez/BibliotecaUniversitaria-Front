import axios from "axios"

const API_BASE_URL = "http://192.168.56.1:8090";

export const getBooks = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/api/book/`, {
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

export const postNewBook = async (jsonData) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/api/book/`, jsonData, {
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
