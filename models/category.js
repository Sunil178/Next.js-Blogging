import mongoose_delete from 'mongoose-delete';
import mongoose from 'mongoose'

const schema = new mongoose.Schema(
  {
    parentId: { type: mongoose.Schema.Types.ObjectId, ref: "Category" },
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

module.exports = mongoose.models?.Category || mongoose.model('Category', schema, 'categories');
