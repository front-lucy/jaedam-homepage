import { FC } from "react";
import { SectionHeaderProps } from "./sectionHeader.types";
import {
  Wrapper,
  Title,
  TabList,
  TabItem,
  Underline,
} from "./sectionHeader.styles";

export const SectionHeader: FC<SectionHeaderProps> = ({
  title,
  tabs,
  activeTab,
  onChange,
}) => {
  return (
    <Wrapper>
      <Title>{title}</Title>
      <TabList>
        {tabs.map((tab) => (
          <TabItem
            key={tab}
            isActive={tab === activeTab}
            onClick={() => onChange(tab)}
          >
            {tab}
            {tab === activeTab && <Underline />}
          </TabItem>
        ))}
      </TabList>
    </Wrapper>
  );
};
