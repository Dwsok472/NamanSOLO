import axios from 'axios';
import { createSessionStorage } from 'react-router-dom';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

// 미디어
const BASE_URL = 'http://localhost:8082/api';
const todo_url = '/todo'
const token = sessionStorage.getItem('jwt-token');

const handleError = (methodName, error) => {
  console.error(`[API ERROR] ${methodName} failed:`, error);
  throw error;
};

export const fetchAnniversaries = async () => {
  try {
    const res = await axios.get(`${BASE_URL}${todo_url}/anniversary/all`, {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    return res.data.map(item => ({
      ...item,
      start_date: item.startDate,
      end_date: item.endDate,
      editable: item.editable,
      type: 'anniversary'
    }));
  } catch (e) {
    handleError('fetchAnniversaries', e);
  }
};

export const fetchTravels = async () => {
  try {
    const res = await axios.get(`${BASE_URL}${todo_url}/travel/all`, {
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
    const res = await axios.post(`${BASE_URL}${todo_url}/anniversary/save`, anniv, {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    return {
      ...res.data,
      start_date: res.data.startDate,
      end_date: res.data.endDate,
      editable: true,
      type: 'ANNIVERSARY'
    };
  } catch (e) {
    handleError('createAnniversary', e);
  }
};

export const createTravel = async (travelEvent) => {
  try {
    const dto = {
      title: travelEvent.title,
      startDate: travelEvent.start_date,
      endDate: travelEvent.end_date,
      color: travelEvent.color,
      type: 'TRAVEL',
      editable: true,
      mediaUrl: mediaList.map(media => ({
        id: media.id || null,
        mediaUrl: media.mediaUrl,
        mediaType: media.mediaType || (media.mediaUrl.endsWith('.mp4') ? 'VIDEO' : 'PICTURE')
      })),
    };

    const res = await axios.post(`${BASE_URL}${todo_url}/travel/save`, dto, {
      headers: {
        'Authorization': `Bearer ${token}`,
      }
    });

    return {
      ...res.data,
      start_date: res.data.startDate,
      end_date: res.data.endDate,
      editable: true,
      type: 'travel',
    };
  } catch (e) {
    handleError('createTravel', e);
  }
};

export const uploadTravelMedia = async (title, files) => {
  try {
    const formData = new FormData();
    formData.append("title", title);
    files.forEach(file => {
      formData.append("files", file);
    });

    const res = await axios.post(`${BASE_URL}${todo_url}/upload/multiple`, formData, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'multipart/form-data',
      },
    });

    return res.data; // MediaDTO[]
  } catch (e) {
    handleError('uploadTravelMedia', e);
  }
};

export const handleCreateTravelMedia = async (travelEvent) => {
  try {
    let mediaList = [];
    if (travelEvent.images && travelEvent.images.length > 0) {
      mediaList = await uploadTravelMedia(travelEvent.title, travelEvent.images);
    }

    const dto = { ...travelEvent, mediaUrl: mediaList };
    return await createTravel(dto);
  } catch (e) {
    handleError('handleCreateTravelMedia', e);
  }
};

export const deleteAnniversary = async (id) => {
  try {
    await axios.delete(`${BASE_URL}${todo_url}/anniversary/delete/${id}`, {
      headers: { 'Authorization': `Bearer ${token}` }
    });
  } catch (e) {
    handleError('deleteAnniversary', e);
  }
};

export const deleteTravelMedia = async (id) => {
  try {
    await axios.delete(`${BASE_URL}${todo_url}/travel/delete/${id}`, {
      headers: { 'Authorization': `Bearer ${token}` }
    });
  } catch (e) {
    handleError('deleteTravelMedia', e);
  }
};

export const updateAnniversary = async (id, anniv) => {
  try {
    const res = await axios.put(`${BASE_URL}${todo_url}/anniversary/update/${id}`, anniv, {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    return {
      ...res.data,
      start_date: res.data.startDate,
      end_date: res.data.endDate,
      editable: true,
      type: 'ANNIVERSARY'
    };
  } catch (e) {
    handleError('updateAnniversary', e);
  }
};

export const updateTravel = async (id, travelData) => {
  try {
    const res = await axios.put(`${BASE_URL}${todo_url}/travel/update/${id}`, travelData, {
      headers: { 'Authorization': `Bearer ${token}` }
    });

    return {
      ...res.data,
      start_date: res.data.startDate,
      end_date: res.data.endDate,
      editable: true,
      type: res.data.type
    };
  } catch (e) {
    handleError('updateTravel', e);
  }
};

export const handleUpdateTravelMedia = async (id, travelData) => {
  try {
    let mediaList = travelData.mediaUrl || [];

    if (travelData.images && travelData.images.length > 0) {
      const uploadedMedia = await uploadTravelMedia(travelData.title, travelData.images);
      uploadedMedia.forEach(media => {
        if (!media.mediaType) {
          media.mediaType = "PICTURE";
        }
        if (!media.id) {
          media.id = null; // 명시적으로 null 설정
        }
      });
      mediaList = [...mediaList, ...uploadedMedia];
    }

    const dto = {
      id,
      title: travelData.title,
      startDate: travelData.start_date,
      endDate: travelData.end_date,
      color: travelData.color,
      type: 'TRAVEL',
      mediaUrl: mediaList,
    };

    return await updateTravel(id, dto);
  } catch (e) {
    handleError('handleUpdateTravelMedia', e);
  }
};

export const fetchMediaBlobUrls = async (mediaList) => {
  const blobPromises = mediaList.map(async (media) => {
    try {
      const res = await fetch(`${BASE_URL}${todo_url}/download/${media.mediaUrl.split('/').slice(-2).join('/')}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) throw new Error('403 or failed fetch');

      const blob = await res.blob();
      return URL.createObjectURL(blob);
    } catch (e) {
      console.error('🧨 미디어 불러오기 실패:', media.mediaUrl, e);
      return null;
    }
  });

  return Promise.all(blobPromises);
};

const present_url = '/event_present';

export const fetchPresents = async() => {
  try { const res = await axios.get(`${BASE_URL}${present_url}/all`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }); return res.data; }
  catch (e) { console.error('전체 선물 조회 실패', err); throw err }
};

export const fetchMalePresents = async () => {
  try { const res = await axios.get(`${BASE_URL}${present_url}/male`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }); return res.data; }
  catch (err) { console.error('❌ 남성 선물 불러오기 실패:', err); throw err; }
};

export const fetchFemalePresents = async () => {
  try { const res = await axios.get(`${BASE_URL}${present_url}/female`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }); return res.data; } 
  catch (err) { console.error('여성 선물 불러오기 실패:', err); throw err; }
};

const user_url = '/user';

export const registerUser = async (formData) => {
  try {
    const response = await axios.post(`${BASE_URL}${user_url}/register`, get().formData);
    return response.data;
  } catch (error) {
    console.error("회원가입 API 에러:", error.response?.data || error.message);
    throw error;
  }
};

export const useRegisterStore = create(
  persist(
    (set, get) => ({
      formData: {
        username: "",
        password: "",
        emailM: "",
        emailF: "",
        realNameM: "",
        realNameF: "",
        birthM: "",
        birthF: "",
        phoneNumberM: "",
        phoneNumberF: "",
        authority: "ROLE_USER",
        addDate: new Date().toISOString().split("T")[0],
        dDay: "",
        alarmAlert: true,
        commentAlert: true,
        followAlert: true,
        greatAlert: true,
        eventAlert: true,
        recommendAlert: true,
        recommentAlert: true,
        todoAlert: true,
        mediaId: 1,
      },

      setFormData: (data) => set((state) => ({
        formData: {
          ...state.formData,
          ...data,
        }
      })),

      submitRegistration: async () => {
        try {
          const res = await axios.post(`${BASE_URL}${user_url}/register`, get().formData, {
            headers: {
              "Content-Type": "application/json",
            },
          });
          return res.data;
        } catch (error) {
          console.error("회원가입 실패:", error);
          throw error;
        }
      },

      deleteForm: () => { 
        const storage = createJSONStorage(() => sessionStorage);
        storage.removeItem?.("register-storage");
      }
    }),
    {
      name: "register-storage", // storage key 이름
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);

export async function checkUsernameDuplicate(username) {
  try {
    const response = await axios.get(`${BASE_URL}${user_url}/check-id/${username}`);
    return !response.data; // false면 사용 가능이니까 결과 반전해서 true 리턴
  } catch (error) {
    console.error("중복 확인 실패:", error);
    throw error;
  }
}