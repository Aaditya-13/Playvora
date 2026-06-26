import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import env from "../config/env.js";
import { BCRYPT_SALT_ROUNDS } from "../constants/auth.constants.js";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      minlength: 3,
      maxlength: 30,
    },

    fullName: {
      type: String,
      required: true,
      trim: true,
      minlength: 1,
      maxlength: 50,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },

    password: {
      type: String,
      required: [true, "Password is Required"],
      select: false,
      minLength: 6,
      maxLength: 30
    },

    avatar: {

      url: {
        type: String,
        default: "",
      },

      publicId: {
        type: String,
        default: "",
      },

    },

    bio: {
      type: String,
      default: "",
      maxlength: 300,
    },

    favouriteSports: [
      {
        type: String,
      },
    ],

    reliabilityScore: {
      type: Number,
      default: 100,
    },

    matchesJoined: {
      type: Number,
      default: 0,
    },

    matchesAttended: {
      type: Number,
      default: 0,
    },

    isVerified: {
      type: Boolean,
      default: false,
    },

    isGuest: {
      type: Boolean,
      default: false,
    },

    authProvider: {
      type: String,
      enum: ["local", "google"],
      default: "local",
    },

    refreshToken: {
      type: String,
      select: false
    },

    expireAt: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);


userSchema.index({ expireAt: 1 }, { expireAfterSeconds: 0 });

// for password hashing only when password modified
userSchema.pre("save", async function () {
  if (!this.isModified("password")) return;

  this.password = await bcrypt.hash(this.password, BCRYPT_SALT_ROUNDS);

});

// check if password correct
userSchema.methods.isPasswordCorrect = async function (password) {
  return await bcrypt.compare(password, this.password);
};

// access token
userSchema.methods.generateAccessToken = function () {
  return jwt.sign(
    {
      _id: this._id,
      email: this.email,
      username: this.username,
    },
    env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: env.ACCESS_TOKEN_EXPIRY,
    }
  );
};

// refresh token
userSchema.methods.generateRefreshToken = function () {
  return jwt.sign(
    {
      _id: this._id,
    },
    env.REFRESH_TOKEN_SECRET,
    {
      expiresIn: env.REFRESH_TOKEN_EXPIRY,
    }
  );
};



const User = mongoose.model("User", userSchema);

export default User;