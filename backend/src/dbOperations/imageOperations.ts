import { FilterQuery, Types } from "mongoose";
import Image, { ImageAttrs } from "../models/imageSchema";
import Folder from "../models/folderSchema";

const uploadImageOperation = async (image: ImageAttrs) => {
  const newImage = await Image.build(image);

  const folderId = newImage.folderId;

  await Folder.findOneAndUpdate(
    { _id: folderId },
    { $push: { images: newImage._id } },
    { new: true }
  );

  return newImage;
};

const getUserImagesOperation = async (
  userId: string | undefined,
  search: string
) => {
  const filterQuery: FilterQuery<ImageAttrs> = {
    postedBy: new Types.ObjectId(userId),
  };

  if (search) {
    filterQuery["name"] = { $regex: search, $options: "i" };
  }

  const images = await Image.find(filterQuery);

  return images;
};

export default {
  uploadImageOperation,
  getUserImagesOperation,
};
