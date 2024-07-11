import { Application } from "express";
import authRoutes from "./auth.routes";
import imageRoutes from "./image.routes";
import folderRoutes from "./folder.routes";

export default (app: Application) => {
  app.use("/auth", authRoutes);
  app.use("/image", imageRoutes);
  app.use("/folder", folderRoutes);

  app.use("*", (_req, _res) => {
    return _res.status(404).send({message: "Not found error"});
  });
};
