import styled from "styled-components";

const LikeIcon = styled.span`
  cursor: pointer;
  color: ${(props) => (props.$active ? "#ff4d4d" : "#999")};
  transition: color 0.2s ease;
`;

const LikeButton = ({ liked, likeCount, onClick }) => {
  return (
    <LikeIcon $active={liked} onClick={onClick}>
      ❤️ {likeCount}
    </LikeIcon>
  );
};

export default LikeButton;
