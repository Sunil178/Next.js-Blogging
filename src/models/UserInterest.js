import mongoose_delete from 'mongoose-delete';
import { Schema, models, model } from 'mongoose';

const schema = new Schema(
  {
    tempUserId: { type: Schema.Types.ObjectId, ref: "TempUser" },
    userId: { type: Schema.Types.ObjectId, ref: "User" },
    postId: { type: Schema.Types.ObjectId, ref: "Post" },
  },
  {
    timestamps: true,
  }
);

schema.plugin(mongoose_delete, { deletedAt : true, overrideMethods: true });

module.exports = models?.UserInterest || model('UserInterest', schema, 'user_interests');
