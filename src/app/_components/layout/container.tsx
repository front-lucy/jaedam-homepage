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
  
  padding: calc(64px + 80px) 40px 128px 40px;
  gap: 48px;

  @media (max-width: 1279px) {
    padding: calc(64px + 64px) 24px 128px 24px;
    gap: 32px;
  }
  
  ${({ css }) => css && css}
`