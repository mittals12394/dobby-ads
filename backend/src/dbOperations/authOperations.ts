import { Types } from "mongoose";
import User, { UserAttrs } from "../models/userSchema";

const registerUserOperation = async (user: UserAttrs) => {
  const newUser = await User.build(user);

  return newUser;
};

const getUserByEmailOperation = async (email: string) => {
  const user = await User.findOne({ email: email });
  console.log(user);

  return user;
};

const getUserByIdOperation = async (userId: string | undefined) => {
  const user = await User.findById(new Types.ObjectId(userId));

  return user;
};

export default {
  registerUserOperation,
  getUserByEmailOperation,
  getUserByIdOperation,
};
