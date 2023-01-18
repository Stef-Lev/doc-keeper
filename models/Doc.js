import mongoose from "mongoose";

const DocSchema = new mongoose.Schema(
  {
    content: { type: Schema.Types.Mixed, required: true },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Doc || mongoose.model("Doc", DocSchema);
