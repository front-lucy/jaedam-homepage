import { FC } from "react";
import { TabButton, TabList } from "./NewsCategory.styles";

export type TabKey =
  | "ALL"
  | "SNS"
  | "JAEDAM_NOTICE"
  | "PRESS_RELEASE"
  | "MEDIA_CONTENT";

const tabMap: Record<TabKey, string> = {
  ALL: "전체",
  JAEDAM_NOTICE: "재담 공지",
  PRESS_RELEASE: "보도 자료",
  MEDIA_CONTENT: "미디어 자료",
  SNS: "SNS",
};

interface Props {
  activeKey: TabKey;
  onChange: (key: TabKey) => void;
}

export const NewsCategoryTabs: FC<Props> = ({ activeKey, onChange }) => {
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
