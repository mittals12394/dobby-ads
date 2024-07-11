import { Request, Response } from "express";
import common from "../../common";
import dbOperations from "../../dbOperations";
import { ImageAttrs } from "../../models/imageSchema";

const uploadImage = async (req: Request, res: Response) => {
  const { name, folderId } =
    req.body as ImageAttrs;

    const {id} = req.user!;
  
    if(!req.file){
      return res.status(400).send({message: "No image uploaded"});
    }

    if(!folderId){
      return res.status(400).send({message: "You can only upload image inside a folder"});
    }
  

  const user = await dbOperations.getUserByIdOperation(id);

  if(!user){
    
    return res.status(500).send({message: "Internal Server Error"});
  }

  const image = req.file.filename;

  console.log(req.file);
  

  const newImage = {
    name,
    image,
    postedBy: id,
    folderId: folderId,
  };

  const uploadedImage = await dbOperations.uploadImageOperation(newImage);

  if (!uploadedImage) {
    return res.status(500).send({message: "Internal Server Error"});
  }


  new common.ActionSuccessHandler(
    res,
    "Image uploaded successfully",
    { uploadedImage },
    true,
    201
  );
};

export default uploadImage;
