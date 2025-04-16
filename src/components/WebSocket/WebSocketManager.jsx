import React, { useEffect, useRef } from "react";
import { useUserStore } from "../Login/Login";
import SockJS from "sockjs-client";
import * as Stomp from "@stomp/stompjs";
import { useAlarmList } from "../MyPage/alarm/alarmList";

function WebSocketManager() {
  const { user, isLoggedIn } = useUserStore();
  const stompClientRef = useRef(null);

  useEffect(() => {
    console.log("웹소켓 : ");
    console.log(isLoggedIn);
    const token = sessionStorage.getItem("jwt-token");
    if (token) {
      connect(token);
    }
  }, [isLoggedIn]);

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
  
    const addAlarm = useAlarmList.getState().addAlarm;
  
    // 실제 UI에 맞는 구조로 변환
    const newAlarm = {
      id: Date.now(), // 또는 uuid
      text: raw.message,
      img: resolveImage(raw.type), // 타입에 따라 아이콘 선택
      alt: raw.type,
      link: resolveLink(raw.type),
    };
  
    addAlarm(newAlarm);
  }

  return null;
}

function resolveImage(type) {
  switch (type) {
    case "COMMENT":
    case "LIKE":
      return "/img/heart.png";
    case "FOLLOW":
      return "/img/group.png";
    case "RECOMMEND":
      return "/img/place.png";
    default:
      return "/img/firework.png";
  }
}

function resolveLink(type) {
  switch (type) {
    case "COMMENT":
      return "/mypage/story";
    case "FOLLOW":
      return "/mypage/follower";
    default:
      return "/";
  }
}

export default WebSocketManager;
