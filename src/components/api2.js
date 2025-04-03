import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5173/api/calendar',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const getAnniversaries = async () => {
  const res = await api.get('/anniversary');
  return res.data;
};

export const createAnniversary = async (data) => {
  const res = await api.post('/anniversary', data);
  return res.data;
};

export const updateAnniversary = async (id, data) => {
  const res = await api.put(`/anniversary/${id}`, data);
  return res.data;
};

export const deleteAnniversary = async (id) => {
  const res = await api.delete(`/anniversary/${id}`);
  return res.data;
};

export const getTravels = async () => {
  const res = await api.get('/travel');
  return res.data;
};

export const createTravel = async (data) => {
  const res = await api.post('/travel', data);
  return res.data;
};

export const updateTravel = async (id, data) => {
  const res = await api.put(`/travel/${id}`, data);
  return res.data;
};

export const deleteTravel = async (id) => {
  const res = await api.delete(`/travel/${id}`);
  return res.data;
};

export default api;
