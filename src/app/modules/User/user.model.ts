import bcrypt from 'bcrypt';
import { CallbackError, model, Schema } from 'mongoose';
import getConfigOption from '../../config';
import { generateMessate, USER_ROLES, USER_ROLES_LIST } from '../../constants';
import { TUser, TUserMethods, TUserModel } from './user.interface';

const userSchema = new Schema<TUser, TUserModel, TUserMethods>(
  {
    name: {
      type: String,
      required: [true, generateMessate('requiredError', 'name')],
    },
    email: {
      type: String,
      required: [true, generateMessate('requiredError', 'email')],
      unique: true,
    },
    password: {
      type: String,
      required: [true, generateMessate('requiredError', 'password')],
      select: 0,
    },
    role: {
      type: String,
      enum: {
        values: USER_ROLES_LIST,
        message: generateMessate('enumTypeError', 'role', {
          enums: [...USER_ROLES_LIST],
          value: '{VALUE}',
        }),
      },
      default: USER_ROLES.user,
    },
    isBlocked: {
      type: Boolean,
      required: [true, generateMessate('requiredError', 'isBlocked')],
      default: false,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

userSchema.pre('save', async function (next) {
  const user = this;
  const stringPassword = user.password;
  try {
    const hashedPassword = await bcrypt.hash(
      stringPassword,
      getConfigOption('bcryptSaltRounds'),
    );
    user.password = hashedPassword;
    next();
  } catch (error) {
    next(error as CallbackError);
  }
});

userSchema.methods = {
  selectFields: function (fields) {
    let selecdtFields: Partial<TUser> = {};
    fields.forEach(
      (field) => (selecdtFields = { ...selecdtFields, [field]: this[field] }),
    );
    return selecdtFields;
  },
};

userSchema.set('toJSON', {
  transform: (_, ret) => {
    delete ret.__v;
    return ret;
  },
});

const User = model<TUser, TUserModel>('User', userSchema);

export default User;
