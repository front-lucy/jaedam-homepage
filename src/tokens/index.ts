import * as border from "./border";
import * as colors from "./colors";
import * as radius from "./radius";
import * as shadow from "./shadow";
import { typography } from "./typography";

export { spacing } from "./spacing";
export type { SpacingToken } from "./spacing";

export { border, colors, radius, shadow, typography };

export type ColorToken = keyof typeof colors;
export type TypographyToken = keyof typeof typography;
export type BorderToken = keyof typeof border;
export type RadiusToken = keyof typeof radius;
export type ShadowToken = keyof typeof shadow;
