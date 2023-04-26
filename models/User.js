const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      unique: true,
      sparse: true,
    },
    email: {
      type: String,
      unique: true,
      sparse: true,
    },
    password: {
      type: String,
    },
    role: {
      type: String,
      default: "User",
    },
    image: {
      type: String,
      default: "../assets/img/icons/avatar.svg",
    },
    listings: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "PGs",
    },
    gender: {
      type: String,
      default: "Rather Not Say",
    },
    occupation: {
      type: String,
      default: "Student",
    },
    college: {
      type: String,
    },
    degree: {
      type: String,
    },
    semester: {
      type: Number,
    },
    company: {
      type: String,
    },
    job: {
      type: String,
    },
    bloodGroup: {
      type: String,
    },
    emergencyContact: {
      type: String,
    },
    allergies: {
      type: String,
    },
  },
  { timestamps: true }
);

export default mongoose.models.User || mongoose.model("User", UserSchema);
