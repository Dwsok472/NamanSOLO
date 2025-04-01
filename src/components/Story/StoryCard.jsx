import React, { useState } from "react";
import styled from "styled-components";
import LikeButton from "./LikeButton";
import CommentInput from "./CommentInput";

const Card = styled.div`
  width: 780px;
  min-height: 90vh;
  background-color: #fff0eb;
  clip-path: polygon(
    10% 0%,
    90% 0%,
    120% 25%,
    120% 75%,
    90% 100%,
    10% 100%,
    0% 90%,
    0% 10%
  );
  margin: 60px auto;
  padding: 24px 32px 40px;
  display: flex;
  flex-direction: column;
  position: relative;
`;

const StoryImageWrapper = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StoryImage = styled.img`
  width: 85%;
  border-radius: 8px;
  object-fit: cover;
`;

const SlideIndicator = styled.div`
  text-align: right;
  font-size: 12px;
  color: #888;
  margin-top: 4px;
`;

const SlideArea = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  ${(props) => (props.$position === "left" ? "left: 0;" : "right: 0;")}
  width: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: ${(props) =>
    props.$position === "left" ? "flex-start" : "flex-end"};
  padding: 0 12px;
  z-index: 2;
`;

const ArrowIcon = styled.span`
  font-size: 20px;
  color: #fff;
  background-color: rgba(0, 0, 0, 0.35);
  border-radius: 50%;
  width: 26px;
  height: 26px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ContentText = styled.p`
  margin: 12px 0 16px;
  font-size: 15px;
  line-height: 1.5;
`;

const Divider = styled.hr`
  margin: 12px 0;
  border: none;
  border-top: 1px solid #ccc;
`;

const TagArea = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 12px;
`;

const Tag = styled.span`
  font-size: 13px;
  color: #444;
  background-color: #ffd8d8;
  padding: 4px 10px;
  border-radius: 20px;
`;


const MetaRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 18px;
`;

const ProfileGroup = styled.div`
  display: flex;
  align-items: center;
`;

const ProfileImg = styled.img`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  margin-right: 12px;
`;

const AuthorInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

const ActionIcons = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  font-size: 18px;
`;

const CommentList = styled.ul`
  margin-top: 12px;
  padding-left: 16px;
  font-size: 14px;
  color: #333;
`;

const CommentText = styled.div`
  display: inline-block;
  font-size: 14px;
  color: #333;
  white-space: pre-line;
`;

const CommentListWrapper = styled.div`
  max-width: 600px;
  margin: 12px auto 0 auto;
  width: 100%;
`;

const CommentItem = styled.div`
  padding: 8px 12px;
  background: #fff;
  border: 1px solid #eee;
  border-radius: 6px;
  margin-bottom: 8px;
  font-size: 14px;
  color: #333;
`;

const CommentHeader = styled.div`
  display: flex;
  justify-content: space-between;
`;

const ReplyToggle = styled.button`
  font-size: 12px;
  background: none;
  border: none;
  color: #888;
  cursor: pointer;
`;

const ReplyList = styled.div`
  margin-top: 6px;
  padding-left: 20px;
`;

const ReplyItem = styled.div`
  font-size: 14px;
  color: #555;
  margin-bottom: 4px;
`;

const ReplyInputWrapper = styled.div`
  display: flex;
  gap: 8px;
  margin-top: 10px;
  padding-left: 20px;

  input {
    flex: 1;
    padding: 6px 10px;
    font-size: 14px;
  }

  button {
    background-color: #fda899;
    border: none;
    border-radius: 4px;
    color: white;
    padding: 6px 12px;
    cursor: pointer;
  }
`;

const LocationRow = styled.div`
  display: flex;
  align-items: center;
  font-size: 14px;
  color: #555;
  margin: 10px 0;
  padding-left: 4px;
`;

const LocationButton = styled.button`
  background: none;
  border: none;
  margin-left: 6px;
  color: #333;
  font-weight: 500;
  cursor: pointer;
  text-decoration: underline;
  font-size: 14px;

  &:hover {
    color: #ff5777;
  }
