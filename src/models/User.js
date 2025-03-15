import mongoose_delete from 'mongoose-delete';
import { Schema, models, model } from 'mongoose';

const schema = new Schema(
  {
    tempUserId: { type: Schema.Types.ObjectId, ref: "TempUser" },
    username: String,
    firstName: String,
    middleName: String,
    lastName: String,
    mobile: String,
    email: String,
    password: String,
    avatar: String,
    intro: String,
    profile: String,
    upvoteCount: Number,
    downvoteCount: Number,
    lastLoginAt: Date,
  },
  {
    timestamps: true,
  }
);

schema.plugin(mongoose_delete, { deletedAt : true, overrideMethods: true });

export default models?.User || model('User', schema, 'users');
