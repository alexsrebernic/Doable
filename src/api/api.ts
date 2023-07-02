import axios from 'axios';
import { mockTags,mockTasks, mockUser } from '../mocks/data';
const API_BASE_URL = 'https://api.example.com'; // Replace with your actual API base URL

export const fetchTags = (userId : number) => {
    if (process.env.NODE_ENV === 'development') {
      return Promise.resolve({ data: mockTags });
    }
    return axios.get(`${API_BASE_URL}/tags/${userId}`);
};
export const fetchTasks = (userId: number) => {
    if (process.env.NODE_ENV === 'development') {
        return Promise.resolve({ data: mockTasks });
    }
    return axios.get(`${API_BASE_URL}/tasks/${userId}`);
};
export const fetchUser = (userId : number) => {
    if (process.env.NODE_ENV === 'development') {
        return Promise.resolve({ data: mockUser });
    }
    return axios.get(`${API_BASE_URL}/user/${userId}`);
};