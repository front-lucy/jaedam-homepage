export * as border from "./border";
export * as radius from "./radius";
export * as shadow from "./shadow";
export { colors };
import * as colors from "./colors";
export type ColorType = keyof typeof colors;

import { typography } from "./typography";

export { typography };

export type TypographyType = keyof typeof typography;
