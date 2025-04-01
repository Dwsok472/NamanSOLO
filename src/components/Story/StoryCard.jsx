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




const StoryCard = ({ story, onToggleLike }) => {
  const [comments, setComments] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleAddComment = (text) => {
    const newComment = {
      id: Date.now(),
      user: 'me',
      content: text,
    };
    setComments((prev) => [...prev, newComment]);
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
            liked={story.liked}
            likeCount={story.likeCount}
            onClick={() => onToggleLike(story.id)}
          />
          <span>💬 {story.commentCount + comments.length}</span>
          <span>⭐</span>
        </ActionIcons>
      </MetaRow>
  
      <Divider />
  
      <TagArea>
        {story.tags?.map((tag, i) => (
          <Tag key={i}>#{tag}</Tag>
        ))}
      </TagArea>

      <CommentListWrapper>
        {comments.map((comment) => (
          <CommentItem key={comment.id}>
            <strong>{comment.user}</strong>: {comment.content}
          </CommentItem>
        ))}
      </CommentListWrapper>
  
      <CommentInput onSubmit={handleAddComment} />
    </Card>
  );
};

export default StoryCard;
