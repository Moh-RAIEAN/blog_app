/* eslint-disable no-unused-vars */
import { Model } from 'mongoose';
import { TUserRoles } from '../../interface/commontTypes';

export type TUser = {
  name: string;
  email: string;
  password: string;
  role: TUserRoles;
  isBlocked: boolean;
};

export type TUserMethods = {
  selectFields: (fields: (keyof TUser)[]) => Partial<TUser>;
};

export type TUserModel = Model<TUser, Record<string, unknown>, TUserMethods>;
