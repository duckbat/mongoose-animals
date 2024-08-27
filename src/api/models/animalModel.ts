import mongoose from "mongoose";
import { Animal } from "../../types/Animal";

const animalSchema = new mongoose.Schema<Animal>({
  animal_name: {
    type: String,
    require: true,
    unique: true,
    minlength: 2,
  },
});

export default mongoose.model<Animal>("Animal", animalSchema);
