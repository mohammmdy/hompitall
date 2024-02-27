const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
// const { bool } = require("sharp");

const userSchema = new mongoose.Schema(
  {
    userName: {
      type: String,
      trim: true,
      required: [true, "name required"],
    },
    slug: {
      type: String,
      lowercase: true,
    },
    email: {
      type: String,
      required: [true, "email required"],
      unique: true,
      lowercase: true,
    },
    phone: String,

    password: {
      type: String,
      required: [true, "password required"],
      minlength: [6, "too short password"],
    },
    passwordResetCode: String,
    passwordResetExpires: Date,
    passwordResetVerefied: Boolean,
    passwordChangedAt: Date,
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    birthdate: Date,
    gender: String,
    age: Number,
    active: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next(); //lw passwoerd mt3dl4 mtd5l4 fe meddlware de
  //Hashing password
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

const User = mongoose.model("User", userSchema);

module.exports = User;
