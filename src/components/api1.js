import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8082/api',
  withCredentials: true,
});

// 1. 전체 장소 조회 (선택)
export const getAllPlaces = async () => {
  const res = await api.get('api/all/recommend');
  return res.data;
};

// 2. 지역별 장소 조회
export const getPlacesByRegion = async (region) => {
  const res = await api.get(`/recommend?region=${encodeURIComponent(region)}`);
  return res.data;
};

// 3. 카테고리별 장소 조회 
export const getPlacesByCategory = async (category) => {
  const res = await api.get(`/recommend?category=${encodeURIComponent(category)}`);
  return res.data;
};

// 4. 장소 등록 (FormData 포함)
export const createPlace = async (placeData) => {
  const formData = new FormData();
  formData.append('name', placeData.name);
  formData.append('category', placeData.category);
  formData.append('address', placeData.address);
  formData.append('description', placeData.description);
  if (placeData.image instanceof File) {
    formData.append('image', placeData.image);
  }

  const res = await api.post('/recommend', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return res.data;
};

// 5. 장소 수정
export const updatePlace = async (id, placeData) => {
  const formData = new FormData();
  formData.append('name', placeData.name);
  formData.append('category', placeData.category);
  formData.append('address', placeData.address);
  formData.append('description', placeData.description);
  if (placeData.image instanceof File) {
    formData.append('image', placeData.image);
  }

  const res = await api.put(`/recommend/${id}`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return res.data;
};

// 6. 장소 삭제 
export const deletePlace = async (id) => {
  const res = await api.delete(`/recommend/${id}`);
  return res.data;
};
