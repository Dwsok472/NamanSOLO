import { create } from "zustand";
import { persist } from "zustand/middleware";
import { useUserStore } from "../../Login/Login";

export const useAlarmList = create(
  persist(
    (set) => ({
      alarmList: [],
      unreadCount: 0,

      addAlarm: (alarm) => {
        const currentUser = useUserStore.getState().user?.username;

        // 💥 로그인된 사용자와 알람 대상자가 다르면 무시
        if (alarm.username !== currentUser) return;

        const alarmWithDefaults = {
          ...alarm,
          isRead: alarm.isRead ?? false,
        };

        const updated = {
          alarmList: [alarmWithDefaults, ...useAlarmList.getState().alarmList],
          unreadCount: useAlarmList.getState().unreadCount + 1,
        };

        set(updated);

        if (currentUser) {
          localStorage.setItem(`alarms-${currentUser}`, JSON.stringify(updated));
        }
      }, // ✅ 이 콤마 추가해야 함

      resetUnreadCount: () => set((state) => ({ ...state, unreadCount: 0 })),

      resetAlarmList: () => set({ alarmList: [], unreadCount: 0 }),

      markAsRead: (id) =>
        set((state) => ({
          alarmList: state.alarmList.map((alarm) =>
            alarm.id === id ? { ...alarm, isRead: true } : alarm
          ),
        })),

      removeAlarm: (id) =>
        set((state) => {
          const currentUser = useUserStore.getState().user?.username;
          const updatedAlarmList = state.alarmList.filter(
            (alarm) => alarm.id !== id
          );
          const updatedUnread = updatedAlarmList.filter(
            (a) => !a.isRead
          ).length;

          const updated = {
            alarmList: updatedAlarmList,
            unreadCount: updatedUnread,
          };

          if (currentUser) {
            localStorage.setItem(
              `alarms-${currentUser}`,
              JSON.stringify(updated)
            );
          }

          return updated;
        }),
    }),
    {
      name: "alarm-storage",
      getStorage: () => localStorage,
      skipHydration: true,
    }
  )
);

const fetchUserAlarms = async () => {
  try {
    const token = sessionStorage.getItem("jwt-token");
    const res = await axios.get("/api/alarm/me", {
      headers: { Authorization: `Bearer ${token}` },
    });
    const allAlarms = res.data || [];
    const currentUser = useUserStore.getState().user?.username;
    
    // ✨ 여기서 필터링
    const alarms = allAlarms.filter((a) => a.username === currentUser);
    const unread = alarms.filter((a) => !a.isRead).length;

    useAlarmList.setState({
      alarmList: alarms,
      unreadCount: unread,
    });

    console.log("✅ 본인 알림 목록 정상 로딩 완료");
  } catch (err) {
    console.error("❌ 알림 로딩 실패:", err);
  }
};
