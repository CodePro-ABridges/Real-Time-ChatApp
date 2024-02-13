import { Schema, model } from "mongoose";

const MessageSchema = new Schema(
  {
    message: {
      text: { type: String, required: true },
    },
    users: [Schema.Types.ObjectId],
    sender: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

export default model("Messages", MessageSchema);
