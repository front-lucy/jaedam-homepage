export type ApiWrapped<T> = {
  success: boolean;
  body: T;
};