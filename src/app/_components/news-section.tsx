import { useDeviceType } from '@/hooks/useDeviceType';
import { colors, radius, shadow, spacing, typography } from '@/tokens';
import { formatDate } from '@/utils/formatDate';
import styled from '@emotion/styled';
import { useRef } from 'react';
// main-logo-jaedam-studiodam
import MainLogoJaedamStudioDam from '@/assets/icons/main-logo-jaedam-studiodam.svg';
//main-logo-jaedam.svg
import MainLogoJaedam from '@/assets/icons/main-logo-jaedam.svg';
//main-logo-marketoon.png
import MainLogoMarketoon from '@/assets/icons/main-logo-marketoon.png';
//main-logo-omg.svg
import MainLogoOmg from '@/assets/icons/main-logo-omg.svg';
//main-logo-qtizz.png
import MainLogoQtizz from '@/assets/icons/main-logo-qtizz.png';
//main-logo-shortz.svg
import MainLogoShortz from '@/assets/icons/main-logo-shortz.svg';

interface AboutSectionProps {
  className?: string;
}

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

export function AboutSection({ className }: AboutSectionProps) {
  const ref = useRef(null);
  const deviceType = useDeviceType();
  const displayedNews = deviceType === 'mobile' ? newsList.slice(0, 3) : newsList;

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
        {displayedNews.map(item => (
          <CardContainer key={item.id + item.category}>
            <Badge>{item.category}</Badge>
            <CardTitle>{item.title}</CardTitle>
            <CardDate>{formatDate(item.noticedAt)}</CardDate>
          </CardContainer>
        ))}
      </CardArea>
      <LogoLineWrapper>
        <LogoLineTitle>Partners</LogoLineTitle>
        <LogoLineImage
          src={MainLogoJaedamStudioDam.src}
          alt='Jaedam Studio Dam'
        />
        <LogoLineImage
          src={MainLogoJaedam.src}
          alt='Jaedam'
        />
        <LogoLineImage
          src={MainLogoMarketoon.src}
          alt='Marketoon'
        />
        <LogoLineImage
          src={MainLogoOmg.src}
          alt='OMG'
        />
        <LogoLineImage
          src={MainLogoQtizz.src}
          alt='Qtizz'
        />
        <LogoLineImage
          src={MainLogoShortz.src}
          alt='Shortz'
        />
      </LogoLineWrapper>
    </Wrapper>
  );
}

const Wrapper = styled.section`
  display: flex;
  align-items: center;
  padding: 0px 64px;
  margin: 0 auto;
  height: 100%;
  flex-direction: row;

  justify-content: center;
  @media (max-width: 1279px) and (min-width: 800px) {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    align-items: flex-start;
    gap: ${spacing['4XL']};
  }

  @media (max-width: 799px) {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    gap: ${spacing['3XL']};
  }
`;

const TextArea = styled.div`
  flex-shrink: 0;

  @media (min-width: 800px) {
    margin-bottom: 0;
    margin-right: 60px;
  }
`;

const Title = styled.h2`
  ${typography['display2-bold']};
  color: ${colors.gray900};
  margin-bottom: ${spacing.XL};
  @media (max-width: 1279px) and (min-width: 800px) {
    margin-bottom: ${spacing.M};
  }

  @media (max-width: 799px) {
    margin-bottom: ${spacing.S};
  }
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
    gap: ${spacing.L};
  }

  @media (max-width: 1279px) and (min-width: 800px) {
    grid-template-columns: repeat(2, 1fr);
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
  box-shadow: ${shadow.s300};
  padding: ${spacing.XL};
  gap: ${spacing.L};
  width: 100%;

  @media (max-width: 799px) {
    padding: ${spacing.M};
  }
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

const LogoLineWrapper = styled.section`
  width: 100%;
  padding: ${spacing.XL} ${spacing.L};
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
`;

const LogoLineTitle = styled.h2`
  font-size: 24px;
  font-weight: 700;
  margin-bottom: ${spacing.M};
`;

const LogoLineImage = styled.img`
  max-width: 100%;
  height: auto;
  object-fit: contain;
`;
