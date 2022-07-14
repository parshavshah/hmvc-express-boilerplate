const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const parshavSchema = new Schema(
  {
    field1: {
      type: String,
      required: true,
    },
    isDeleted: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Parshav", parshavSchema);
