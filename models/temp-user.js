import mongoose_delete from 'mongoose-delete';
import mongoose from 'mongoose'

const schema = new mongoose.Schema(
  {
    avatar: String,
    visitorId: String,                          // fingerprint.js id
  },
  {
    timestamps: true,
  }
);

schema.plugin(mongoose_delete, { deletedAt : true, overrideMethods: true });

module.exports = mongoose.models?.TempUser || mongoose.model('TempUser', schema, 'temp_users');
