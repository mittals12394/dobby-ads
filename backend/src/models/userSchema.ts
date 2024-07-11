import mongoose, { ObjectId } from "mongoose";
import security from "../security";

export interface UserAttrs {
  name: string;
  email: string;
  password: string;
}

interface UserModel extends mongoose.Model<UserDoc> {
  build(attrs: UserAttrs): UserDoc;
}

interface UserDoc extends mongoose.Document {
  _id: ObjectId;
  name: string;
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
  generateToken(): string;
}

const userSchema = new mongoose.Schema<UserDoc>(
  {
    name: {
      type: String,
      default: "",
    },
    email: {
      type: String,
    },
    password: {
        type: String,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    versionKey: false,
  }
);

userSchema.statics.build = async (attrs: UserAttrs) => {
  const user = new User(attrs);
  await user.save();
  return user;
};

userSchema.methods.generateToken = function () {
  const token = security.getToken({
    id: this._id,
    name: this.name,
    email: this.email,
  });
  return token;
};

const User = mongoose.model<UserDoc, UserModel>("users", userSchema);

export default User;
