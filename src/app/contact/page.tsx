'use client';
import MailIcon from '@/assets/icons/Icon-mail-fill.svg';
import { Footer } from '@/components/molecules/footer';
import { Header } from '@/components/molecules/header';
import { colors, spacing, typography } from '@/tokens';
import styled from '@emotion/styled';
import { contactItems } from './contact.variants';

export default function ContactPage() {
  return (
    <>
      <Header
        pageType='sub'
        mode='light'
      />
      <Wrapper>
        <Title>CONTACT</Title>
        <SubTitle>사업 제휴</SubTitle>
        <Description>재담과 함께할 수 있는 다양한 제안을 기다립니다.</Description>
        <RowContainer>
          {contactItems.map(({ title, description, emails }, index) => (
            <RowWrapper
              key={title}
              isFirst={index === 0}
            >
              <RowTitle>{title}</RowTitle>
              <ContentBox>
                <RowDescription>{description}</RowDescription>
                <EmailList>
                  {emails.map(email => (
                    <Email
                      href={`mailto:${email}`}
                      key={email}
                    >
                      <MailIcon />
                      <span>{email}</span>
                    </Email>
                  ))}
                </EmailList>
              </ContentBox>
            </RowWrapper>
          ))}
        </RowContainer>
      </Wrapper>
      <Footer />
    </>
  );
}

const Wrapper = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  padding: ${spacing['6XL']} 0;
  gap: ${spacing['4XL']};
  margin: 0 auto;

  @media (min-width: 800px) and (max-width: 1279px) {
    /* padding: ${spacing['4XL']} ${spacing.XL}; */
    gap: ${spacing['3XL']};
  }

  @media (max-width: 799px) {
    /* padding: ${spacing.XL}; */
    gap: ${spacing['2XL']};
  }
`;
const Title = styled.h2`
  ${typography['display2-bold']};
  color: ${colors.gray900};
  text-align: center;
  @media (max-width: 799px) {
    ${typography['headline3-bold']};
  }
`;

const SubTitle = styled.h3`
  ${typography['headline3-bold']};
  color: ${colors.black};
  text-align: center;
  margin-top: ${spacing['4XL']};
  @media (max-width: 799px) {
    margin-top: ${spacing['2XL']};
  }
`;

const Description = styled.p`
  ${typography['title3-regular']};
  color: ${colors.black};
  text-align: center;
`;

const RowContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  margin-top: ${spacing['4XL']};
  @media (max-width: 799px) {
    margin-top: ${spacing['2XL']};
  }
`;

const RowWrapper = styled.div<{ isFirst?: boolean }>`
  display: flex;
  align-items: flex-start;
  padding: ${spacing['4XL']} ${spacing.XL};
  gap: ${spacing['3XL']};
  background-color: ${colors.white};
  border-bottom: 1px solid ${colors.gray200};
  ${({ isFirst }) => isFirst && `border-top: 1px solid ${colors.gray200};`}
  max-width: 1000px;
  width: 100%;

  @media (max-width: 799px) {
    flex-direction: column;
    gap: ${spacing.L};
    padding: ${spacing['2XL']} ${spacing.M};
  }

  @media (min-width: 800px) and (max-width: 1279px) {
    padding: ${spacing['4XL']} ${spacing.XL};
    gap: ${spacing['3XL']};
  }
`;

const RowTitle = styled.div`
  ${typography['title2-bold']};
  color: ${colors.black};
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  flex-shrink: 0;
  min-width: 240px;

  @media (max-width: 799px) {
    ${typography['body-bold']};
  }

  @media (min-width: 800px) and (max-width: 1279px) {
    ${typography['title2-bold']};
    min-width: 200px;
  }
`;

const RowDescription = styled.div`
  ${typography['title3-regular']};
  color: ${colors.black};
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  flex: 1;

  @media (max-width: 799px) {
    white-space: normal;
    ${typography['body-regular']};
  }

  @media (min-width: 800px) and (max-width: 1279px) {
    ${typography['title3-regular']};
  }
`;

const EmailList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${spacing.M};
  justify-content: flex-end;

  @media (max-width: 799px) {
    justify-content: flex-start;
  }

  @media (min-width: 800px) and (max-width: 1279px) {
    justify-content: flex-end;
  }
`;

const Email = styled.a`
  ${typography['caption1-regular']};
  color: ${colors.black};
  text-decoration: underline;
  text-underline-offset: auto;
  text-decoration-thickness: auto;
  display: inline-flex;
  align-items: center;
  gap: ${spacing['2XS']};

  svg {
    width: 16px;
    height: 16px;
    color: ${colors.jaedamCyan};
  }

  @media (min-width: 800px) and (max-width: 1279px) {
    ${typography['caption1-regular']};
  }
`;

const ContentBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: ${spacing['XL']};

  @media (min-width: 800px) and (max-width: 1279px) {
    gap: ${spacing['XL']};
  }
`;
