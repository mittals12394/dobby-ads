import security from "../../security";
import _ from "lodash";
import common from "../../common";
import dbOperations from "../../dbOperations";
import { Request, Response } from "express";

const login = async (req: Request, res: Response) => {
  const password: string = req.body.password;
  const email: string = _.toLower(req.body.email);

  const foundUser = await dbOperations.getUserByEmailOperation(email);

  if (!foundUser) {
    return res.status(404).send({message: "Invalid Credentials"});
  }

  const decryptedPassword: boolean = await security.Decrypt(
    password,
    foundUser.password
  );
  if (decryptedPassword) {
    const token = foundUser.generateToken();
    token


    new common.ActionSuccessHandler(res, "User logged in successfully", {
      user: {
        id: foundUser._id,
        name: foundUser.name,
        email: foundUser.email,
        createdAt: foundUser.createdAt,
        token,
      }
    });
  } else {
    return res.status(404).send({message: "Invalid Credentials"});
  }
};

export default login;
