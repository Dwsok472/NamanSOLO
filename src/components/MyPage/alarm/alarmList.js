import { create } from "zustand";
import { persist } from "zustand/middleware";
import { useUserStore } from "../../Login/Login";

export const useAlarmList = create(
  persist(
    (set) => ({
      alarmList: [],
      unreadCount: 0,

      addAlarm: (alarm) =>
        set((state) => {
          const updated = {
            alarmList: [alarm, ...state.alarmList],
            unreadCount: state.unreadCount + 1,
          };
          const currentUser = useUserStore.getState().user?.username;
          if (currentUser) {
            localStorage.setItem(
              `alarms-${currentUser}`,
              JSON.stringify(updated)
            );
          }
          return updated;
        }),
      resetUnreadCount: () => set((state) => ({ ...state, unreadCount: 0 })),
      resetAlarmList: () => set({ alarmList: [], unreadCount: 0 }),
    }),
    {
      name: "alarm-storage",
      getStorage: () => localStorage,
    }
  )
);
