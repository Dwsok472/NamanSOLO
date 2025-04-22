import React, { useEffect, useRef } from "react";
import { useUserStore } from "../Login/Login";
import SockJS from "sockjs-client";
import * as Stomp from "@stomp/stompjs";
import { useAlarmList } from "../MyPage/alarm/alarmList";
import heart from "../img/heart.png";
import group from "../img/group.png";
import message from "../img/messenger.png";
import firework from "../img/firework.png";
import axios from "axios";

function WebSocketManager() {
  const { user, isLoggedIn } = useUserStore();
  const stompClientRef = useRef(null);

  useEffect(() => {
    if (user?.username) {
      fetchUserAlarms();
    }
  }, [user?.username]);

  const fetchUserAlarms = async () => {
    try {
      const token = sessionStorage.getItem("jwt-token");
      const res = await axios.get("/api/alarm/me", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const alarms = res.data || [];
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

  useEffect(() => {
    const token = sessionStorage.getItem("jwt-token");
    if (token && isLoggedIn) {
      connect(token);
    }
  }, [isLoggedIn, user?.username]);

  function connect(token) {
    const client = new Stomp.Client({
      webSocketFactory: () => new SockJS(`/ws`),
      connectHeaders: {
        Authorization: `Bearer ${token}`, // JWT 인증
      },
      onConnect: () => {
        console.log("✅ WebSocket 연결됨:", user.username);
        stompClientRef.current = client;
        client.subscribe(`/user/${user.username}/queue/private`, onNotificationReceived);
      },
      onStompError: (frame) => {
        console.error("❌ STOMP 연결 에러:", frame.headers["message"]);
        client.deactivate();
      },
    });
    client.activate();
  }

  function onNotificationReceived(notification) {
    const raw = JSON.parse(notification.body);
    console.log("📨 수신된 알림:", raw);

    const addAlarm = useAlarmList.getState().addAlarm;
    const currentUser = useUserStore.getState().user?.username;
    if (raw.username !== currentUser) return; // 로그인한 사용자 알람만 처리

    const type = raw.type || raw.alarmType || "UNKNOWN";

    if (type === "WEATHER") {
      const weatherAlarm = {
        id: Date.now(),
        username: raw.username || user?.username,
        text: raw.message || "예정된 날씨 알림이 도착했습니다!",
        img: raw.icon ? `http://openweathermap.org/img/w/${raw.icon}.png` : null,
        alt: "WEATHER",
        link: "/weather",
        isRead: false,
      };

      addAlarm(weatherAlarm);
      return;
    }

    if (raw.iconCode) {
      const weatherAlarm = {
        id: Date.now(),
        username: raw.username || user?.username,
        img: `http://openweathermap.org/img/w/${raw.iconCode}.png`,
        alt: "WEATHER",
        link: "/weather",
        isRead: false,
      };

      addAlarm(weatherAlarm);
      return;
    }

    const generalAlarm = {
      id: Date.now(),
      text: raw.message,
      img: resolveImage(type),
      alt: type,
      link: resolveLink(type),
      isRead: false,
      username: raw.username,
    };
    addAlarm(generalAlarm);
  }

  function resolveImage(type) {
    switch (type) {
      case "COMMENT":
      case "RECOMMENT":
        return message;
      case "GREAT":
        return heart;
      case "FOLLOW":
        return group;
      default:
        return firework;
    }
  }

  function resolveLink(type) {
    switch (type) {
      case "COMMENT":
      case "RECOMMENT":
        return "/mypage/story";
      case "FOLLOW":
        return "/mypage/follower";
      default:
        return "/";
    }
  }

  return null; // 이 컴포넌트는 화면에 렌더링 안함
}

export default WebSocketManager;
