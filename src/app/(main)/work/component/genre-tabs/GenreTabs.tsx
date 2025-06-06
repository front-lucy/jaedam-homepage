import { FC } from "react";
import { TabItem, TabList } from "./GenreTabs.styles";
import { GenreTabsProps } from "./GenreTabs.types";

const genres = [
  "전체",
  "로맨스",
  "BL",
  "로맨스판타지",
  "액션",
  "드라마",
  "SF/무협",
  "스릴러/공포",
  "코미디",
  "성인",
];

export const GenreTabs: FC<GenreTabsProps> = ({ activeGenre, onChange }) => {
  return (
    <TabList>
      {genres.map((genre) => (
        <TabItem
          key={genre + Math.random()}
          active={genre === activeGenre}
          onClick={() => onChange(genre)}
        >
          {genre}
        </TabItem>
      ))}
    </TabList>
  );
};
