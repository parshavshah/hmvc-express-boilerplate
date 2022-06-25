const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const blueprintSchema = new Schema(
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

module.exports = mongoose.model("Blueprint", blueprintSchema);
