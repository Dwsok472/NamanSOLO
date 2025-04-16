import { create } from 'zustand';

export const useAlarmList = create((set) => ({
  alarmList: [],
  addAlarm: (alarm) =>
    set((state) => ({
      alarmList: [alarm, ...state.alarmList],
    })),
}));
