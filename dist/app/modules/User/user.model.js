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
const bcrypt_1 = __importDefault(require("bcrypt"));
const mongoose_1 = require("mongoose");
const config_1 = __importDefault(require("../../config"));
const constants_1 = require("../../constants");
const userSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: [true, (0, constants_1.generateMessate)('requiredError', 'name')],
    },
    email: {
        type: String,
        required: [true, (0, constants_1.generateMessate)('requiredError', 'email')],
        unique: true,
    },
    password: {
        type: String,
        required: [true, (0, constants_1.generateMessate)('requiredError', 'password')],
        select: 0,
    },
    role: {
        type: String,
        enum: {
            values: constants_1.USER_ROLES_LIST,
            message: (0, constants_1.generateMessate)('enumTypeError', 'role', {
                enums: [...constants_1.USER_ROLES_LIST],
                value: '{VALUE}',
            }),
        },
        default: constants_1.USER_ROLES.user,
    },
    isBlocked: {
        type: Boolean,
        required: [true, (0, constants_1.generateMessate)('requiredError', 'isBlocked')],
        default: false,
    },
}, {
    timestamps: true,
    versionKey: false,
});
userSchema.pre('save', function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = this;
        const stringPassword = user.password;
        try {
            const hashedPassword = yield bcrypt_1.default.hash(stringPassword, (0, config_1.default)('bcryptSaltRounds'));
            user.password = hashedPassword;
            next();
        }
        catch (error) {
            next(error);
        }
    });
});
userSchema.methods = {
    selectFields: function (fields) {
        let selecdtFields = {};
        fields.forEach((field) => (selecdtFields = Object.assign(Object.assign({}, selecdtFields), { [field]: this[field] })));
        return selecdtFields;
    },
};
userSchema.set('toJSON', {
    transform: (_, ret) => {
        delete ret.__v;
        return ret;
    },
});
const User = (0, mongoose_1.model)('User', userSchema);
exports.default = User;
