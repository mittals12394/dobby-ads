import { Request, Response } from "express";
import dbOperations from "../../dbOperations";
import common from "../../common";

const getFolderById = async (req: Request, res: Response) => {
  const folderId = req.query.folderId as string | undefined;
  const { id } = req.user!;

  const userFound = await dbOperations.getUserByIdOperation(id);

  if (!userFound) {
    return res.status(500).send({ message: "Internal Server Error" });
  }

  const folder = await dbOperations.getFolderByIdOperation(folderId, id);

  if (!folder) {
    return res.status(400).send({ message: "No folder found" });
  }

  new common.EntriesFoundHandler(res, "Folder fetched successfully", folder);
};

export default getFolderById;
