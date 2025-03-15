import mongoose_delete from 'mongoose-delete';
import { Schema, models, model } from 'mongoose';

const schema = new Schema(
  {
    parentId: { type: Schema.Types.ObjectId, ref: "Category" },
    title: String,
    slug: String,
    content: String,
    visibility: Boolean,
  },
  {
    timestamps: true,
  }
);

schema.plugin(mongoose_delete, { deletedAt : true, overrideMethods: true });

module.exports = models?.Category || model('Category', schema, 'categories');
