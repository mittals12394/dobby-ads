import mongoose, { ObjectId, Schema } from "mongoose";
import { Types } from "mongoose";

export interface FolderAttrs {
  name: string;
  parent: string | null;
  createdBy: string;
  children: Array<string>;
  images: Array<string>;
}

interface FolderModel extends mongoose.Model<FolderDoc> {
  build(attrs: FolderAttrs): FolderDoc;
}

interface FolderDoc extends mongoose.Document {
  _id: ObjectId;
  name: String;
  parent: ObjectId | null;
  createdBy: ObjectId;
  children: Array<ObjectId>;
  images: Array<ObjectId>;
  createdAt: Date;
  updatedAt: Date;
}

const folderSchema = new mongoose.Schema<FolderDoc>({
  name: {
    type: String,
    required: true,
  },
  parent: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "folders",
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: true,
  },
  children: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "folders",
    default: [],
    required: true,
  },
  images: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "images",
    default: [],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

folderSchema.statics.build = async (attrs: FolderAttrs) => {
  const { parent, createdBy, children, images } = attrs;
  const folder = new Folder({
    ...attrs,
    parent: parent ? new Types.ObjectId(parent) : null,
    createdBy: new Types.ObjectId(createdBy),
    children: children.map((child) => new Types.ObjectId(child)),
    images: images.map((image) => new Types.ObjectId(image)),
  });
  await folder.save();
  return folder;
};

const Folder = mongoose.model<FolderDoc, FolderModel>("folders", folderSchema);

export default Folder;
