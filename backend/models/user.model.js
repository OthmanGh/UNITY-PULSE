import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required"]
  },

  username: {
    // Changed from userName to username
    type: String,
    required: true,
    unique: true
  },

  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, "Provide a valid email"]
  },

  password: {
    type: String,
    required: [true, "Password is required"],
    minlength: 8
  },

  passwordConfirm: {
    type: String,
    required: [true, "Confirm password is required"],
    validate: {
      validator: function(el) {
        return el === this.password;
      },
      message: "Passwords must match"
    }
  },

  profilePicture: {
    type: String,
    default: ""
  },

  role: {
    type: String,
    enum: ["employee", "business owner", "project manager"]
  }
});

userSchema.pre("save", async function(next) {
  if (!this.isModified("password")) return next();

  this.password = await bcrypt.hash(this.password, 10);

  this.passwordConfirm = undefined;
  next();
});

const User = mongoose.model("User", userSchema);

export default User;
