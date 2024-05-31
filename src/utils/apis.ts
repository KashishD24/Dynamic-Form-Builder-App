// src/api.js
import axios from 'axios';

const BASE_URL = 'http://localhost:3000';

export const postData = (data: any, endPoint:string) => {
  return axios.post(`${BASE_URL}/${endPoint}`, data)
    .then(response => response.data)
    .catch(error => {
      console.error('Error in POST request:', error);
      throw error;
    });
};

export const putData = (id:string,endPoint:string, data:any) => {
  return axios.put(`${BASE_URL}/${endPoint}/${id}`, data)
    .then(response => response.data)
    .catch(error => {
      console.error('Error in PUT request:', error);
      throw error;
    });
};

export const deleteData = (id:string, endPoint:string) => {
  return axios.delete(`${BASE_URL}/${endPoint}/${id}`)
    .then(response => response.data)
    .catch(error => {
      console.error('Error in DELETE request:', error);
      throw error;
    });
};
