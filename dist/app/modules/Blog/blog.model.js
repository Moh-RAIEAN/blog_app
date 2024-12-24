"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const constants_1 = require("../../constants");
const blogSchema = new mongoose_1.Schema({
    title: {
        type: String,
        required: [true, (0, constants_1.generateMessate)('requiredError', 'title')],
    },
    content: {
        type: String,
        required: [true, (0, constants_1.generateMessate)('requiredError', 'content')],
    },
    author: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, (0, constants_1.generateMessate)('requiredError', 'author')],
    },
    isPublished: {
        type: Boolean,
        default: true,
    },
}, {
    timestamps: true,
    versionKey: false,
});
blogSchema.set('toJSON', {
    transform: (_, ret) => {
        delete ret.isPublished;
        delete ret.createdAt;
        delete ret.updatedAt;
        delete ret.__v;
        return ret;
    },
});
const Blog = (0, mongoose_1.model)('Blog', blogSchema);
exports.default = Blog;
