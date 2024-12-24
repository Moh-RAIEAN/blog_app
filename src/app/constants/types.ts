/* eslint-disable no-unused-vars */
type TOptions = {
  length?: number;
  enums?: unknown[];
  value?: unknown;
};

export type TGenerateErrorMessageFn = (
  type: TMessageType,
  path: string,
  options?: TOptions,
) => string;

export type TMessageType =
  | 'requiredError'
  | 'minLengthError'
  | 'maxLengthError'
  | 'enumTypeError'
  | 'createdMessage'
  | 'loginMessage';
