import { NoticeHomeListResponse, getMainNoticeList } from '@/api-domain/news';
import BubbleSVG from '@/assets/icons/visual-bubble.svg';
import { Text } from '@/components/atom/text';
import { DeviceType, useDeviceType } from '@/hooks/useDeviceType';
import { TypographyType, colors, radius, shadow, spacing, typography } from '@/tokens';
import { formatDate } from '@/utils/formatDate';
import styled from '@emotion/styled';
import { CSSProperties, useEffect, useRef, useState } from 'react';
import { InfiniteLogoSlider } from './logoslider/InfiniteLogoSlider';
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
    <>
      <Wrapper
        ref={ref}
        className={className}
      >
        <TextArea>
          <BubbleSVGWrap />
          <Text typography={styleVariants[device].contents.titleTypography}>NEWS</Text>
          <Text typography={styleVariants[device].contents.descriptionTypography}>
            재담미디어의 재미있는 소식,
            <br />
            놓치지 마세요
          </Text>
        </TextArea>
        <CardArea>
          {(device === 'mobile' ? newsList.slice(0, 3) : newsList).map(item => (
            <CardContainer key={item.id + item.category}>
              <Badge>{item.category}</Badge>
              <CardTitle>{item.title}</CardTitle>
              <CardDate>{formatDate(item.noticedAt)}</CardDate>
            </CardContainer>
          ))}
        </CardArea>{' '}
        <InfiniteLogoSlider />
      </Wrapper>
    </>
  );
}

const Wrapper = styled.section`
  position: relative;
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
    flex-direction: column;
    align-items: flex-start;
  }

  @media (max-width: 799px) {
    grid-template-columns: 1fr;
    gap: ${spacing['3XL']};
    flex-direction: row;
    justify-content: center;
    flex-direction: column;
    align-items: flex-start;
  }
`;

const TextArea = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  gap: ${spacing.XL};
  min-width: 357px;

  @media (min-width: 1280px) {
    gap: ${spacing.XL};
    min-width: 357px;
  }

  @media (max-width: 1279px) and (min-width: 800px) {
    grid-template-columns: repeat(2, 1fr);
    gap: ${spacing.M};
    min-width: 223px;
  }

  @media (max-width: 799px) {
    grid-template-columns: 1fr;
    gap: ${spacing.S};
    min-width: 201px;
  }
`;

const BubbleSVGWrap = styled(BubbleSVG)`
  position: absolute;
  top: 0;
  right: 0;
  width: 154px;
  height: 122px;
  right: 12px;
  top: -84px;

  @media (min-width: 1280px) {
    width: 120px;
    height: 120px;
    right: 12px;
    top: -84px;
  }

  @media (max-width: 1279px) and (min-width: 800px) {
    width: 116px;
    height: 91px;
    right: -39%;
    top: -46.5px;
  }

  @media (max-width: 799px) {
    width: 101px;
    height: 80px;
    right: -31px;
    top: -52px;
  }
`;
const CardArea = styled.div`
  display: grid;
  width: 100%;
  gap: ${spacing.L};

  @media (min-width: 1280px) {
    grid-template-columns: repeat(2, 1fr);
    gap: ${spacing.L};
    max-width: 960px;
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

const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: ${radius.r400};
  background-color: ${colors.white};
  justify-content: space-between;
  box-shadow: ${shadow.s300};
  padding: ${spacing['2XL']};
  gap: ${spacing.XL};
  width: 100%;

  @media (max-width: 1279px) and (min-width: 800px) {
    gap: ${spacing.L};
    padding: ${spacing['2XL']};
  }
  @media (max-width: 799px) {
    gap: ${spacing.XS};
    padding: ${spacing.M};
  }
`;

const Badge = styled.span`
  ${typography['caption1-bold']};
  color: ${colors.jaedamCyan};
`;

const CardTitle = styled.h3`
  ${typography['title3-medium']};

  @media (max-width: 1279px) and (min-width: 800px) {
    ${typography['title2-medium']};
  }

  @media (max-width: 799px) {
    ${typography['body-medium']};
  }

  color: ${colors.gray900};
  line-height: 1.4;
`;

const CardDate = styled.time`
  ${typography['caption1-regular']};
  color: ${colors.gray400};
`;
