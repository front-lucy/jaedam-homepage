import styled from "@emotion/styled";
import { useState } from "react";

interface TabMenuProps {
  tabs: string[];
  fontSize?: string;
  onChange: (tab: string, index: number) => void;
}

export default function TitleTabMenu({
  tabs,
  fontSize,
  onChange,
}: TabMenuProps) {
  const [activeTab, setActiveTab] = useState<string>(tabs[0]);

  return (
    <TabContainer>
      {tabs.map((tab, index) => (
        <TabItem
          key={tab}
          isActive={activeTab === tab}
          fontSize={fontSize || "20px"}
          onClick={() => {
            setActiveTab(tab);
            onChange(tab, index);
          }}
        >
          {tab}
        </TabItem>
      ))}
    </TabContainer>
  );
}

const TabContainer = styled.div`
  display: flex;
  gap: 20px;
  padding: 10px 0;
  max-width: 1200px;
  width: 100%;
  padding-top: 60px;
`;

const TabItem = styled.div<{ isActive: boolean; fontSize: string }>`
  position: relative;
  font-size: ${({ fontSize }: { fontSize: string }) => fontSize};
  font-weight: bold;
  color: ${({ isActive }: { isActive: boolean }) =>
    isActive ? "#333" : "#999"};
  cursor: pointer;
  padding: 5px 10px;
  transition: color 0.3s ease-in-out;

  &:hover {
    color: #00c1d4;
  }

  ${({ isActive }: { isActive: boolean }) =>
    isActive &&
    `
    & .hover-line {
            transform: scaleX(1);
    }
`}
`;
