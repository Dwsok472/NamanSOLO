import { Client } from "@stomp/stompjs";
import SockJS from "sockjs-client";

// WebSocket 연결 후 알림 구독
export function connectAlarmSocket(userId, onMessage) {
  const socket = new SockJS("/ws"); // 백엔드 WebSocket 주소
  const client = new Client({
    webSocketFactory: () => socket,
    reconnectDelay: 5000,
    onConnect: () => {
      client.subscribe(`/topic/user/${userId}`, (msg) => {
        const alarm = JSON.parse(msg.body);
        onMessage(alarm);
      });
    },
    onStompError: (frame) => {
      console.error("STOMP 오류:", frame.headers["message"]);
    },
  });

  client.activate();
  return client;
}
