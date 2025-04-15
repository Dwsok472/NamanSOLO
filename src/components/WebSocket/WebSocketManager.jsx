import React, { useEffect, useRef } from "react";
import { useUserStore } from "../Login/Login";
import SockJS from "sockjs-client";
import * as Stomp from "@stomp/stompjs";

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
    const body = JSON.parse(notification.body);
    console.log("Notification Received:", body);
    alert(body.message);
  }

  return null;
}

export default WebSocketManager;
