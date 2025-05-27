"use client";

import { getContents } from "@/api-domain/work"; // ✅ 여기 경로 확인
import { Footer } from "@/components/molecules/footer";
import { DesktopHeader } from "@/components/molecules/header/header.desktop";
import { SectionHeader } from "@/components/molecules/section-header";
import { useWorkStore } from "@/store/useWorkStore";
import { ContentType, contentTypeLabels } from "@/types/workTypes";
import styled from "@emotion/styled";
import { useEffect } from "react";
import { WorkGrid } from "./component/work-grid/WorkGrid";

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

const WorkPage = () => {
  const {
    selectedTab,
    currentPage,
    items,
    setItems,
    setSelectedTab,
    setTotalPages,
  } = useWorkStore();

  useEffect(() => {
    const loadContents = async () => {
      try {
        const res = await getContents({
          type: selectedTab,
          page: currentPage,
        });

        if (res) {
          setItems(res.content);
          setTotalPages(res.totalPages);
        }
      } catch (err) {
        console.error("콘텐츠 불러오기 실패:", err);
      }
    };

    loadContents();
  }, [selectedTab, currentPage, setItems, setTotalPages]);

  return (
    <>
      <DesktopHeader pageType="sub" mode="light" />
      <LayoutWrapper>
        <SectionHeader
          title="WORK"
          tabs={Object.values(contentTypeLabels)}
          activeTab={contentTypeLabels[selectedTab]}
          onChange={(label) => {
            const entry = Object.entries(contentTypeLabels).find(
              ([, value]) => value === label
            );
            if (entry) {
              setSelectedTab(entry[0] as ContentType);
            }
          }}
        />
        <WorkGrid items={items} />
        {/* <Pagination current={currentPage} total={totalPages} onChange={setCurrentPage} /> */}
      </LayoutWrapper>
      <Footer />
    </>
  );
};

export default WorkPage;
