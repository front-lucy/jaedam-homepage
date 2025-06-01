"use client";

import { getNoticeList } from "@/api-domain/news";
import { Header } from "@/components/molecules/header";
import { colors } from "@/tokens";
import styled from "@emotion/styled";
import { useEffect, useState } from "react";
import {
  NewsCategoryTabs,
  TabKey,
} from "./component/news-category/NewsCategoryTabs";

const LayoutWrapper = styled.div`
  display: flex;
  max-width: 1920px;
  flex-direction: column;
  align-items: center;
  align-self: stretch;
  margin: 0 auto;

  padding: calc(64px + 48px) 24px 128px 24px;
  gap: 48px;

  @media (max-width: 1279px) {
    padding: calc(64px + 48px) 16px 128px 16px;
    gap: 32px;
  }
`;
export const Title = styled.h2`
  font-size: 64px;
  font-weight: 700;
  color: ${colors.gray900};

  @media (max-width: 1024px) {
    font-size: 44px;
  }

  @media (max-width: 768px) {
    font-size: 40px;
  }
`;

export default function NewsPage() {
  const [activeTab, setActiveTab] = useState<TabKey>("SNS");
  useEffect(() => {
    const loadNoticeList = async () => {
      const res = await getNoticeList({
        category: "SNS",
        page: 0,
        size: 20,
        sort: "",
      });
      console.log("🌐 res", res.body);
    };

    loadNoticeList();
  }, []);

  return (
    <>
      <LayoutWrapper>
        <div>
          <Title>NEWS</Title>
        </div>
        <Header pageType="sub" mode="light" />
        <NewsCategoryTabs activeKey={activeTab} onChange={setActiveTab} />
      </LayoutWrapper>
    </>
  );
}
