const mongoose = require("mongoose");
const validate = require("validator");

const { Schema } = mongoose;

const RegisterSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error("Enter a valid email");
        }
      },
    },
    password: {
      type: String,
      required: true,
      trim: true,
      validate(value) {
        if (value.length < 6) {
          throw new Error("Enter a strong password");
        }
      },
    },
  },
  {
    timestamps: true,
  }
);

const Register = mongoose.model("Register", RegisterSchema);

module.exports = Register;
