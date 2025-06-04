import { colors, radius, shadow, spacing } from '@/tokens';
import { formatDate } from '@/utils/formatDate';
import styled from '@emotion/styled';
import { useRef } from 'react';

interface NewsSectionProps {
  className?: string;
}

export function NewsSection({ className }: NewsSectionProps) {
  const ref = useRef(null);
  const newsList = [
    {
      id: 7,
      important: true,
      category: 'SNS',
      title: '[출간] 『센고쿠 여고생담』 15권',
      noticedAt: '2025-06-01T00:00:00',
    },
    {
      id: 6,
      important: true,
      category: 'SNS',
      title: '[신작] <지는 쪽이 영부인> 네이버웹툰 오픈! (05/29)',
      noticedAt: '2025-05-01T00:00:00',
    },
    {
      id: 22,
      important: false,
      category: 'SNS',
      title: '[신작] <재력으로 후려치는 환생 경찰> 네이버 매일플러스 전격 오픈! (05/31)',
      noticedAt: '2025-05-01T00:00:00',
    },
    {
      id: 21,
      important: false,
      category: 'SNS',
      title: '\t [출간] 『킹스메이커 ~Triple Crown~』 8~10권',
      noticedAt: '2025-06-01T00:00:00',
    },
  ];

  return (
    <Wrapper
      ref={ref}
      className={className}
    >
      <TextArea>
        <Title>NEWS</Title>
        <Description>
          재담미디어의 재미있는 소식,
          <br />
          놓치지 마세요
        </Description>
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
  flex-direction: column;
  align-items: center;
  padding: 0px 64px;
  margin: 0 auto;
  height: 100%;
  background-color: ${colors.white};

  @media (min-width: 800px) {
    flex-direction: row;
    justify-content: center;
  }
`;

const TextArea = styled.div`
  flex-shrink: 0;
  margin-bottom: 40px;

  @media (min-width: 800px) {
    margin-bottom: 0;
    margin-right: 60px;
  }
`;

const Title = styled.h2`
  font-weight: 700;
  color: ${colors.gray900};
  margin-bottom: 8px;
`;

const Description = styled.p`
  font-size: 16px;
  color: ${colors.gray700};
  line-height: 1.6;
`;

const CardArea = styled.div`
  display: grid;
  gap: 20px;
  width: 100%;
  max-width: 1060px;
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
