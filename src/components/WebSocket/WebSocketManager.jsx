import React, { useEffect, useRef } from "react";
import { useUserStore } from "../Login/Login";
import SockJS from "sockjs-client";
import * as Stomp from "@stomp/stompjs";
import { useAlarmList } from "../MyPage/alarm/alarmList";
import heart from "../img/heart.png";
import group from "../img/group.png";
import message from "../img/messenger.png";
import firework from "../img/firework.png";

function WebSocketManager() {
  const { user, isLoggedIn } = useUserStore();
  const stompClientRef = useRef(null);

  useEffect(() => {
    console.log("웹소켓 : ");
    console.log(isLoggedIn);
    const token = sessionStorage.getItem("jwt-token");
    if (token && isLoggedIn) {
      connect(token);
    }
  }, [isLoggedIn, user?.username]);

  useEffect(() => {
    if (user?.username) {
      const saved = localStorage.getItem(`alarms-${user.username}`);
      if (saved) {
        const parsed = JSON.parse(saved);
        useAlarmList.setState({
          alarmList: parsed.alarmList || [],
          unreadCount: parsed.unreadCount || 0,
        });
      }
    }
  }, [user?.username]);

  function connect(token) {
    // 웹소켓 연결(=엔드포인트) 설정
    console.log("연결시도");
    const client = new Stomp.Client({
      webSocketFactory: () => new SockJS(`/ws`),
      connectHeaders: {
        Authorization: `Bearer ${token}`, // JWT 토큰
      },
      onConnect: () => {
        console.log("Connected as", user.username);
        stompClientRef.current = client;
        // 개인 메시지 구독
        client.subscribe(
          `/user/${user.username}/queue/private`,
          onNotificationReceived
        );
      },
      onStompError: (frame) => {
        console.error("Broker error", frame.headers["message"]);
        client.deactivate(); // 재시도 멈추기
      },
    });
    client.activate();
  }

  function onNotificationReceived(notification) {
    const raw = JSON.parse(notification.body);
    console.log("수신된 알림:", raw);

    const addAlarm = useAlarmList.getState().addAlarm;
    const type = raw.alarmType || raw.type || "UNKNOWN";

    let newAlarm;

    if (raw.iconCode) {
      // 날씨 알림
      newAlarm = {
        id: Date.now(),
        text: raw.message,
        img: `http://openweathermap.org/img/w/${raw.iconCode}.png`,
        alt: "WEATHER",
        link: "/weather",
      };
    } else {
      // 일반 알림
      const type = raw.alarmType || raw.type || "UNKNOWN";
      newAlarm = {
        id: Date.now(),
        text: raw.message,
        img: resolveImage(type),
        alt: type,
        link: resolveLink(type),
      };
    }

    addAlarm(newAlarm);
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
}

export default WebSocketManager;
