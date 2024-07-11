import express, { Request, Response } from 'express';
import { body, query } from 'express-validator';
import controller from '../controllers/images';
import middlewares from '../middlewares';
import multer from 'multer';

const router = express.Router();



const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'src/uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});




const upload = multer({ storage });

router.post(
  '/upload-image',
  middlewares.requireAuth,
  upload.single("image"),
  [
    body('name').notEmpty().withMessage('Name is required'),
  ],
  middlewares.validateRequest,
  controller.uploadImage
);

router.get(
  '/get-user-images',
  middlewares.requireAuth,
  [
    query('search').optional(),
  ],
  middlewares.validateRequest,
  controller.getUserImages
);

export default router;
