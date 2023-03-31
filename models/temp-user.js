import mongoose_delete from 'mongoose-delete';
import { Schema, models, model } from 'mongoose';

const schema = new Schema(
  {
    avatar: String,
    visitorId: String,                          // fingerprint.js id
  },
  {
    timestamps: true,
  }
);

schema.plugin(mongoose_delete, { deletedAt : true, overrideMethods: true });

module.exports = models?.TempUser || model('TempUser', schema, 'temp_users');
