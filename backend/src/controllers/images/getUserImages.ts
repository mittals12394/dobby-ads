import { Request, Response } from "express";
import common from "../../common";
import dbOperations from "../../dbOperations";

const getUserImages = async (req: Request, res: Response) => {
  const { search } = req.query as { search: string };
  const {id} = req.user!;

  const userFound = await dbOperations.getUserByIdOperation(id);

  if (!userFound) {
    return res.status(500).send({ message: "Internal Server Error" });
  }

  const images = await dbOperations.getUserImagesOperation(id, search);

  new common.EntriesFoundHandler(res, "Images found successfully", images);
};

export default getUserImages;
