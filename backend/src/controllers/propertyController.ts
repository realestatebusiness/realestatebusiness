import { Request, Response } from "express";
import VillaPropertyModel from "../schema/propertySchema";
import { imagekit } from "../config/imageKit";
import { Messages } from "../utils/constants";

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

    if (!media || !Array.isArray(media)) {
      res.status(400).json({ message: Messages.Invalid_Images_Format });
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

    res.status(201).json({
      message: Messages.Property_Creation_Success,
      data: savedProperty
    });
  } catch (error: any) {
    console.error("Create Property Error:", error.message);
    res.status(500).json({
      message: Messages.Property_Creation_Failed,
      error: error.message || Messages.Internal_Server_Error
    });
  }
};


