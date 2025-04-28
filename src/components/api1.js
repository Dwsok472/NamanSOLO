import axios from 'axios';

const api = axios.create({
  baseURL: '/api', 
  withCredentials: true,
});

api.interceptors.request.use((config) => {
  const token = sessionStorage.getItem('jwt-token');
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
});

export const uploadRecommendPlaceImages = async (placeDTO, files) => {
  const formData = new FormData();
  formData.append("place", new Blob([JSON.stringify(placeDTO)], { type: "application/json" }));
  files.forEach((file) => formData.append("files", file));

  const response = await api.post("/recommend_place/upload/full", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};

export const saveRecommendPlace = async (placeDTO) => {
  const res = await api.post("/recommend_place/save", placeDTO, {
    headers: { "Content-Type": "application/json" },
  });
  return res.data;
};

export const getPlacesByRegion = async (region) => {
  const res = await api.get(`/recommend_place/region/${region}`);
  return res.data;
};

export const getAllRecommendPlaces = async () => {
  const res = await api.get('/recommend_place/all');
  return res.data;
};

export const getPlacesByRegionAndCategory = async (region, category) => {
  const res = await api.get(`/categoryplace/region/${region}/category/${category}`);
  return res.data;
};

export const deleteRecommendPlace = async (id) => {
  const res = await api.delete(`/recommend_place/delete/${id}`);
  return res.data;
};

export const updateRecommendPlace = async (placeDTO) => {
  const res = await api.put("/recommend_place/admin/update", placeDTO);
  return res.data;
};

export const getDailyFeedStats = async (from, to) => {
  const res = await api.get(`/album/daily?from=${from}&to=${to}`);
  return res.data;
};

export const getMonthlyFeedRank = async (month) => {
  const res = await api.get(`/album/rank?month=${month}`);
  return res.data;
};

export const getUserLastActivity = async () => {
  const res = await api.get('/user/admin/last-activity');
  return res.data;
};

export const getCurrentUser = async () => {
  const res = await api.get('/user/me');
  return res.data;
};

export const getAllUsers = async () => {
  const res = await api.get('/user/admin/all');
  return res.data;
};

export const getUserJoinDates = async () => {
  const res = await api.get('/user/admin/all/add-date');
  return res.data;
};

export const registerCategoryMapping = async (placeId, categoryIds) => {
  const res = await api.post("/categoryplace/add", {
    recommendPlaceId: placeId,
    categoryIds,
  }, {
    headers: { "Content-Type": "application/json" },
  });

  return res.data;
};

export const updateCategoryMapping = async (placeId, categoryIds) => {
  const res = await api.post("/categoryplace/update", {
    recommendPlaceId: placeId,
    categoryIds,
  }, {
    headers: { "Content-Type": "application/json" },
  });

  return res.data;
};

export default api;
