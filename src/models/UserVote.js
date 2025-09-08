import mongooseDelete from 'mongoose-delete';
import { Schema, models, model } from 'mongoose';

const schema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User" },
    votingUserId: { type: Schema.Types.ObjectId, ref: "User" },
    type: Boolean,                                                  //  true: liked / up, false: unliked / down
  },
  {
    timestamps: true,
  }
);

schema.plugin(mongooseDelete, { deletedAt : true, overrideMethods: true });

module.exports = models?.UserVote || model('UserVote', schema, 'user_votes');
