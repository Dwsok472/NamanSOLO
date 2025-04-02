import React, { useState } from "react";
import StoryCard from "./StoryCard";
import FilterBar from "./FilterBar";
import styled from "styled-components";

const initialStories = [
  {
    id: 1,
    author: "하늘",
    content: "아아아아아아아아아아아아 🌸 #귀엽다",
    // images: [baby1, baby2, baby3],
    createdAt: "3시간 전",
    likeCount: 4,
    commentCount: 2,
    liked: false,
    bookmarked: false,
    location: "서울숲",
    tags: ["아기", "10개월", "딸", "용띠아기"],
  },
  {
    id: 2,
    author: "바람",
    content: "오오오오오오오오오ㅇㅇㅇㅇㅇㅇ 🌊 #이쁘다",
    // images: [baby4, baby5, baby6],
    createdAt: "1일 전",
    likeCount: 10,
    commentCount: 5,
    liked: false,
    bookmarked: false,
    location: "속초해변",
    tags: ["baby", "cutebaby", "아기방꾸미기"],
  },
];

const AllStories = () => {
  const [stories, setStories] = useState(initialStories);
  const [filter, setFilter] = useState("latest");
  const [search, setSearch] = useState("");

  const filteredStories = [...stories]
    .filter((story) =>
      story.author.toLowerCase().includes(search.toLowerCase())
    )
    .sort((a, b) => {
      if (filter === "likes") return b.likeCount - a.likeCount;
      if (filter === "comments") return b.commentCount - a.commentCount;
      return 0;
    });

  const toggleLike = (id) => {
    setStories((prev) =>
      prev.map((story) =>
        story.id === id
          ? {
              ...story,
              liked: !story.liked,
              likeCount: story.liked
                ? story.likeCount - 1
                : story.likeCount + 1,
            }
          : story
      )
    );
  };

  return (
    <Wrapper>
      <TopTitle>STORY</TopTitle>
      <Divider />

      <MainLayout>
        <LeftColumn>
          <FilterBar
            filter={filter}
            onFilterChange={setFilter}
            search={search}
            onSearchChange={setSearch}
          />
        </LeftColumn>

        <CenterColumn>
          {filteredStories.map((story) => (
            <StoryCard
              key={story.id}
              story={story}
              onToggleLike={toggleLike}
            />
          ))}
        </CenterColumn>

        <RightColumn>
          <SearchInput
            type="text"
            placeholder="userName 검색"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </RightColumn>
      </MainLayout>
    </Wrapper>
  );
};

export default AllStories;

const Wrapper = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: 40px 16px;
`;

const TopTitle = styled.h1`
  font-size: 80px;
  font-weight: bold;
  text-align: center;
  margin-bottom: 12px;
  color: pink;
`;

const Divider = styled.hr`
  border: none;
  border-top: 1px solid #ccc;
  margin-bottom: 24px;
`;

const MainLayout = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 24px;
`;

const LeftColumn = styled.div`
  width: 240px;
`;

const CenterColumn = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 32px;
`;

const RightColumn = styled.div`
  width: 220px;
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 10px 12px;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-size: 14px;
`;
