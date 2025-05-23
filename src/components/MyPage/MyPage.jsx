import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { useLocation, useNavigate, Routes, Route } from 'react-router-dom';
import { IconEdit, IconImage } from '../Icons';
import heart from '../img/heart.png';
import MySetting from './MySetting';
import CoupleProfile from './CoupleProfile';
import CommentPage from './Comment/CommentPage';
import MyAlbum from './MyAlbum/MyAlbum';
import Todo from './todo/Todo';
import BookMark from './Other/BookMark';
import Other from './Other/Other';
import {
  getCurrentUser,
  updateUserData,
  uploadProfileImage,
  fetchAnniversaries,
  fetchTravels,
} from '../api2';
import { useUserStore } from '../Login/Login';

// ===== 스타일 컴포넌트 - 시작 =====

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding: 40px;
  margin: 0 auto;
  width: 80%;
  padding-top: 100px;
`;

const ProfileCard = styled.div`
  max-width: 480px;
  background: white;
  border-radius: 16px;
  border: 1px solid #bb1616;
  padding: 40px 30px;
  margin-right: 20px;
  text-align: center;
  position: relative;
  /* background-color: #8c0d17; */
`;
const LoadingText = styled.div`
  margin-top: 200px;
  font-size: 1.5rem;
`;

const ProfileImage = styled.img`
  width: 200px;
  height: 200px;
  margin: 0 auto 20px;
  border-radius: 50%;
  border: 1px solid #000;
  object-fit: cover;
  background: #ddd;
  box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.1);
`;

const Name = styled.h2`
  font-size: 2.2rem;
  margin: 20px 0 10px;
  font-weight: 700;
  color: #ac001f;
`;

const Emotion = styled.div`
  font-size: 1.5rem;
  font-weight: 600;
  margin-top: 10px;
`;

const DateInputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  margin-top: 12px;
`;

const DateInput = styled.input`
  font-size: 1rem;
  padding: 6px 10px;
  border: 1px solid #ccc;
  border-radius: 6px;
`;

const CancelButton = styled.button`
  background: #bb1616;
  color: white;
  font-weight: 600;
  border: none;
  border-radius: 6px;
  padding: 4px 10px;
  font-size: 0.9rem;
  cursor: pointer;
  transition: background 0.2s;

  &:hover {
    background: #bb1616;
  }
`;

const DateText = styled.div`
  font-size: 1rem;
  color: #444;
  margin-top: 5px;
`;

const DdayText = styled.div`
  font-size: 2.2rem;
  font-weight: bold;
  color: #d80028;
`;

const EditButton = styled.button`
  position: absolute;
  top: 20px;
  right: 20px;
  background: transparent;
  border: none;
  cursor: pointer;
  svg {
    width: 20px;
    height: 20px;
    fill: #bb1616;
  }
  &:hover {
    transform: scale(1.1);
  }
`;

const ProfileImageWrapper = styled.div`
  position: relative;
  width: 200px;
  height: 200px;
  margin: 0 auto 20px;
  cursor: pointer;
`;

const EditOverlay = styled.div`
  position: absolute;
  bottom: 10px;
  right: 10px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;

  svg {
    width: 18px;
    height: 18px;
    color: #bb1616;
  }
`;

const TabsContainer = styled.div`
  flex: 1;
  background: #fff;
  border-radius: 16px;
  padding: 30px;
  border: 1px solid #bb1616;
  height: 750px;
  /* background-color: #f6f2ea; */
`;

const Tabs = styled.div`
  display: flex;
  justify-content: flex-start;
  gap: 10px;
  flex-wrap: wrap;
`;

const TabButton = styled.button`
  background: ${(props) => (props.active ? '#9f142e' : '#fff')};
  color: ${(props) => (props.active ? '#fff' : '#9f142e')};
  /* border: 1px solid #9f142e; */
  padding: 0px 20px;
  border-radius: 40px;
  font-size: 0.8rem;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s;
  width: 100px;
  height: 30px;
  text-align: center;

  &:hover {
    background: #9f142e;
    color: #fff;
  }
`;

