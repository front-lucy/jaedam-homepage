// src/shared/types/response.ts
export interface ICommonResponseTypeBase {
  success: boolean;
}

export interface ICommonResponseTypeSuccess<T> extends ICommonResponseTypeBase {
  success: true;
  body: T;
}

export interface IErrorResponseBody {
  status: string;
  code: string;
  message: string;
}

export interface ICommonResponseTypeError extends ICommonResponseTypeBase {
  success: false;
  body: IErrorResponseBody;
}

export type ICommonResponseType<T> =
  | ICommonResponseTypeSuccess<T>
  | ICommonResponseTypeError;
