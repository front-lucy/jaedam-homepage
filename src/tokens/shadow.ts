// export const shadow = {
//   shadow100: "0px 1px 4px rgba(0, 0, 0, 0.1)", // 가장 작은 그림자 (칩, 배지 등)
//   shadow200: "0px 1px 8px rgba(0, 0, 0, 0.2)", // 중간 크기 그림자 (버튼 등)
//   shadow300: "0px 4px 24px rgba(0, 0, 0, 0.3)", // 큰 그림자 (카드, 하단 시트 등)
// } as const;

export const s100 = "0px 1px 4px rgba(0, 0, 0, 0.1)";
export const s200 = "0px 1px 8px rgba(0, 0, 0, 0.2)";
export const s300 = "0px 4px 24px rgba(0, 0, 0, 0.3)";

export type ShadowToken = "s100" | "s200" | "s300";
