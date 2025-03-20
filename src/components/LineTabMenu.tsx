import styled from "@emotion/styled";
import { useState } from "react";

interface TabMenuProps {
  tabs: string[];
  fontSize?: string;
  onChange: (tab: string, index: number) => void;
}

export default function LineTabMenu({
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
          fontSize={fontSize || "18px"}
          onClick={() => {
            setActiveTab(tab);
            onChange(tab, index);
          }}
        >
          {tab}
          <HoverLine className="hover-line" />
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
`;

const TabItem = styled.div<{ isActive: boolean; fontSize: string }>`
  position: relative;
  font-size: ${({ fontSize }: { fontSize?: string }) => fontSize};
  font-weight: bold;
  color: ${({ isActive }: { isActive: boolean }) =>
    isActive ? "#00c1d4" : "#333"};
  cursor: pointer;
  padding: 5px 5px;
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

const HoverLine = styled.div`
  content: "";
  position: absolute;
  bottom: -2px;
  left: 0;
  width: 100%;
  height: 3px;
  background-color: #00c1d4;
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 0.3s ease-in-out;

  ${TabItem}:hover & {
    transform: scaleX(1);
  }
`;
