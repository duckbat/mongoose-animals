import {model, Schema} from 'mongoose';
import {Animal} from '../../types/Animal';

const animalSchema = new Schema<Animal>({
  animal_name: {type: String, required: true, unique: true, minlength: 2},
  species: {
    type: Schema.Types.ObjectId,
    ref: 'Species',
    required: true,
  },
  birthdate: {
    type: Date,
    required: true,
    max: Date.now(),
  },
  location: {
    type: {
      type: String,
      enum: ['Point'],
      required: true,
    },
    coordinates: {
      type: [Number],
      required: true,
    },
  },
});

export default model<Animal>('Animal', animalSchema);
