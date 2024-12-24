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
const express_1 = require("express");
const catchAsync_1 = __importDefault(require("../utils/catchAsync"));
const apiRoutes_1 = __importDefault(require("./apiRoutes"));
const serverApiRoutes = (0, express_1.Router)();
serverApiRoutes.get('/', (0, catchAsync_1.default)((_, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.json({ ok: true });
})));
apiRoutes_1.default.forEach((route) => serverApiRoutes.use(`/api${route.path}`, route.route));
exports.default = serverApiRoutes;
