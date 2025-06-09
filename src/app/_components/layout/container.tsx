import styled from '@emotion/styled';
import { SerializedStyles } from '@emotion/react';

export const CommonContainer = styled.div<{ css?: SerializedStyles}>`
  display: flex;
  flex-direction: column;
  align-items: center;
  align-self: stretch;
  width: 100%;
  flex: 1;
  margin: 0 auto;
  
  padding: calc(80px + 64px) 40px 128px 40px; // 80px: Header height, 64px: real padding top
  gap: 48px;

  @media (max-width: 1279px) {
    padding: calc(64px + 48px) 24px 128px 24px; // 64px: Header height, 48px: real padding top
    gap: 32px;
  }
  
  ${({ css }) => css && css}
`