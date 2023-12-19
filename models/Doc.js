import { Schema, model, models } from "mongoose";

const DocSchema = new Schema(
  {
    content: { type: Schema.Types.Mixed, required: true },
  },
  {
    timestamps: true,
  }
);

const Doc = models.Doc || model("Doc", DocSchema);
export default Doc;
