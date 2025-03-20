import Header from "@/components/Header";
import LineTabMenu from "@/components/LineTabMenu";
import PageTop from "@/components/PageTop";
import TitleTabMenu from "@/components/TitleTabMenu";
import WebtoonItem from "@/components/WebtoonItem";
import { newWebtoons } from "@/util/code";
import { useEffect, useState } from "react";

const shuffleArray = (array: any[]) => {
  let shuffled = [...array];
  let attempt = 0;

  while (JSON.stringify(shuffled) === JSON.stringify(array) && attempt < 10) {
    shuffled = [...array].sort(() => Math.random() - 0.5);
    attempt++;
  }

  return shuffled;
};

export default function New() {
  const [webtoons, setWebtoons] = useState(newWebtoons);

  useEffect(() => {
    setWebtoons(shuffleArray(newWebtoons));
  }, []);

  const handleTabChange = () => {
    setWebtoons(shuffleArray(newWebtoons));
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Header color="#000" />
      <PageTop />

      <TitleTabMenu
        tabs={["신작", "연재작", "완결작"]}
        onChange={handleTabChange}
      />

      <LineTabMenu
        tabs={[
          "전체",
          "로맨스/BL",
          "액션",
          "드라마",
          "스릴러/공포",
          "SF/무협",
          "코미디",
          "성인",
        ]}
        onChange={handleTabChange}
        fontSize="14px"
      />

      <div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
            gap: "20px",
            padding: "20px",
            maxWidth: "1200px",
          }}
        >
          {webtoons.map((webtoon) => (
            <WebtoonItem
              key={webtoon.id + Math.floor(Math.random() * 100000)}
              webtoon={webtoon}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
