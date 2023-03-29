import mongoose_delete from 'mongoose-delete';
import mongoose from 'mongoose'

const schema = new mongoose.Schema(
  {
    tempUserId: { type: mongoose.Schema.Types.ObjectId, ref: "TempUser" },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    postId: { type: mongoose.Schema.Types.ObjectId, ref: "Post" },
  },
  {
    timestamps: true,
  }
);

schema.plugin(mongoose_delete, { deletedAt : true, overrideMethods: true });

module.exports = mongoose.models?.UserInterest || mongoose.model('UserInterest', schema, 'user_interests');
