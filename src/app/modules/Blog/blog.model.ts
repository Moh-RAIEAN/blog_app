import { model, Schema } from 'mongoose';
import { generateMessate } from '../../constants';
import { TBlog } from './blog.interface';

const blogSchema = new Schema<TBlog>(
  {
    title: {
      type: String,
      required: [true, generateMessate('requiredError', 'title')],
    },
    content: {
      type: String,
      required: [true, generateMessate('requiredError', 'content')],
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: [true, generateMessate('requiredError', 'author')],
    },
    isPublished: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

blogSchema.set('toJSON', {
  transform: (_, ret) => {
    delete ret.isPublished;
    delete ret.createdAt;
    delete ret.updatedAt;
    delete ret.__v;
    return ret;
  },
});

const Blog = model<TBlog>('Blog', blogSchema);

export default Blog;
