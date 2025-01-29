const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const validator = require("validator");
const crypto = require("crypto"); // For generating reset token

const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      validate: {
        validator: (email) => {
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          return emailRegex.test(email);
        },
        message: "Invalid email format",
      },
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [6, "Password must be at least 6 characters"],
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    isApproved: {
      type: Boolean,
      default: false,
    },
    resetPasswordToken: String, // Store the hashed token for password reset
    resetPasswordExpires: Date, // Expiry time for reset token
  },
  { timestamps: true }
);

// Static signup method
userSchema.statics.signup = async function (email, password) {
  try {
    if (!email || !password) {
      throw new Error("All fields are required");
    }
    if (!validator.isEmail(email)) {
      throw new Error("Invalid email format");
    }
    if (!validator.isStrongPassword(password)) {
      throw new Error("Password not strong enough");
    }

    // Check if user already exists
    const exists = await this.findOne({ email });
    if (exists) {
      throw new Error("A user with this email already exists");
    }

    // Hash password
    const salt = await bcrypt.genSalt(12);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create user
    const user = new this({ email, password: hashedPassword });
    await user.save();
    return user;
  } catch (error) {
    throw new Error(error.message || "Error during signup");
  }
};

// Static login method
userSchema.statics.login = async function (email, password) {
  if (!email || !password) {
    throw new Error("All fields are required");
  }

  const user = await this.findOne({ email });
  if (!user) {
    throw new Error("Incorrect email");
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new Error("Incorrect password");
  }

  return user;
};

// Generate Password Reset Token Method
userSchema.methods.generatePasswordResetToken = function () {
  const resetToken = crypto.randomBytes(32).toString("hex");

  // Hash the token and store it in the database
  this.resetPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  // Set expiration time (e.g., 1 hour)
  this.resetPasswordExpires = Date.now() + 60 * 60 * 1000;

  return resetToken; // Return raw token (not hashed) to send via email
};

// Configure Mongoose settings (optional)
mongoose.set("strictQuery", true);

module.exports = mongoose.model("User", userSchema);
