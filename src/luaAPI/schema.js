const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
  member: {
    type: String,
  },
  SteamID32: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now()
  }
});

// export model user with UserSchema
module.exports = mongoose.model("user", UserSchema);
