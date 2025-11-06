import axios from "axios";

const BASE_URL = "http://localhost:5000/api";

export const registerUser = (data) => axios.post(`${BASE_URL}/auth/register`, data);
export const loginUser = (data) => axios.post(`${BASE_URL}/auth/login`, data);

export const getSubscriptions = (token) =>
  axios.get(`${BASE_URL}/subscriptions`, { headers: { Authorization: `Bearer ${token}` } });

export const addSubscription = (data, token) =>
  axios.post(`${BASE_URL}/subscriptions`, data, { headers: { Authorization: `Bearer ${token}` } });

export const deleteSubscription = (id, token) =>
  axios.delete(`${BASE_URL}/subscriptions/${id}`, { headers: { Authorization: `Bearer ${token}` } });
