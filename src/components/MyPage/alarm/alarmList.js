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
        const alarmWithDefaults = {
          ...alarm,
          isRead: alarm.isRead ?? false, // 기본값 false
        };
        const updated = {
          alarmList: [alarm, ...useAlarmList.getState().alarmList],
          unreadCount: useAlarmList.getState().unreadCount + 1,
        };
        set(updated);
        if (currentUser) {
          localStorage.setItem(
            `alarms-${currentUser}`,
            JSON.stringify(updated)
          );
        }
      },
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
      name: "alarm-storage", // 기본 저장소 (로그인 상태 확인용으로는 사용해도 무방)
      getStorage: () => localStorage,
      skipHydration: true, // 로그인 이후 커스텀 로딩을 위한 옵션
    }
  )
);
