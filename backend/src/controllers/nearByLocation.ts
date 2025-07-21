import express, { Request, Response } from 'express';

import { failResponse, successResponse } from "../utils/response";
import { Messages } from "../utils/constants";
import { StatusCode } from "../utils/statusCode";
import VillaPropertyModel from "../schema/propertySchema";


const nearByLocation = async (req: Request, res: Response): Promise<void> => {
  const lat = req.query.lat as string;
  const lng = req.query.lng as string;
  console.log('lat and lng',lat,lng);

  if (!lat || !lng) {
    failResponse(res, Messages.Coordinates_Missing, StatusCode.Bad_Request);
    return;
  }

  try {
    const latitude = parseFloat(lat);
    const longitude = parseFloat(lng);

    const properties = await VillaPropertyModel.find({
      location: {
        $nearSphere: {
          $geometry: {
            type: "Point",
            coordinates: [longitude, latitude], // [lng, lat]
          },
          $maxDistance: 5000, // 5km
        },
      },
    });

    successResponse(res, properties, Messages.Fetching_Location_Success, StatusCode.OK);
  } catch (error) {
    console.error("Geo search error:", error);
    failResponse(res, Messages.Fetching_Location_Failure, StatusCode.Internal_Server_Error);
  }
};

export { nearByLocation };