import mongoose_delete from 'mongoose-delete';
import { Schema, models, model } from 'mongoose';

const schema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User" },
    parentId: { type: Schema.Types.ObjectId, ref: "Post" },
    categoryId: { type: Schema.Types.ObjectId, ref: "Category" },
    slug: String,
    title: String,
    titleDescription: String,
    tags: Array,
    bannerImage: String,
    content: String,
    summary: String,
    upvoteCount: {
      type: Number,
      default: 0,
    },
    downvoteCount: {
      type: Number,
      default: 0,
    },
    commentCount: {
      type: Number,
      default: 0,
    },
    visibility: {
      type: Boolean,
      default: false,
    },
    published: {
      type: Boolean,
      default: false,
    },
    publishedAt: Date,
    visitorCount: {
      type: Number,
      default: 0,
    },
    approval: {
      type: Number,
      enum: [
        1,            // pending
        2,            // approved
        3,            // rejected
        4             // inactive
      ],
    },
    approvedAt: Date,
  },
  {
    timestamps: true,
  }
);

schema.plugin(mongoose_delete, { deletedAt : true, overrideMethods: true });

export default models?.Post || model('Post', schema, 'posts');
