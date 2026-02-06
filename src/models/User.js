import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    chatId: {
      type: String,
      required: true,
      unique: true,
      index: true
    },

    isEnabled: {
      type: Boolean,
      default: true
    },

    frequency: {
      type: Number, // minutes
      default: 1,
      min: 1
    },

    lastSentAt: {
      type: Date,
      default: null
    }
  },
  {
    timestamps: true
  }
);

const User = mongoose.model("User", userSchema);
export default User;
