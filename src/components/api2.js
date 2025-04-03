import axios from 'axios';

const BASE_URL = 'http://localhost:8000/api/calendar';

const handleError = (methodName, error) => {
  console.error(`[API ERROR] ${methodName} failed:`, error);
  throw error;
};

const api2 = {
  async fetchAnniversaries() {
    try {
      return (await axios.get(`${BASE_URL}/anniversary`)).data;
    } catch (error) {
      handleError('fetchAnniversaries', error);
    }
  },

  async fetchTravels() {
    try {
      return (await axios.get(`${BASE_URL}/travel`)).data;
    } catch (error) {
      handleError('fetchTravels', error);
    }
  },

  async createAnniversary(data) {
    try {
      return (await axios.post(`${BASE_URL}/anniversary`, data)).data;
    } catch (error) {
      handleError('createAnniversary', error);
    }
  },

  async createTravel(data) {
    try {
      return (await axios.post(`${BASE_URL}/travel`, data)).data;
    } catch (error) {
      handleError('createTravel', error);
    }
  },

  async deleteEvent(id) {
    try {
      return (await axios.delete(`${BASE_URL}/${id}`)).data;
    } catch (error) {
      handleError('deleteEvent', error);
    }
  },

  async updateEvent(event) {
    try {
      const { id, type, ...rest } = event;
      const endpoint = type === 'travel' ? 'travel' : 'anniversary';
      return (await axios.put(`${BASE_URL}/${endpoint}/${id}`, rest)).data;
    } catch (error) {
      handleError('updateEvent', error);
    }
  }
};

export default api2;
