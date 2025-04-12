import axios from 'axios';

const BASE_URL = 'http://localhost:8082/api/todo';

const token = sessionStorage.getItem('jwt-token');

export const fetchAnniversaries = async () => {
    const res = await axios.get(`${BASE_URL}/anniversary/all`, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
  return res.data;
};

export const updateAnniversary = async (id, event) => {
  const payload = {
    id,
    title: event.title,
    startDate: event.start_date,
    color: event.color,
    type: 'anniversary',
  };

  const res = await axios.put(`${BASE}/anniversary/update/${id}`, payload);
  return res.data;
};
export const saveAnniversary = async (event) => {
  const payload = {
    title: event.title,
    startDate: event.start_date,
    endDate: event.end_date,
    color: event.color,
    type: 'anniversary'
  };
  const res = await axios.post(`${BASE}/anniversary/save`, payload);
  return res.data;
};
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

const deleteTravel = async (id) => {
  if (!window.confirm('정말 이 여행 일정을 삭제하시겠습니까?')) return;

  try {
    const token = sessionStorage.getItem('jwt-token');
    await axios.delete(api.baseURL+`/todo/travel/delete/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    alert('삭제되었습니다.');
    getAllTravel();
  } catch (err) {
    console.error('삭제 실패 ❌', err);
    alert('삭제에 실패했습니다.');
  }
};


export default api2;
