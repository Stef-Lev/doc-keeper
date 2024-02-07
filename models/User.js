import { Schema, model, models } from "mongoose";
import bcrypt from "bcrypt";

const UserSchema = new Schema(
  {
    username: { type: String, required: true },
    password: { type: String, required: true },
    confirmPassword: {
      type: String,
      validate: {
        validator: function (el) {
          return el === this.password;
        },
        message: "Passwords don't match.",
      },
    },
    documents: [{ type: Schema.Types.ObjectId, ref: "Doc" }],
  },
  {
    minimize: false,
  }
);

UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  this.password = await bcrypt.hash(this.password, 12);
  this.confirmPassword = undefined;
  if (!this.documents || this.documents.length === 0) {
    this.documents = [];
  }
  next();
});

UserSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

UserSchema.methods.changePassword = async function (oldPassword, newPassword) {
  const isCorrectPassword = await this.correctPassword(
    oldPassword,
    this.password
  );
  if (!isCorrectPassword) {
    throw new Error("Incorrect old password");
  }

  const hashedPassword = await bcrypt.hash(newPassword, 12);
  this.password = hashedPassword;
  await this.save();
};

const User = models.User || model("User", UserSchema);
export default User;
