import axios from "axios";
import React, { useEffect, useState } from "react";
import NewCard from "../components/NewCard";
import styled from "styled-components";
const News = () => {
  const [news, setNews] = useState([]);
  useEffect(() => {
    const fetchApiNews = async () => {
      const res = await axios.get(
        "https://api.rss2json.com/v1/api.json?rss_url=https://vnexpress.net/rss/thoi-su.rss"
      );
      setNews(res.data);
      return res;
    };
    fetchApiNews();
  }, []);
  console.log(news);
  const CardNewsContainer = styled.div`
    display: flex;
    gap: 10px;
    flex-wrap: wrap;
    justify-content: center;
  `;
  return (
    <CardNewsContainer>
      {news?.items?.map((news, idx) => (
        <NewCard key={idx} news={news} />
      ))}
    </CardNewsContainer>
  );
};

export default News;
