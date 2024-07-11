import common from "../../common";
import dbOperations from "../../dbOperations";
import { Request, Response } from "express";
import security from "../../security";
import _ from "lodash";

const register = async (req: Request, res: Response) => {
  const { name, password } = req.body;
  const email: string = _.toLower(req.body.email);

  const foundClient = await dbOperations.getUserByEmailOperation(email);

  if (foundClient) {
    return res.status(400).send({ message: "Email Id already exists." });
  } else {
    const encryptedPassword: string = await security.Encrypt(password);
    const client: any = {
      name,
      email,
      password: encryptedPassword,
    };

    const newClient = await dbOperations.registerUserOperation(client);

    const newFolder = {
      name: "main",
      parent: null,
      createdBy: newClient._id.toString(),
      children: [],
      images: [],
    };
  
    const folder = await dbOperations.createFolderOperation(newFolder);
  
    if (!folder) {
      return res.status(500).send({message: "Internal Server Error"});
    }

    new common.ActionSuccessHandler(res, "User registered successfully", {
      user: _.omit(newClient.toObject(), ["password"]),
    });
  }
};

export default register;
