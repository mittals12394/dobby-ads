import mongoose, { ObjectId, Schema } from "mongoose";
import { Types } from "mongoose";

export interface ImageAttrs {
  name: string;
  image: string;
  postedBy: string;
  folderId: string;
}

interface ImageModel extends mongoose.Model<ImageDoc> {
  build(attrs: ImageAttrs): ImageDoc;
}

interface ImageDoc extends mongoose.Document {
  _id: ObjectId;
  name: String;
  image: String;
  postedBy: ObjectId;
  folderId: ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const imageSchema = new mongoose.Schema<ImageDoc>({
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  postedBy: {
    type: Schema.Types.ObjectId,
    ref: "users",
    required: true,
  },
  folderId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "folders",
    required: true,
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

imageSchema.statics.build = async (attrs: ImageAttrs) => {
  const { postedBy, folderId } = attrs;
  const image = new Image({
    ...attrs,
    postedBy: new Types.ObjectId(postedBy),
    folderId: new Types.ObjectId(folderId),
  });
  await image.save();
  return image;
};

const Image = mongoose.model<ImageDoc, ImageModel>("images", imageSchema);

export default Image;
