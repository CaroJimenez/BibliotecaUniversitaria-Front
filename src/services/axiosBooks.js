import axios from "axios"
import { API_BASE_URL, DATA_ } from "../utils/constants";

// Esto checa si DATA_ tiene la propiedad jwt
const tuTokenJWT = (DATA_ && DATA_[0] && DATA_[0].jwtToken) ? DATA_[0].jwtToken : "";


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
  console.log(tuTokenJWT);
  console.log(jsonData);
    try {
      const response = await axios.post(`${API_BASE_URL}/api/book/`, jsonData, {
        headers: {
          "Content-Type": "application/json",
        },
         Authorization: `Bearer ${tuTokenJWT}`,
      });
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  export const updateBook = async (jsonData) => {
    console.log(tuTokenJWT);
    console.log(jsonData);
      try {
        const response = await axios.put(`${API_BASE_URL}/api/book/`, jsonData, {
          headers: {
            "Content-Type": "application/json",
          },
           Authorization: `Bearer ${tuTokenJWT}`,
        });
        return response.data;
      } catch (error) {
        console.error(error);
        throw error;
      }
    };

  export const deleteBook = async (jsonData) => {
    console.log(tuTokenJWT);
    console.log(jsonData);
      try {
        const response = await axios.delete(`${API_BASE_URL}/api/book/${jsonData}/`, {
          headers: {
            "Content-Type": "application/json",
          },
           Authorization: `Bearer ${tuTokenJWT}`,
        });
        return response.data;
      } catch (error) {
        console.error(error);
        throw error;
      }
    };
