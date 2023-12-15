import axios from "axios";
import { API_BASE_URL, DATA_ } from "../utils/constants";

// Asegúrate de que DATA_ esté definido y tenga la propiedad jwtToken
const tuTokenJWT = (DATA_ && DATA_[0] && DATA_[0].jwtToken) ? DATA_[0].jwtToken : "";


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
      Authorization: `Bearer ${tuTokenJWT}`,
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const postNewSubCategory = async (jsonData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/api/subcategory/`, jsonData, {
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
