import { Request, Response } from "express";
import dbOperations from "../../dbOperations";
import common from "../../common";

const getUserFolders = async (req: Request, res: Response) => {
  const { id } = req.user!;
  const {parentId} = req.query as {parentId: string | null};

  const foundUser = await dbOperations.getUserByIdOperation(id);

  if (!foundUser) {
    return res.status(500).send({ message: "Internal Server Error" });
  }

  const folders = await dbOperations.getUserFoldersOperation(id, parentId);

  new common.EntriesFoundHandler(res, "Folders fetched successfully", folders);
};

export default getUserFolders;
