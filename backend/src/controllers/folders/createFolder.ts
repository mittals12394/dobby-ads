import { Request, Response } from "express";
import common from "../../common";
import dbOperations from "../../dbOperations";
import { FolderAttrs } from "../../models/folderSchema";

const createFolder = async (req: Request, res: Response) => {
  const { name, parent } =
    req.body as FolderAttrs;
  const { id } = req.user!;

  const user = await dbOperations.getUserByIdOperation(id);

  if(!user){
    return res.status(500).send({message: "Internal Server Error"});
  }

  const newFolder = {
    name,
    parent,
    createdBy: id,
    children: [],
    images: [],
  };

  const folder = await dbOperations.createFolderOperation(newFolder);

  if (!folder) {
    return res.status(500).send({message: "Internal Server Error"});
  }


  new common.ActionSuccessHandler(
    res,
    "Folder created successfully",
    { folder },
    true,
    201
  );
};

export default createFolder;
