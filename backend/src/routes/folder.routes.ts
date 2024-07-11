import express from "express";
const router = express.Router();
import { body, query } from "express-validator";
import controller from "../controllers/folders";
import middlewares from "../middlewares";

router.get(
    "/folder-by-id",
    middlewares.requireAuth,
    [
        // query("folderId").notEmpty().withMessage("Id is required"),
        // query("folderId").isMongoId().withMessage("Invalid id"),
    ],
    middlewares.validateRequest,
    controller.getFolderById
);

router.post(
    "/create-folder",
    middlewares.requireAuth,
    [
        body("name").notEmpty().withMessage("name is required"),
    ],
    middlewares.validateRequest,
    controller.createFolder
);

router.get(
    "/folders",
    middlewares.requireAuth,
    controller.getUserFolders
);


export default router;