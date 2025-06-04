import { NoticeHomeListResponse, getMainNoticeList } from '@/api-domain/news';
import { Text } from '@/components/atom/text';
import { DeviceType, useDeviceType } from '@/hooks/useDeviceType';
import { TypographyType, colors, radius, shadow, spacing } from '@/tokens';
import { formatDate } from '@/utils/formatDate';
import styled from '@emotion/styled';
import { CSSProperties, useEffect, useRef, useState } from 'react';

interface NewsSectionProps {
  className?: string;
}

const styleVariants: Record<
  DeviceType,
  Record<'contents', CSSProperties & { titleTypography: TypographyType; descriptionTypography: TypographyType }>
> = {
  desktop: {
    contents: {
      titleTypography: 'display2-black',
      descriptionTypography: 'headline3-regular',
    },
  },
  tablet: {
    contents: {
      titleTypography: 'display2-black',
      descriptionTypography: 'title2-regular',
    },
  },
  mobile: {
    contents: {
      titleTypography: 'headline1-black',
      descriptionTypography: 'title3-regular',
    },
  },
};

export function NewsSection({ className }: NewsSectionProps) {
  const ref = useRef(null);
  const device = useDeviceType();
  const [newsList, setNewsList] = useState<NoticeHomeListResponse[]>([]);
  useEffect(() => {
    const loadNewsList = async () => {
      const res = await getMainNoticeList();
      setNewsList(res.body);
    };

    loadNewsList();
  }, []);

  return (
    <Wrapper
      ref={ref}
      className={className}
    >
      <TextArea>
        <Text typography={styleVariants[device].contents.titleTypography}>NEWS</Text>
        <Text typography={styleVariants[device].contents.descriptionTypography}>
          재담미디어의 재미있는 소식,
          <br />
          놓치지 마세요
        </Text>
      </TextArea>
      <CardArea>
        {newsList.map(item => (
          <CardContainer key={item.id + item.category}>
            <Badge>{item.category}</Badge>
            <CardTitle>{item.title}</CardTitle>
            <CardDate>{formatDate(item.noticedAt)}</CardDate>
          </CardContainer>
        ))}
      </CardArea>
    </Wrapper>
  );
}

const Wrapper = styled.section`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 0px 64px;
  margin: 0 auto;
  height: 100%;
  background-color: ${colors.white};
  gap: ${spacing['4XL']};

  @media (min-width: 1280px) {
    gap: ${spacing['4XL']};
  }

  @media (max-width: 1279px) and (min-width: 800px) {
    grid-template-columns: repeat(2, 1fr);
    gap: ${spacing['4XL']};
  }

  @media (max-width: 799px) {
    grid-template-columns: 1fr;
    gap: ${spacing['3XL']};
    flex-direction: row;
    justify-content: center;
  }
`;

const TextArea = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 40px;
  gap: ${spacing.XL};

  @media (min-width: 1280px) {
    gap: ${spacing.XL};
  }

  @media (max-width: 1279px) and (min-width: 800px) {
    grid-template-columns: repeat(2, 1fr);
    gap: ${spacing.M};
  }

  @media (max-width: 799px) {
    grid-template-columns: 1fr;
    gap: ${spacing.S};
  }
`;

const CardArea = styled.div`
  display: grid;
  gap: 20px;
  width: 100%;
  max-width: 960px;
  @media (min-width: 1280px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 20px;
  }

  @media (max-width: 1279px) and (min-width: 800px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 16px;
  }

  @media (max-width: 799px) {
    grid-template-columns: 1fr;
    gap: 12px;
  }
`;

const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: ${radius.r400};
  background-color: ${colors.white};
  justify-content: space-between;
  box-shadow: ${shadow.s300};
  padding: ${spacing.XL};
  gap: ${spacing.M};
  width: 100%;
`;

const Badge = styled.span`
  font-size: 14px;
  font-weight: 700;
  color: ${colors.jaedamCyan};
`;

const CardTitle = styled.h3`
  font-size: 16px;
  font-weight: 500;
  color: ${colors.gray900};
  line-height: 1.4;
`;

const CardDate = styled.time`
  font-size: 14px;
  color: ${colors.gray400};
`;
