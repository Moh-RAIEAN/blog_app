"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_status_codes_1 = require("http-status-codes");
const mongoose_1 = require("mongoose");
const app_1 = __importDefault(require("./app"));
const config_1 = __importDefault(require("./app/config"));
const port = (0, config_1.default)('port');
const databaseUrl = (0, config_1.default)('databaseUrl');
let server;
function startServer() {
    return __awaiter(this, void 0, void 0, function* () {
        yield (0, mongoose_1.connect)(databaseUrl);
        server = app_1.default.listen(port, () => console.log({
            status: http_status_codes_1.StatusCodes.OK,
            message: `🟢 server is running on:- ${port} port ^_^`,
            url: `check:-http://localhost:${port}`,
        }));
    });
}
startServer().catch((err) => console.log(err));
process.on('unhandledRejection', (error) => {
    console.log({
        status: http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR,
        message: 'Oop, error detected!',
    });
    console.log(error);
    console.log('🔴 unhandledRejection detected X_X, closing server....');
    if (server) {
        server.close();
        process.exit(1);
    }
    process.exit(1);
});
process.on('uncaughtException', (error) => {
    console.log({
        status: http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR,
        message: 'Oop, error detected!',
    });
    console.log(error);
    console.log('🔴 uncaughtException detected X_X, closing server....');
    process.exit(1);
});
