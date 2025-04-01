import React, { useState } from "react";
import StoryCard from "./StoryCard";
import FilterBar from "./FilterBar";
import styled from "styled-components";
import baby1 from "../img/baby1.jpg";
import baby2 from "../img/baby2.jpg";
import baby3 from "../img/baby3.jpg";
import baby4 from "../img/baby4.jpg";
import baby5 from "../img/baby5.jpg";
import baby6 from "../img/baby6.jpg";

const Wrapper = styled.div`
  max-width: 700px;
  margin: 0 auto;
  padding: 40px 16px;
`;

const initialStories = [
  {
    id: 1,
    author: "하늘",
    content: "아아아아아아아아아아아아 🌸 #귀엽다",
    images: [baby1, baby2, baby3],
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
    images: [baby4, baby5, baby6],
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
                likeCount: story.liked ? story.likeCount - 1 : story.likeCount + 1,
              }
            : story
        )
      );
    };

    return (
      <Wrapper>
        <FilterBar
          filter={filter}
          onFilterChange={setFilter}
          search={search}
          onSearchChange={setSearch}
        />
        {filteredStories.map((story) => (
          <StoryCard key={story.id} story={story} onToggleLike={toggleLike} />
        ))}
      </Wrapper>
    );
  };

export default AllStories;
