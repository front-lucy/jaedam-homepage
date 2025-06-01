import * as border from './border';
import * as colors from './colors';
import * as radius from './radius';
import * as shadow from './shadow';
import { spacing } from './spacing';
import { typography } from './typography';

export { border, colors, radius, shadow, typography, spacing };

export type ColorType = keyof typeof colors;
export type TypographyType = keyof typeof typography;
export type SpacingType = keyof typeof spacing;
export type BorderType = keyof typeof border;
export type RadiusType = keyof typeof radius;
export type ShadowType = keyof typeof shadow;
