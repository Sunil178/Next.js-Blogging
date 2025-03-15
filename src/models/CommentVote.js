import mongoose_delete from 'mongoose-delete';
import { Schema, models, model } from 'mongoose';

const schema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User" },
    commentId: { type: Schema.Types.ObjectId, ref: "Comment" },
    type: Boolean,                                                  //  true: liked / up, false: unliked / down
  },
  {
    timestamps: true,
  }
);

schema.plugin(mongoose_delete, { deletedAt : true, overrideMethods: true });

module.exports = models?.CommentVote || model('CommentVote', schema, 'comment_votes');
