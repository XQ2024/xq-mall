import { compare, hash } from "bcrypt";
import { Document, Schema, model } from "mongoose";
import validator from "validator";

interface IUser extends Document {
  email: string;
  password: string;
  isAdmin: boolean;
  comparePassword: (password: string) => boolean;
}

const userSchema = new Schema<IUser>(
  {
    email: {
      type: String,
      required: true,
      validate: validator.default.isEmail,
    },
    password: {
      type: String,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function (this: IUser, next) {
  if (!this.isModified("password")) {
    return next();
  }
  this.password = await hash(this.password, 10);
  return next();
});

userSchema.methods.comparePassword = async function (
  candidatePassword: string
) {
  return await compare(candidatePassword, this.password);
};

export const User = model<IUser>("User", userSchema);
