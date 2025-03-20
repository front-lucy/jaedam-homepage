import styled from "@emotion/styled";

interface WebtoonItemProps {
  webtoon: {
    id: number;
    image: string;
    title: string;
    author: string;
    description: string;
  };
}

export default function WebtoonItem({ webtoon }: WebtoonItemProps) {
  return (
    <ItemContainer>
      <WebtoonImage src={webtoon.image} alt={webtoon.title} />
      <WebtoonTitle>{webtoon.title}</WebtoonTitle>
      <WebtoonAuthor>{webtoon.author}</WebtoonAuthor>
      <WebtoonDescription>{webtoon.description}</WebtoonDescription>
    </ItemContainer>
  );
}

// ✅ 스타일드 컴포넌트
const ItemContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const WebtoonImage = styled.img`
  width: 100%;
  height: auto;
  border-radius: 8px;
`;

const WebtoonTitle = styled.h3`
  text-align: left;
  font-size: 18px;
  margin-top: 15px;
  font-weight: bold;
`;

const WebtoonAuthor = styled.p`
  text-align: left;
  font-size: 16px;
  margin-top: 10px;
  font-family: "NanumBarunGothic", sans-serif;
  color: #999;
`;

const WebtoonDescription = styled.p`
  text-align: left;
  font-size: 14px;
  margin-top: 10px;
  word-break: keep-all;
  transform: skew(-0.05deg);
  font-family: "NanumBarunGothic", sans-serif;
  line-height: 1.4;
`;
