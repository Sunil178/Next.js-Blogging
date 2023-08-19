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
    upvoteCount: Number,
    downvoteCount: Number,
    commentCount: Number,
    visibility: Boolean,
    published: Boolean,
    publishedAt: Date,
    visitorCount: Number,
    approved: Boolean,
    approvedAt: Date,
  },
  {
    timestamps: true,
  }
);

schema.plugin(mongoose_delete, { deletedAt : true, overrideMethods: true });

module.exports = models?.Post || model('Post', schema, 'posts');
