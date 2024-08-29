import { Point } from "geojson";
import { Types } from "mongoose";
import { Species } from "./Species";

type Animal = {
  animal_name: string,
  birthdate: Date;
  species: Types.ObjectId | Species;
  location: Point;
};

export {Animal};
