import axios from 'axios';

const BASE_URL = 'http://localhost:8082/api/todo';
const token = sessionStorage.getItem('jwt-token');

const handleError = (methodName, error) => {
  console.error(`[API ERROR] ${methodName} failed:`, error);
  throw error;
};

export const fetchAnniversaries = async () => {
  try {
    const res = await axios.get(`${BASE_URL}/anniversary/all`, {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    return res.data.map(item => ({
      ...item,
      start_date: item.startDate,
      end_date: item.endDate,
      editable: true,
      type: 'anniversary'
    }));
  } catch (e) {
    handleError('fetchAnniversaries', e);
  }
};

export const fetchTravels = async () => {
  try {
    const res = await axios.get(`${BASE_URL}/travel/all`, {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    return res.data.map(item => ({
      ...item,
      start_date: item.startDate,
      end_date: item.endDate,
      editable: true,
      type: 'travel'
    }));
  } catch (e) {
    handleError('fetchTravels', e);
  }
};

export const createAnniversary = async (anniv) => {
  try {
    const res = await axios.post(`${BASE_URL}/anniversary/save`, anniv, {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    return {
      ...res.data,
      start_date: res.data.startDate,
      end_date: res.data.endDate,
      editable: true,
      type: 'anniversary'
    };
  } catch (e) {
    handleError('createAnniversary', e);
  }
};

export const createTravel = async (travel) => {
  try {
    const res = await axios.post(`${BASE_URL}/travel/save`, travel, {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    return {
      ...res.data,
      start_date: res.data.startDate,
      end_date: res.data.endDate,
      editable: true,
      type: 'travel'
    };
  } catch (e) {
    handleError('createTravel', e);
  }
};

export const deleteAnniversary = async (id) => {
  try {
    await axios.delete(`${BASE_URL}/anniversary/delete/${id}`, {
      headers: { 'Authorization': `Bearer ${token}` }
    });
  } catch (e) {
    handleError('deleteAnniversary', e);
  }
};

export const deleteTravel = async (id) => {
  try {
    await axios.delete(`${BASE_URL}/travel/delete/${id}`, {
      headers: { 'Authorization': `Bearer ${token}` }
    });
  } catch (e) {
    handleError('deleteTravel', e);
  }
};

export const updateAnniversary = async (id, anniv) => {
  try {
    const res = await axios.put(`${BASE_URL}/anniversary/update/${id}`, anniv, {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    return {
      ...res.data,
      start_date: res.data.startDate,
      end_date: res.data.endDate,
      editable: true,
      type: 'anniversary'
    };
  } catch (e) {
    handleError('updateAnniversary', e);
  }
};

export const updateTravel = async (id, travel) => {
  try {
    const res = await axios.put(`${BASE_URL}/travel/update/${id}`, travel, {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    return {
      ...res.data,
      start_date: res.data.startDate,
      end_date: res.data.endDate,
      editable: true,
      type: 'travel'
    };
  } catch (e) {
    handleError('updateTravel', e);
  }
};
