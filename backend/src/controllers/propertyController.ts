import { Request, Response } from "express";
import VillaPropertyModel from "../schema/propertySchema";
import { imagekit } from "../config/imageKit";
import { Messages } from "../utils/constants";
import { failResponse, successResponse } from "../utils/response";
import { StatusCode } from "../utils/statusCode";

const uploadMediaFile = async (file: string, index: number) => {
  const isImage = file.startsWith("data:image/");
  const isVideo = file.startsWith("data:video/");
  const folder = isImage ? "/property_images" : isVideo ? "/property_videos" : null;

  if (!folder) throw new Error(Messages.Invalid_Images_Format);

  const result = await imagekit.upload({
    file,
    fileName: `property_media_${Date.now()}_${index}`,
    folder,
  });

  return {
    url: result.url,
    fileId: result.fileId,
    type: isImage ? "image" : "video"
  };
};

export const createProperty = async (req: Request, res: Response): Promise<void> => {
  try {
    const {
      userId,
      userName,
      userEmail,
      basicDetails,
      locationDetails,
      propertyProfile,
      plotDetails,
      media,
      amenities
    } = req.body;
console.log('req.body',req.body)
    if (!media || !Array.isArray(media)) {
      failResponse(res,Messages.Invalid_Images_Format,StatusCode.Bad_Request)
      return;
    }

    const uploadedMedia = await Promise.all(media.map(uploadMediaFile));

    const newProperty = new VillaPropertyModel({
      userId,
      userName,
      userEmail,
      basicDetails,
      locationDetails,
      propertyProfile,
      plotDetails,
      media: uploadedMedia,
      amenities
    });

    const savedProperty = await newProperty.save();

    successResponse(res,{data:savedProperty},Messages.Property_Creation_Success,StatusCode.Created)

  } catch (error: any) {
    console.error("Create Property Error:", error.message);
    failResponse(res,Messages.Property_Creation_Failed,StatusCode.Internal_Server_Error)
    
  }
};


export const getAllProperties=async(req:Request,res:Response):Promise<void>=>{

  try{
    const properties= await VillaPropertyModel.find();
    successResponse(res,{data:properties},Messages.Property_Fetching_Success,StatusCode.OK)

  }catch(error){
    console.log(error)
    failResponse(res,Messages.Property_Fetching_Fail,StatusCode.Internal_Server_Error)
  }
}