`;




const StoryCard = ({ story, onToggleLike }) => {
  const [comments, setComments] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [activeReplyId, setActiveReplyId] = useState(null);
  const [replyText, setReplyText] = useState('');
  const [likes, setLikes] = useState([]);
  const [showAllComments, setShowAllComments] = useState(false);

  const handleAddComment = (text) => {
    const newComment = {
      id: Date.now(),
      user: "me",
      content: text,
      replies: []
    };
    setComments((prev) => [...prev, newComment]);
  };

  const handleAddReply = (commentId) => {
    const newReply = {
      id: Date.now(),
      user: 'me',
      content: replyText,
    };

    const updated = comments.map((comment) =>
      comment.id === commentId
        ? { ...comment, replies: [...comment.replies, newReply] }
        : comment
    );

    setComments(updated);
    setReplyText('');
  };

  const getTotalCommentCount = () => {
    return comments.reduce((acc, comment) => acc + 1 + comment.replies.length, 0);
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? story.images.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === story.images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const toggleLike = () => {
    const myId = "me";
    if (likes.includes(myId)) {
      setLikes((prev) => prev.filter((id) => id !== myId));
    } else {
      setLikes((prev) => [...prev, myId]);
    }
  };

  

  return (
    <Card>
      <StoryImageWrapper>
        <SlideArea onClick={handlePrev} $position="left">
          <ArrowIcon>‹</ArrowIcon>
        </SlideArea>
  
        <StoryImage src={story.images[currentIndex]} />
  
        <SlideArea onClick={handleNext} $position="right">
          <ArrowIcon>›</ArrowIcon>
        </SlideArea>
      </StoryImageWrapper>
  
      <SlideIndicator>
        {currentIndex + 1}/{story.images.length}
      </SlideIndicator>
  
      <ContentText>{story.content}</ContentText>
  
      <MetaRow>
        <ProfileGroup>
          <ProfileImg src={story.profileImage} alt="프로필" />
          <AuthorInfo>
            <strong>{story.author}</strong>
            <span style={{ fontSize: "12px", color: "#888" }}>
              {story.createdAt}
            </span>
          </AuthorInfo>
        </ProfileGroup>
  
        <ActionIcons>
          <LikeButton
            liked={likes.includes("me")}
            likeCount={likes.length}
            onClick={toggleLike}
          />
          <span>💬 {comments.length}</span>
          <span>⭐</span>
        </ActionIcons>
      </MetaRow>
  
      <Divider />
  
      <TagArea>
        {story.tags?.map((tag, i) => (
          <Tag key={i}>#{tag}</Tag>
        ))}
      </TagArea>

      {story.location && (
        <LocationRow>
          <span role="img" aria-label="pin">📍</span>
          <LocationButton onClick={() => alert(`여기서 지도 열 예정: ${story.location.name}`)}>
            {story.location.address} ({story.location.name})
          </LocationButton>
        </LocationRow>
      )}

     <CommentListWrapper>
        {(showAllComments ? comments : comments.slice(0, 1)).map((comment) => (
          <CommentItem key={comment.id}>
            <CommentHeader>
              <CommentText>
                <strong>{comment.user}</strong>: {comment.content}
              </CommentText>
              <ReplyToggle
                onClick={() =>
                  setActiveReplyId(activeReplyId === comment.id ? null : comment.id)
                }
              >
                💬 {comment.replies.length} 답글
              </ReplyToggle>
            </CommentHeader>

            {activeReplyId === comment.id && (
              <>
                <ReplyList>
                  {comment.replies.map((reply) => (
                    <ReplyItem key={reply.id}>
                      ↪ <strong>{reply.user}</strong>: {reply.content}
                    </ReplyItem>
                  ))}
                </ReplyList>

                <ReplyInputWrapper>
                  <input
                    value={replyText}
                    onChange={(e) => setReplyText(e.target.value)}
                    placeholder="답글을 입력하세요"
                  />
                  <button onClick={() => handleAddReply(comment.id)}>등록</button>
                </ReplyInputWrapper>
              </>
            )}
          </CommentItem>
        ))}

        {!showAllComments && comments.length > 1 && (
          <ReplyToggle onClick={() => setShowAllComments(true)}>
            댓글 {comments.length - 1}개 더 보기
          </ReplyToggle>
        )}
      </CommentListWrapper>

  
      <CommentInput onSubmit={handleAddComment} />
    </Card>
  );
};

export default StoryCard;
