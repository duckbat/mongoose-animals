import { NextFunction, Request, Response } from "express";
import CustomError from "../../classes/CustomError";
import { MessageResponse } from "../../types/Messages";


//TODO: Fix Speciels controller
type DBMessageResponse = MessageResponse & {
  data: object;
}

const getSpecies = async(
  req: Request<{id: string}>,
  res: Response<DBMessageResponse>,
  next: NextFunction,
) => {
  try {
    const species = await species.findById(req.params.id);

    if (!species) {
      throw new CustomError('Species not found', 404);
    }

    res.json({
      message: 'Species fetched successfully',
      data: species,
    });
  } catch (error) {
    next(new CustomError((error as Error).message, 500));
  }
};


const postSpecies = async(
  req: Request<{}, {}, Species>,
  res: Response<DBMessageResponse>,
  next: NextFunction,
) => {
  try {
    const species = new speciesModel(req.body);
    await species.save();

    res.json({
      message: 'Species created successfully',
      data: species,
    });
  }
}
