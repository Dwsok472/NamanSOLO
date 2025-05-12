# 💑 NamanSOLO - 커플 감성 기록 웹 플랫폼

**NamanSOLO**는 커플의 소중한 추억을 기록하고, 데이트를 더욱 특별하게 만들어주는 감성 기반 웹 플랫폼입니다.  
React + Spring Boot 기반으로 제작된 **4인 팀 프로젝트**이며, 프론트와 백엔드가 분리되어 개발되었습니다.

---

## 📁 저장소 안내

- 🔸 프론트엔드 (현재 저장소)
- 🔹 백엔드 👉 [백엔드 GitHub 저장소 링크 넣기](https://github.com/팀원ID/백엔드저장소)

---

## 🚀 주요 기능

- 커플 캘린더 (일정 등록, 3일 전/7일 전 날씨 알림)
- 데이트 장소 추천 (지도 + 카테고리 필터링)
- 실시간 채팅 (WebSocket 기반)
- 앨범/사진 기반 감성 기록
- 관리자 페이지 (유저 수, 인기 장소, 통계 등)

---

## 🛠 사용 기술

| 구분 | 기술 |
|------|------|
| **Frontend** | React, Zustand, Styled-components, React Router |
| **Backend** | Spring Boot, JPA, MySQL, JWT, WebSocket, Scheduler |
| **Infra** | Nginx, Jenkins, AWS EC2, OpenWeather API, Kakao Map API |

---

## 👨‍👩‍👧‍👦 팀원 구성

| 이름 | 역할 | 주요 담당 |
|------|------|-----------|
| 재우 | 팀장 / 프론트 | 메인 인트로, 지도 기반 장소 추천, 관리자 페이지 |
| 준우 | 백엔드 | 알림 기능, WebSocket, DB 설계 |
| 서영 | 프론트 | 캘린더 UI, 감성 기록 섹션 |
| 예진 | 백엔드 | 로그인/회원가입, 사용자 권한 처리, 통계 기능 |

---

## 🖼️ 프로젝트 미리보기

> 아래는 대표적인 화면 예시입니다. (추후 이미지 추가)

- 인트로 애니메이션
- 지도 기반 추천
- 채팅 페이지
- 관리자 통계 페이지

---

## 📦 실행 방법

```bash
# Frontend
npm install
npm start

# Backend
./gradlew build
java -jar build/libs/xxx.jar

 
