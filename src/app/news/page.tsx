"use client";

import { getNoticeList, NoticeHomeListResponse } from "@/api-domain/news";
import { Header } from "@/components/molecules/header";
import { useEffect, useState } from "react";
import { NewsCard } from "./component/news-category/news-card/NewsCard";
import {
  BadgeType,
  NewsCardProps,
} from "./component/news-category/news-card/NewsCard.types";
import {
  NewsCategoryTabs,
  TabKey,
} from "./component/news-category/NewsCategoryTabs";
import { GridContainer, LayoutWrapper, Title } from "./news.styles";

export default function NewsPage() {
  const [noticeList, setNoticeList] = useState<NoticeHomeListResponse[]>([]);
  const [activeTab, setActiveTab] = useState<TabKey>("SNS");
  const mapToNewsCardProps = (item: NoticeHomeListResponse): NewsCardProps => ({
    noticedAt: item.noticedAt.slice(0, 10).replace(/-/g, "."),
    title: item.title,
    category: item.category as BadgeType,
    important: item.important,
  });

  useEffect(() => {
    const loadNoticeList = async () => {
      const res = await getNoticeList({
        category: "SNS",
        page: 0,
        size: 20,
        sort: "",
      });
      console.log("🌐 res", res.body);
      setNoticeList(res.body.content);
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
        <GridContainer>
          {noticeList.map((item, index) => (
            <NewsCard key={index} {...mapToNewsCardProps(item)} />
          ))}
        </GridContainer>
      </LayoutWrapper>
    </>
  );
}
