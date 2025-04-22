import axios from "axios";

// 📅 캘린더 일정 불러오기
export async function fetchUserEvents(userId) {
  const response = await axios.get(`/api/calendar/${userId}`);
  return response.data;
}
// 🎁 오늘 이벤트만 불러오기
export async function fetchTodayEvents(userId) {
  const res = await axios.get(`/api/event/today/${userId}`);
  return res.data; // 오늘의 이벤트만
}
// 📍 추천 장소 불러오기
export async function fetchRecommendedPlaces(userId) {
  try {
    const res = await axios.get(`/api/places/recommended/${userId}`);
    return res.data; // 사용자의 추천 장소 목록
  } catch (error) {
    console.error("추천 장소 불러오기 실패:", error);
    return [];
  }
}
// ❤️ 좋아요 알림 불러오기
export async function fetchLikeAlarms(userId) {
  try {
    const res = await axios.get(`/api/alarms/likes/${userId}`);
    return res.data;
  } catch (error) {
    console.error("좋아요 알림 불러오기 실패:", error);
    return [];
  }
}

// 👥 팔로우 알림 불러오기
export async function fetchFollowAlarms(userId) {
  try {
    const res = await axios.get(`/api/alarms/follows/${userId}`);
    return res.data;
  } catch (error) {
    console.error("팔로우 알림 불러오기 실패:", error);
    return [];
  }
}

// 🌤 날씨 알림 불러오기
export async function fetchWeatherAlarm(userId) {
  try {
    const res = await axios.get(`/api/alarms/weather/${userId}`);
    return res.data;
  } catch (error) {
    console.error("날씨 알림 불러오기 실패:", error);
    return [];
  }
}

// 1~7일 남은 일정만 필터링해서 알림으로 변환
export function getUpcomingAlarms(events) {
  const today = new Date();
  return events
    .filter((event) => {
      const diff = Math.floor(
        (new Date(event.date) - today) / (1000 * 60 * 60 * 24)
      );
      return diff >= 0 && diff <= 7;
    })
    .map((event) => ({
      id: event.id,
      text: `${event.title}이 ${Math.floor(
        (new Date(event.date) - today) / (1000 * 60 * 60 * 24)
      )}일 남았어요!`,
      link: event.link,
      img: event.img,
      alt: event.alt,
    }));
}

// 알림 설정 불러오기
export async function fetchAlarmSettings(userId) {
  const res = await axios.get(`/api/alarm/settings/${userId}`);
  return res.data;
}

// 알림 설정 저장하기
export async function saveAlarmSettings(userId, settings) {
  const res = await axios.post(`/api/alarm/settings`, {
    userId,
    settings,
  });
  return res.data;
}

// 💬 댓글 알림 불러오기
export async function fetchCommentAlarms(userId) {
  try {
    const res = await axios.get(`/api/alarms/comments/${userId}`);
    return res.data;
  } catch (error) {
    console.error("댓글 알림 불러오기 실패:", error);
    return [];
  }
}

// 💬 대댓글 알림 불러오기
export async function fetchReplyAlarms(userId) {
  try {
    const res = await axios.get(`/api/alarms/replies/${userId}`);
    return res.data;
  } catch (error) {
    console.error("대댓글 알림 불러오기 실패:", error);
    return [];
  }
}

// 로그인
export const UserLogin = async (username, password) => {
  try {
    const { data } = await axios.post("/api/login", { username, password });
    return data;
  } catch (error) {
    const msg =
      error.response?.data?.message ||
      "서버 연결에 실패했습니다. 잠시 후 다시 시도해주세요.";
    throw new Error(msg);
  }
};

// 회원가입
// 아이디 중복 확인
export async function checkUsernameDuplicate(username) {
  try {
    const res = await axios.post("/api/user/check-username", { username });
    return res.data.isAvailable; // true | false
  } catch (error) {
    console.error("[checkUsernameDuplicate ERROR]:", error);
    throw error;
  }
}

// 커플 프로필 등록
export async function registerCoupleProfile(profileF, profileM) {
  try {
    const res = await axios.post("/api/couple/profile", {
      female: profileF,
      male: profileM,
    });
    return res.data;
  } catch (error) {
    console.error("[registerCoupleProfile ERROR]:", error);
    throw error;
  }
}

// D-DAY 등록 API
export async function registerCoupleDday(userId, dday) {
  try {
    const res = await axios.post("/api/couple/dday", {
      userId,
      dday, // 예: "2024-02-14"
    });
    return res.data;
  } catch (error) {
    console.error("[registerCoupleDday ERROR]:", error);
    throw error;
  }
}

// 회원가입 정보 전송 (2단계에서 사용될 예정)
export async function registerUser(data) {
  try {
    const res = await axios.post("/api/user/register", data);
    return res.data;
  } catch (error) {
    console.error("[registerUser ERROR]:", error);
    throw error;
  }
}

// 인증번호 발송
export async function sendAuthCode({ type, target }) {
  try {
    const res = await axios.post("/api/auth/send-code", {
      type, // "email" or "phone"
      target, // 이메일 주소 또는 전화번호
    });
    return res.data;
  } catch (error) {
    console.error("[sendAuthCode ERROR]:", error);
    throw error;
  }
}

// 인증번호 검증
export async function verifyAuthCode({ code, target }) {
  try {
    const res = await axios.post("/api/auth/verify-code", {
      code,
      target,
    });
    return res.data.isVerified; // true or false
  } catch (error) {
    console.error("[verifyAuthCode ERROR]:", error);
    throw error;
  }
}

// 아이디 찾기
export async function findUserId({ name, target, type }) {
  try {
    const res = await axios.post("/api/user/find-id", {
      name,
      type, // "email" or "phone"
      target,
    });
    return res.data.userId; // 아이디 문자열
  } catch (error) {
    console.error("[findUserId ERROR]:", error);
    throw error;
  }
}

// 비밀번호 재설정
export async function resetPassword({ username, email, newPassword }) {
  try {
    const res = await axios.post("/api/user/reset-password", {
      username,
      email,
      newPassword,
    });
    return res.data;
  } catch (error) {
    console.error("[resetPassword ERROR]:", error);
    throw error;
  }
}

//  특정 도시의 N일 뒤 날씨 예보 가져오기
export async function fetchFutureWeather(city, days) {
  try {
    const res = await axios.get(`/api/weather/forecast`, {
      params: { city, days },
    });
    return res.data;
  } catch (error) {
    console.error("날씨 예보 불러오기 실패:", error);
    return null;
  }
}

