import mongoose, { type InferSchemaType } from "mongoose";
import { TOKEN_TYPES } from "../../constants";

const tokenSchema = new mongoose.Schema(
  {
    token: {
      type: String,
      required: true,
      unique: true,
    },
    type: {
      type: String,
      enum: Object.values(TOKEN_TYPES),
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export type IToken = InferSchemaType<typeof tokenSchema>;

export default mongoose.model<IToken>("Token", tokenSchema);
