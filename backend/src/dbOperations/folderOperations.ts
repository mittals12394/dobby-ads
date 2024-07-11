import { Types } from "mongoose";
import Folder, { FolderAttrs } from "../models/folderSchema";

const createFolderOperation = async (folder: FolderAttrs) => {
  const newFolder = await Folder.build(folder);

  const parent = folder.parent;

  if (parent) {
    await Folder.findByIdAndUpdate(
      new Types.ObjectId(parent),
      { $push: { children: newFolder._id } },
      { new: true }
    );
  }

  return newFolder;
};

const getFolderByIdOperation = async (folderId: string | undefined, id: string) => {

  let folder;

  if(folderId){
    folder = await Folder.findById(new Types.ObjectId(folderId)).populate(
      "images"
    ).populate("children");
  }
  else{
    folder = await Folder.findOne({createdBy: id}).populate("children").populate("images");
  }

  return folder;
};

const getUserFoldersOperation = async (
  userId: string,
  parentId: string | null
) => {
  const filterQuery: any = {
    createdBy: new Types.ObjectId(userId),
  };

  if (parentId) {
    filterQuery.parent = parentId;
  }
  const folders = Folder.find(filterQuery)
    .populate("images")
    .populate("children");

  return folders;
};

export default {
  createFolderOperation,
  getFolderByIdOperation,
  getUserFoldersOperation,
};
