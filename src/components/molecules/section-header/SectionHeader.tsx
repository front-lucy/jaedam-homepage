import { FC } from "react";
import { TabItem, TabList, Title, Wrapper } from "./sectionHeader.styles";
import { SectionHeaderProps } from "./sectionHeader.types";

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
          </TabItem>
        ))}
      </TabList>
    </Wrapper>
  );
};