const MyStoryButton = styled.button`
  margin-left: auto;
  background: ${(props) => (props.active ? '#9f142e' : '#fff')};
  color: ${(props) => (props.active ? '#fff' : '#9f142e')};
  padding: 0px 20px;
  border-radius: 40px;
  font-size: 1rem;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s;
  width: 130px;
  height: 30px;
  text-align: center;
  &:hover {
    background: #9f142e;
    color: #fff;
  }
`;

const TabGroup = styled.div`
  display: flex;
  gap: 10px;
`;

const ContentArea = styled.div`
  min-height: 300px;
  margin-top: 10px;
  padding: 20px;
  border-radius: 12px;
`;

const ModalWrapper = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  padding: 40px 30px;
  border-radius: 12px;
  z-index: 1000;
`;

const Backdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.4);
  z-index: 999;
`;

const HeartIcon = styled.img`
  width: 24px;
  height: 24px;
  margin: 0 8px;
  vertical-align: middle;
`;

const Username = styled.span`
  color: #222;
  font-weight: bold;
`;

export default function MyPage() {
  const location = useLocation();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [originalMeetingDate, setOriginalMeetingDate] = useState(null);
  const [image, setImage] = useState();
  const [tempImage, setTempImage] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [daysSince, setDaysSince] = useState(null);
  const [meetingDate, setMeetingDate] = useState(null);
  const [girlname, setGirlname] = useState('');
  const [boyname, setBoyname] = useState('');
  const pathToTab = {
    '/mypage/todo': '캘린더',
    '/mypage/bookmark': '즐겨찾기',
    '/mypage/comment': '나의 댓글',
    '/mypage/album': 'My Album',
    '/mypage/follow': '팔로우',
  };

  const [activeTab, setActiveTab] = useState(
    () => pathToTab[location.pathname] || '캘린더'
  );
  const [showCoupleProfile, setShowCoupleProfile] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const imgRef = useRef(null);
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const matchedTab = pathToTab[location.pathname];
    if (matchedTab && matchedTab !== activeTab) {
      setActiveTab(matchedTab);
    }
  }, [location.pathname]);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const data = await getCurrentUser();
        setGirlname(data.realNameF);
        setBoyname(data.realNameM);
        setMeetingDate(data.dDay);
        setOriginalMeetingDate(data.dDay);
        const mediaUrl = [data.mediaDTO.mediaUrl];
        setImage(mediaUrl);
        setLoading(false);
      } catch (err) {
        console.error('유저 불러오기 실패', err);
      }
    };
    fetchUser();
  }, []);

  useEffect(() => {
    if (meetingDate) {
      calculateDaysSince(meetingDate, new Date());
    }
  }, [meetingDate]);

  const calculateDaysSince = (meetingDate, currentDate) => {
    const date1 = new Date(meetingDate);
    const date2 = new Date(currentDate);
    date1.setHours(0, 0, 0, 0);
    date2.setHours(0, 0, 0, 0);

    const timeDiff = date2 - date1;
    const daysDiff = Math.floor(timeDiff / (1000 * 3600 * 24));
    setDaysSince(daysDiff < 1 ? '오늘' : daysDiff);
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setSelectedFile(file);
    setTempImage(URL.createObjectURL(file));
  };

  const handleCompleteEdit = async () => {
    try {
      let uploadedImageUrl = null;

      if (selectedFile) {
        uploadedImageUrl = await uploadProfileImage(selectedFile);
        useUserStore.setState((state) => ({
          user: {
            ...state.user,
            mediaDTO: { mediaUrl: uploadedImageUrl }
          }
        }));
      }

      const updatedData = {
        realNameM: boyname,
        realNameF: girlname,
        dday: meetingDate,
      };

      if (uploadedImageUrl) {
        updatedData.profileImageUrl = uploadedImageUrl;
      }

      await updateUserData(updatedData);

      if (uploadedImageUrl) {
        setImage(uploadedImageUrl);
      }

      const [annivs, travels] = await Promise.all([
        fetchAnniversaries(),
        fetchTravels(),
      ]);

      setEvents([...annivs, ...travels]);
      setOriginalMeetingDate(meetingDate);
      setIsEditMode(false);
    } catch (err) {
      console.error('수정 실패', err);
    }
  };

  const routeMap = {
    캘린더: '/mypage/todo',
    즐겨찾기: '/mypage/bookmark',
    '나의 댓글': '/mypage/comment',
    'My Album': '/mypage/album',
    팔로우: '/mypage/follow',
  };

  return (
    <Container>
      <ProfileCard>
        {loading ? (
          <LoadingText>불러오는 중...</LoadingText>
        ) : (
          <>
            <MySetting onClick={() => setShowCoupleProfile(true)} />

            <ProfileImageWrapper
              onClick={() => {
                if (isEditMode) imgRef.current.click();
              }}
            >
              <ProfileImage
                src={tempImage || image}
                alt="profile"
                $editable={isEditMode}
              />
              {isEditMode && (
                <EditOverlay>
                  <IconImage />
                </EditOverlay>
              )}
            </ProfileImageWrapper>

            <input
              type="file"
              accept="image/*"
              ref={imgRef}
              hidden
              onChange={handleImageChange}
            />

            <Name>
              <Username>{boyname}</Username>
              <HeartIcon src={heart} alt="heart" />
              <Username>{girlname}</Username>
            </Name>

            <Emotion>
              {isEditMode ? (
                <DateInputWrapper>
                  <DateInput
                    type="date"
                    value={meetingDate}
                    onChange={(e) => setMeetingDate(e.target.value)}
                    max={new Date().toISOString().split('T')[0]}
                  />
                  <CancelButton
                    onClick={() => {
                      setMeetingDate(originalMeetingDate);
                      setIsEditMode(false);
                      setTempImage(null);
                      setSelectedFile(null);
                    }}
                  >
                    취소
                  </CancelButton>
                </DateInputWrapper>
              ) : (
                <>
                  <DdayText>{daysSince}일</DdayText>
                  <DateText>
                    {new Date(meetingDate).toLocaleDateString('ko-KR')}
                  </DateText>
                </>
              )}
            </Emotion>

            <EditButton
              onClick={() => {
                if (isEditMode) {
                  handleCompleteEdit();
                }
                setIsEditMode((prev) => !prev);
              }}
            >
              {isEditMode ? '완료' : <IconEdit />}
            </EditButton>
          </>
        )}
      </ProfileCard>
      <TabsContainer>
        <Tabs>
          <TabGroup>
            {['캘린더', '팔로우', '나의 댓글', '즐겨찾기'].map((tab) => (
              <TabButton
                key={tab}
                active={activeTab === tab}
                onClick={() => {
                  setActiveTab(tab);
                  navigate(routeMap[tab]);
                }}
              >
                {tab}
              </TabButton>
            ))}
          </TabGroup>

          <MyStoryButton
            active={activeTab === 'My Album'}
            onClick={() => {
              setActiveTab('My Album');
              navigate(routeMap['My Album']);
            }}
          >
            MY ALBUM
          </MyStoryButton>
        </Tabs>

        <ContentArea>
          <Routes>
            <Route
              path="/todo"
              element={<Todo originalMeetingDate={originalMeetingDate} />}
            />
            <Route path="/bookmark" element={<BookMark />} />
            <Route path="/comment" element={<CommentPage />} />
            <Route path="/album" element={<MyAlbum />} />
            <Route path="/follow" element={<Other />} />
          </Routes>
        </ContentArea>
      </TabsContainer>
      {showCoupleProfile && (
        <>
          <ModalWrapper>
            <CoupleProfile
              onClose={() => setShowCoupleProfile(false)}
              onUpdateNames={(girl, boy) => {
                setGirlname(girl);
                setBoyname(boy);
              }}
            />
          </ModalWrapper>
          <Backdrop onClick={() => setShowCoupleProfile(false)} />
        </>
      )}
    </Container>
  );
}
