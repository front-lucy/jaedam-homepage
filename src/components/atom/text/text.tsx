import styled from '@emotion/styled';
import { ElementType, forwardRef } from 'react';

import { typography as $typography, colors } from '@/tokens';

import type { TextProps } from './text.types';


export const Text = forwardRef<HTMLElement, TextProps<ElementType>>(
  ({ className, as, color, typography, children, lineLimit, align, ...props }, ref) => (
    <StyledText
      ref={ref}
      className={className}
      as={as}
      color={color || "black"}
      typography={typography}
      lineLimit={lineLimit}
      align={align}
      {...props}
    >
      {children}
    </StyledText>
  ),
);

Text.displayName = 'Text';

const StyledText = styled.span<
  Required<Pick<TextProps<ElementType>, 'color' | 'typography'>> & Pick<TextProps<ElementType>, 'align' | 'lineLimit'>
>`
  display: inline-block;
  ${({ typography }) => $typography[typography]};

  color: ${({ color }) => colors[color]};
  text-align: ${({ align }) => align};

  ${({ lineLimit }) =>
    lineLimit &&
    `
    display: -webkit-box;
    overflow: hidden;
    text-overflow: ellipsis;
    -webkit-line-clamp: ${lineLimit};
    -webkit-box-orient: vertical;
    word-break: break-all;
  `};
`;
