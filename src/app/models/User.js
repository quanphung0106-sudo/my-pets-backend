const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
    isAdmin: {
      type: Boolean,
      default: false,
    },
    username: {
      type: String,
      max: 30,
      unique: true,
    },
    email: {
      type: String,
      max: 50,
      unique: true,
    },
    password: {
      type: String,
    },
    photos: {
      type: String,
    },
    activeAccount: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.models.User || mongoose.model('User', UserSchema);
