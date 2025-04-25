import { create } from "zustand";
import { persist } from "zustand/middleware";
import { useUserStore } from "../../Login/Login";

export const useAlarmList = create((set) => ({
  alarmList: [],
  unreadCount: 0,

  addAlarm: (alarm) => {
    const currentUser = useUserStore.getState().user?.username;
    if (alarm.username !== currentUser) return;

    const alarmWithDefaults = {
      ...alarm,
      isRead: alarm.isRead ?? false,
      recipient: currentUser,
    };

    set((state) => ({
      alarmList: [alarmWithDefaults, ...state.alarmList],
      unreadCount: state.unreadCount + 1,
    }));
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
      const updatedAlarmList = state.alarmList.filter((alarm) => alarm.id !== id);
      const updatedUnread = updatedAlarmList.filter((a) => !a.isRead).length;
      return {
        alarmList: updatedAlarmList,
        unreadCount: updatedUnread,
      };
    }),
}));

