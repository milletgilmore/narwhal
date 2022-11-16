const mongoose = require("mongoose");

const UpdateSchema = new mongoose.Schema({
  description: {
    type: String,
    required: true,
  },
  media: {
    type: String,
    require: true,
  },
  cloudinaryId: {
    type: String,
    require: true,
  },
  links:{
    type: String,
    require: true,
  },
  likes: {
    type: Number,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
 
});

//MongoDB Collection named here - will give lowercase plural of name 
module.exports = mongoose.model("Update", UpdateSchema);
