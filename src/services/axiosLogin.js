import axios from "axios"

const API_BASE_URL = "http://192.168.56.1:8090";

export const login = async (jsonData) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/api/book/`, jsonData, {
        headers: {
          "Content-Type": "application/json",
        },
        // Authorization: `Bearer ${tuTokenJWT}`,
      });
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };