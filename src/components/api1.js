import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8082/api',
  withCredentials: true,
});

api.interceptors.request.use((config) => {
  const token = sessionStorage.getItem('jwt-token');
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
});

// ✅ 1. 이미지 업로드만 처리
export const uploadRecommendPlaceImages = async (placeDTO, files) => {
  const token = sessionStorage.getItem("jwt-token");
  const formData = new FormData();

  formData.append("place", new Blob([JSON.stringify(placeDTO)], { type: "application/json" }));

  files.forEach((file) => {
    formData.append("files", file);
  });

  const response = await axios.post(
    "http://localhost:8082/api/recommend_place/upload/full",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true,
    }
  );

  return response.data;
};

// ✅ 2. 장소 저장 (JSON)
export const saveRecommendPlace = async (placeDTO) => {
  const token = sessionStorage.getItem("jwt-token");

  const res = await axios.post(
    "http://localhost:8082/api/recommend_place/save",
    placeDTO,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      withCredentials: true,
    }
  );

  return res.data;
};

// 지역별 장소 조회
export const getPlacesByRegion = async (region) => {
  const res = await api.get(`/recommend_place/region/${region}`);
  return res.data;
};

export const getAllRecommendPlaces = async () => {
  const res = await api.get('/recommend_place/all');
  return res.data;
};
