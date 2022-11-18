import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const NewCard = ({ news }) => {
  const LinkNewCard = styled.a`
    color: black;
    :hover {
      color: black;
    }
  `;
  const NewsCard = styled.div`
    display: flex;
    border: 1px solid #eee;
    width: 400px;
  `;
  const NewsCardImage = styled.div`
    padding: 5px;
    width: 200px;
    height: 200px;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  `;
  const NewsCardContent = styled.div`
    padding: 5px;
    width: 200px;

    .title {
      font-weight: bold;
      font-size: 16px;
      margin-bottom: 10px;
      color: #8397de;
    }
  `;
  return (
    <>
      <LinkNewCard href={news.link} target="_blank">
        <NewsCard>
          <NewsCardImage>
            <img src={news.thumbnail} />
          </NewsCardImage>
          <NewsCardContent>
            <p className="title">{news.title}</p>
            <p>{news.pubDate}</p>
            {/* <p>{news.description}.</p> */}
          </NewsCardContent>
        </NewsCard>
      </LinkNewCard>
    </>
  );
};

export default NewCard;
