import {NextFunction, Request, Response} from 'express';
import AnimalModel from '../models/animalModel';
import {Animal} from '../../types/Animal';
import {MessageResponse} from '../../types/Messages';
import CustomError from '../../classes/CustomError';

type DBMessageResponse = MessageResponse & {
  data: Animal | Animal[];
};

// Creating animal
const postAnimal = async (
  req: Request<{}, {}, Animal>,
  res: Response<DBMessageResponse>,
  next: NextFunction,
) => {
  try {
    const newAnimal = new AnimalModel(req.body);
    const savedAnimal = await newAnimal.save();

    res.status(201).json({
      message: 'Animal created',
      data: savedAnimal,
    });
  } catch (error) {
    next(new CustomError((error as Error).message, 500));
  }
};


// Getting all animals
const getAnimal = async (
  req: Request,
  res: Response<Animal[]>,
  next: NextFunction,
) => {
  try {
    const species = await AnimalModel.find();

    res.json(species);
  } catch (error) {
    next(new CustomError((error as Error).message, 500));
  }
};


// Getting single animal
const getSingleAnimal = async (
  req: Request<{id: string}>,
  res: Response<Animal>,
  next: NextFunction,
) => {
  try {
    const species = await AnimalModel.findById(req.params.id);

    if (!species) {
      throw new CustomError('Animal not found', 404);
    }

    res.json(species);
  } catch (error) {
    next(new CustomError((error as Error).message, 500));
  }
};


// Updating animal
const putAnimal = async (
  req: Request<{id: string}, {}, Animal>,
  res: Response<DBMessageResponse>,
  next: NextFunction,
) => {
  try {
    const updatedAnimal = await AnimalModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      {new: true},
    );

    if (!updatedAnimal) {
      throw new CustomError('Animal not found', 404);
    }

    res.json({
      message: 'Animal updated',
      data: updatedAnimal,
    });
  } catch (error) {
    next(new CustomError((error as Error).message, 500));
  }
};


// Deleting animal
const deleteAnimal = async (
  req: Request<{id: string}>,
  res: Response<DBMessageResponse>,
  next: NextFunction,
) => {
  try {
    const deletedAnimal = await AnimalModel.findByIdAndDelete(req.params.id);

    if (!deletedAnimal) {
      throw new CustomError('Animal not found', 404);
    }

    res.json({
      message: 'Animal deleted',
      data: deletedAnimal,
    });
  } catch (error) {
    next(new CustomError((error as Error).message, 500));
  }
};


// Getting animals by box (coordinates)
const getAnimalsByBox = async (
  req: Request<{}, {}, {}, {topRight: string; bottomLeft: string}>,
  res: Response<Animal[]>,
  next: NextFunction,
) => {
  try {
    const {topRight, bottomLeft} = req.query;

    const animals = await AnimalModel.find({
      location: {
        $geoWithin: {
          $box: [topRight.split(','), bottomLeft.split(',')],
        },
      },
    });

    res.json(animals);
  } catch (error) {
    next(new CustomError((error as Error).message, 500));
  }
};


// Getting animals by species
const getAnimalBySpecies = async (
  req: Request<{species: string}>,
  res: Response<Animal[]>,
  next: NextFunction,
) => {
  try {
    const {species} = req.params;

    const animals = await AnimalModel.find({ species: species });

    if (!animals.length){
      return next(new CustomError('Animals not found', 404));
    }

    res.status(200).json(animals);
  } catch (error) {
    next(new CustomError((error as Error).message, 500));
  }
}

export {
  postAnimal,
  getAnimal,
  getSingleAnimal,
  putAnimal,
  deleteAnimal,
  getAnimalsByBox,
  getAnimalBySpecies,
};
