import type {ElementType, HTMLAttributes, PropsWithChildren} from 'react';

import { ColorType, TypographyType } from '@/tokens';

type TextElementType = ElementType | 'label' | 'span' | 'p' | 'div';

export type TextProps<T extends TextElementType> = PropsWithChildren<{
  as?: T;
  color?: ColorType;
  typography: TypographyType;
  lineLimit?: number;
  align?: 'left' | 'center' | 'right';
} & (T extends 'label' 
  ? React.LabelHTMLAttributes<HTMLLabelElement>
  : HTMLAttributes<HTMLElement>)>;