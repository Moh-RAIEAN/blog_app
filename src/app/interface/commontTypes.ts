import { USER_ROLES_LIST } from '../constants';

export type TUserRoles = (typeof USER_ROLES_LIST)[number];

export type TUserName = {
  firstName: string;
  middleName: string;
  lastName: string;
};
