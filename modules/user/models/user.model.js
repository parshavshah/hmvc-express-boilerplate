const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = mongoose.Types.ObjectId;

const userSchema = new Schema(
  {
    firstName: String,
    lastName: String,
    email: String,
    phone: String,
    role: {
      type: ObjectId,
      ref: "Role",
      required: true,
    },
    status: {
      type: Boolean,
      required: false,
      default: true,
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

module.exports = mongoose.model("User", userSchema);
