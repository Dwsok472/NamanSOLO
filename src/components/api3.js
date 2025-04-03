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
