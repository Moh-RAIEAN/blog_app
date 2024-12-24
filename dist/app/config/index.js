"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const node_path_1 = __importDefault(require("node:path"));
dotenv_1.default.config({ path: node_path_1.default.join(process.cwd(), '.env') });
const configOptions = {
    port: Number(process.env.PORT) || 5000,
    env: `${process.env.NODE_ENV}` || 'development',
    databaseUrl: `${process.env.DATABASE_URL}`,
    defaultPassword: `${process.env.DEFAULT_PASSWORD}`,
    bcryptSaltRounds: Number(process.env.BCRYPT_SALT_ROUNDS),
    jwtAccessTokenSecret: `${process.env.JWT_ACCESS_TOKEN_SECRET}`,
    jwtRegreshTokenSecret: `${process.env.JWT_REFRESH_TOKEN_SECRET}`,
    jwtAccessTokenExpiresIn: `${process.env.JWT_ACCESS_TOKEN_EXPIRES_IS}`,
    jwtRefreshTokenExpiresIn: `${process.env.JWT_REFRESH_TOKEN_EXPIRES_IN}`,
    getConfigOption: (option) => configOptions[option],
};
exports.default = configOptions.getConfigOption;
