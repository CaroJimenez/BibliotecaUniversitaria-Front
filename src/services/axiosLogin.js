import axios from "axios"
import { API_BASE_URL } from "../utils/constants";

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