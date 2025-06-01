"use client";

import IconArrowLeft from "@/assets/icons/Icon-arrow-left.svg";
import { useDeviceType } from "@/hooks/useDeviceType";
import { useRouter } from "next/navigation";
import { FC } from "react";
import * as S from "./WorkDetailLayout.styles";
import { WorkDetailProps } from "./WorkDetailLayout.types";

export const WorkDetailLayout: FC<WorkDetailProps> = ({
  title,
  logline,
  synopsis,
  thumbnailUrl,
  category,
  genre,
  tags,
  writers,
  platformList,
}) => {
  const router = useRouter();
  const deviceType = useDeviceType();

  return (
    <S.Wrapper>
      <S.Container>
        {deviceType !== "mobile" && (
          <S.BackLink onClick={() => router.back()}>
            <IconArrowLeft />
          </S.BackLink>
        )}
        <S.ContentWrapper>
          <S.TextSection>
            <S.Logline>{logline}</S.Logline>
            <S.Title>{title}</S.Title>
            <S.Writer>{writers.map((w) => w.name).join(" / ")}</S.Writer>
            <S.Synopsis>{synopsis}</S.Synopsis>

            <S.Meta>
              <dt>Category</dt>
              <dd>{category}</dd>
              <dt>Genre</dt>
              <dd>{genre}</dd>
              <dt>Platform</dt>
              <dd>{platformList?.map((p) => p.type).join(", ")}</dd>
              {/* <dt>Open</dt>
              <dd>{openDate}</dd> */}
            </S.Meta>

            {tags.length > 0 && (
              <S.TagList>
                {tags.map((tag) => (
                  <S.Tag key={tag}>#{tag}</S.Tag>
                ))}
              </S.TagList>
            )}

            <S.LinkList>
              {platformList?.map((p) => (
                <S.LinkButton
                  key={p.id}
                  href={p.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {p.type} 보러가기
                </S.LinkButton>
              ))}
            </S.LinkList>
          </S.TextSection>

          <S.ThumbnailWrapper>
            <S.VisualBubbleWrapper>
              <S.VisualBubble
                src={"/assets/icons/work-visual-bubble.png"}
                alt="visual-bubble"
                width={520}
                height={411}
              />
            </S.VisualBubbleWrapper>
            <S.Thumbnail
              src={thumbnailUrl}
              alt={title}
              width={320}
              height={426}
            />{" "}
          </S.ThumbnailWrapper>
          {deviceType === "mobile" && (
            <S.BackLink onClick={() => router.back()}>
              <IconArrowLeft />
            </S.BackLink>
          )}
        </S.ContentWrapper>
      </S.Container>
    </S.Wrapper>
  );
};
