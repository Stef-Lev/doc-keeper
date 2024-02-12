import { Schema, model, models } from "mongoose";

const ContentSchema = new Schema(
  {
    blocks: { type: Schema.Types.Mixed, required: true },
    entityMap: { type: Schema.Types.Array, required: true },
  },
  {
    minimize: false,
  }
);

const DocSchema = new Schema(
  {
    content: { type: ContentSchema, required: true },
    isFavourite: { type: Boolean, default: false },
    user: { type: Schema.Types.ObjectId, ref: "User" },
  },
  {
    timestamps: true,
    minimize: false,
  }
);

const Doc = models.Doc || model("Doc", DocSchema);
export default Doc;
