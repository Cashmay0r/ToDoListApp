import mongoose from "mongoose";
const { Schema } = mongoose;

const listSchema = new Schema(
  {
    itemNo: {
      type: Number,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    checked: {
      type: Boolean,
      required: true,
    },
  },
  { timestamps: true }
);

export const List = mongoose.model("list-items", listSchema);
