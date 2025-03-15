import mongoose_delete from 'mongoose-delete';
import { Schema, models, model } from 'mongoose';

const schema = new Schema(
  {
    postId: { type: Schema.Types.ObjectId, ref: "Post" },
    parentId: { type: Schema.Types.ObjectId, ref: "Comment" },
    userId: { type: Schema.Types.ObjectId, ref: "User" },
    content: String,
    upvoteCount: Number,
    downvoteCount: Number,
    visibility: Boolean,
  },
  {
    timestamps: true,
  }
);

schema.plugin(mongoose_delete, { deletedAt : true, overrideMethods: true });

module.exports = models?.Comment || model('Comment', schema, 'comments');
