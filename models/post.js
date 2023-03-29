import mongoose_delete from 'mongoose-delete';
import mongoose from 'mongoose'

const schema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    parentId: { type: mongoose.Schema.Types.ObjectId, ref: "Post" },
    categoryId: { type: mongoose.Schema.Types.ObjectId, ref: "Category" },
    slug: String,
    title: String,
    metaTitle: String,
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

module.exports = mongoose.models?.Post || mongoose.model('Post', schema, 'posts');
