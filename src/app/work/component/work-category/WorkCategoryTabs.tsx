import { FC } from "react";
import { TabButton, TabList } from "./WorkCategory.styles";

export type TabKey =
  | "WEBTOON"
  | "WEBSOON"
  | "BOOK"
  | "GOODS"
  | "VIDEO"
  | "DIGITAL";

const tabMap: Record<TabKey, string> = {
  WEBTOON: "웹툰",
  WEBSOON: "웹소설",
  BOOK: "북스",
  GOODS: "굿즈",
  VIDEO: "영화영상",
  DIGITAL: "디지털",
};

interface Props {
  activeKey: TabKey;
  onChange: (key: TabKey) => void;
}

export const WorkCategoryTabs: FC<Props> = ({ activeKey, onChange }) => {
  return (
    <TabList>
      {Object.entries(tabMap).map(([key, label]) => (
        <TabButton
          key={key}
          isActive={activeKey === key}
          onClick={() => onChange(key as TabKey)}
        >
          {label}
        </TabButton>
      ))}
    </TabList>
  );
};
