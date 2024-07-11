import multer, { FileFilterCallback } from "multer";
import multerS3 from "multer-s3";
import path from "path";
import { Request, Response, NextFunction } from "express";
import s3 from "../config/s3Client";

function uploadFile(storagePath: string) {
  return multer({
    // storage: storage,
    fileFilter: (
      req: Request,
      file: Express.MulterS3.File,
      cb: FileFilterCallback
    ) => {
      const fileExts = [".jpg", ".jpeg", ".png"];
      const isAllowedExt = fileExts.includes(
        path.extname(file.originalname).toLowerCase()
      );
      const isAllowedMimeType = file.mimetype.startsWith("image/");
      if (isAllowedExt && isAllowedMimeType) {
        return cb(null, true);
      } else {
        cb(new Error("Only images are allowed"));
      }
    },
    limits: {
      fileSize: 1024 * 1024 * 5, // 5MB
    },
  });
}

const uploadFileMiddleware = (storagePath: string) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    uploadFile(storagePath).single("image")(req, res, function (err) {
      if (err) {
        next(res.status(400).send({message: "Bad request error"}));
      }
      next();
    });
  };
};



// export default {
//   uploadFileMiddleware,
// };
