import { TGenerateErrorMessageFn } from './types';
export const USER_ROLES = {
  admin: 'admin',
  user: 'user',
} as const;

export const USER_ROLES_LIST = Object.keys(
  USER_ROLES,
) as (keyof typeof USER_ROLES)[];

export const excludeFieldsFromFilterQuery = [
  'searchTerm',
  'sort',
  'page',
  'skip',
  'limit',
  'fields',
];

export const generateMessate: TGenerateErrorMessageFn = (
  type,
  path,
  options,
) => {
  switch (type) {
    case 'requiredError':
      return `${path} is required`;
    case 'minLengthError':
      return `${path} must be minimum ${options?.length} characters long`;
    case 'maxLengthError':
      return `${path} can not be more than ${options?.length} characters`;
    case 'enumTypeError':
      return `expected \`${options?.enums?.join('|')}\` but received ${options?.value}`;
    case 'createdMessage':
      return `${path} registered successfully`;
    case 'loginMessage':
      return `${path}Login successful`;
  }
};
