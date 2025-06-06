/** @jsxImportSource @emotion/react */
'use client';

import MailIcon from '@/assets/icons/Icon-mail-fill.svg';
import { colors, spacing, typography } from '@/tokens';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import { contactItems } from './contact.variants';

const fadeUpVariant = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.2,
      ease: 'easeInOut',
    },
  }),
};

const simpleFadeUp = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.3, ease: 'easeInOut' },
  },
};

export default function ContactPage() {
  return (
    <StyledContainer>
      <motion.h2
        css={titleStyle}
        variants={simpleFadeUp}
        initial='hidden'
        whileInView='visible'
        viewport={{ once: true, amount: 0.2 }}
      >
        CONTACT
      </motion.h2>

      <motion.h3
        css={subTitleStyle}
        variants={simpleFadeUp}
        initial='hidden'
        whileInView='visible'
        viewport={{ once: true, amount: 0.2 }}
      >
        사업 제휴
      </motion.h3>

      <motion.p
        css={descriptionStyle}
        variants={simpleFadeUp}
        initial='hidden'
        whileInView='visible'
        viewport={{ once: true, amount: 0.2 }}
      >
        재담과 함께할 수 있는 다양한 제안을 기다립니다.
      </motion.p>

      <motion.div
        css={rowContainerStyle}
        variants={simpleFadeUp}
        initial='hidden'
        whileInView='visible'
        viewport={{ once: true, amount: 0.3 }}
      >
        {contactItems.map(({ title, description, emails }, index) => (
          <motion.div
            key={title}
            css={[rowWrapperBase, index === 0 && rowWrapperWithTopBorder]}
            variants={fadeUpVariant}
            initial='hidden'
            whileInView='visible'
            viewport={{ once: true, amount: 0.2 }}
            custom={index}
          >
            <RowTitle>{title}</RowTitle>
            <ContentBox>
              <RowDescription>{description}</RowDescription>
              <EmailList>
                {emails.map(email => (
                  <Email
                    key={email}
                    href={`mailto:${email}`}
                  >
                    <MailIcon />
                    <span>{email}</span>
                  </Email>
                ))}
              </EmailList>
            </ContentBox>
          </motion.div>
        ))}
      </motion.div>
    </StyledContainer>
  );
}

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 0 140px;
  gap: ${spacing['4XL']};
`

const titleStyle = css`
  ${typography['display2-bold']};
  color: ${colors.gray900};
  text-align: center;
  @media (max-width: 799px) {
    ${typography['headline3-bold']};
  }
`;

const subTitleStyle = css`
  ${typography['headline3-bold']};
  color: ${colors.black};
  text-align: center;
  margin-top: ${spacing['4XL']};
  @media (max-width: 799px) {
    margin-top: ${spacing['2XL']};
  }
`;

const descriptionStyle = css`
  ${typography['title3-regular']};
  color: ${colors.black};
  text-align: center;
`;

const rowContainerStyle = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  margin-top: ${spacing['4XL']};

  @media (max-width: 799px) {
    margin-top: ${spacing['2XL']};
  }
`;

const rowWrapperBase = css`
  display: flex;
  align-items: flex-start;
  padding: ${spacing['4XL']} ${spacing.XL};
  gap: ${spacing['3XL']};
  background-color: ${colors.white};
  border-bottom: 1px solid ${colors.gray200};
  max-width: 1000px;
  width: 100%;

  @media (max-width: 799px) {
    flex-direction: column;
    gap: ${spacing.L};
    padding: ${spacing['2XL']} ${spacing.M};
  }
`;

const rowWrapperWithTopBorder = css`
  border-top: 1px solid ${colors.gray200};
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
`;

const EmailList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${spacing.M};
  justify-content: flex-end;

  @media (max-width: 799px) {
    justify-content: flex-start;
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
`;

const ContentBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: ${spacing['XL']};
  width: 100%;
`;
