"use client";

import { Footer } from "@/components/molecules/footer";
import { DesktopHeader } from "@/components/molecules/header/header.desktop";
import { SectionHeader } from "@/components/molecules/section-header";
import styled from "@emotion/styled";
import { WorkGrid } from "./component/work-grid/WorkGrid";

export const LayoutWrapper = styled.div`
  display: flex;
  max-width: 1920px;
  flex-direction: column;
  align-items: center;
  align-self: stretch;
  margin: 0 auto;

  padding: calc(64px + 48px) 24px 128px 24px; // ✅ 헤더 높이 고려
  gap: 48px;

  @media (max-width: 1279px) {
    padding: calc(64px + 48px) 16px 128px 16px;
    gap: 32px;
  }
`;

const WorkPage = () => {
  return (
    <>
      <DesktopHeader pageType="sub" mode="light" />
      <LayoutWrapper>
        <SectionHeader
          title="WORK"
          tabs={["웹툰", "웹소설", "북스", "굿즈", "영화영상", "디지털"]}
          activeTab="웹툰"
          onChange={(tab) => console.log(tab)}
        />
        <WorkGrid items={[]} />
        {/* <Pagination
          current={1}
          total={20}
          onChange={(page) => console.log(page)}
        /> */}
      </LayoutWrapper>
      <Footer />
    </>
  );
};

export default WorkPage;
