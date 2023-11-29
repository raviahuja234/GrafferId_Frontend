import axios from 'axios';

const baseURL = "http://localhost:8080/";

const instance = axios.create({
  baseURL: baseURL,
  timeout: 1000,
});

// GET request
export const getData = async (endpoint) => {
  try {
    const response = await instance.get(endpoint);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteData = async (endpoint) => {
    try {
      const response = await instance.delete(endpoint);
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  export const postData = async (endpoint, payload) => {
    try {
      const response = await instance.post(endpoint, payload);
      return response.data;
    } catch (error) {
      throw error;
    }
  };
  
  // PUT request
  export const putData = async (endpoint, payload) => {
    try {
      const response = await instance.put(endpoint, payload);
      return response.data;
    } catch (error) {
      throw error;
    }
  };

