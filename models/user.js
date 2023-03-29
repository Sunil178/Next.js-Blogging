import mongoose_delete from 'mongoose-delete';
import mongoose from 'mongoose'

const schema = new mongoose.Schema(
  {
    tempUserId: { type: mongoose.Schema.Types.ObjectId, ref: "TempUser" },
    firstName: String,
    middleName: String,
    lastName: String,
    mobile: String,
    email: String,
    passwordHash: String,
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

module.exports = mongoose.models?.User || mongoose.model('User', schema, 'users');
