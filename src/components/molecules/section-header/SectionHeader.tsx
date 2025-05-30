import { FC, useEffect, useRef, useState } from "react";
import {
  TabItem,
  TabList,
  TabListWrapper,
  Title,
  Wrapper,
} from "./sectionHeader.styles";
import { SectionHeaderProps } from "./sectionHeader.types";

export const SectionHeader: FC<SectionHeaderProps> = ({
  title,
  tabs,
  activeTab,
  onChange,
}) => {
  const tabListWrapperRef = useRef<HTMLDivElement>(null);
  const tabListRef = useRef<HTMLUListElement>(null);
  const [isScrollable, setIsScrollable] = useState(false);

  useEffect(() => {
    const wrapper = tabListWrapperRef.current;
    const list = tabListRef.current;

    if (wrapper && list) {
      setIsScrollable(list.scrollWidth > wrapper.clientWidth);
    }
  }, [tabs]);

  return (
    <Wrapper>
      <Title>{title}</Title>
      <TabListWrapper ref={tabListWrapperRef}>
        <TabList
          ref={tabListRef}
          className={isScrollable ? "scrollable" : "centered"}
        >
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
      </TabListWrapper>
    </Wrapper>
  );
};
