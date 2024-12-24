import dotenv from 'dotenv';
import path from 'node:path';
import { TconfigOptions } from './configTypes';

dotenv.config({ path: path.join(process.cwd(), '.env') });

const configOptions: TconfigOptions = {
  port: Number(process.env.PORT) || 5000,
  env: `${process.env.NODE_ENV}` || 'development',
  databaseUrl: `${process.env.DATABASE_URL}`,
  defaultPassword: `${process.env.DEFAULT_PASSWORD}`,
  bcryptSaltRounds: Number(process.env.BCRYPT_SALT_ROUNDS),
  jwtAccessTokenSecret: `${process.env.JWT_ACCESS_TOKEN_SECRET}`,
  jwtRegreshTokenSecret: `${process.env.JWT_REFRESH_TOKEN_SECRET}`,
  jwtAccessTokenExpiresIn: `${process.env.JWT_ACCESS_TOKEN_EXPIRES_IN}`,
  jwtRefreshTokenExpiresIn: `${process.env.JWT_REFRESH_TOKEN_EXPIRES_IN}`,
  getConfigOption: (option) => configOptions[option],
};

export default configOptions.getConfigOption;
