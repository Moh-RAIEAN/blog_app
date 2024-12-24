/* eslint-disable no-unused-vars */
export type TGetConfigOptionFn<T> = <K extends keyof T>(option: K) => T[K];

export type TconfigOptions = {
  readonly port: number;
  readonly env: string;
  readonly databaseUrl: string;
  readonly defaultPassword: string;
  readonly bcryptSaltRounds: number;
  readonly jwtAccessTokenSecret: string;
  readonly jwtRegreshTokenSecret: string;
  readonly jwtAccessTokenExpiresIn: string;
  readonly jwtRefreshTokenExpiresIn: string;
  readonly getConfigOption: TGetConfigOptionFn<TconfigOptions>;
};
