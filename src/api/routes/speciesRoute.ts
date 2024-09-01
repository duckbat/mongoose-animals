import express from 'express';
import {
  deleteSpecies,
  getSingleSpecies,
  getSpecies,
  getSpeciesByArea,
  postSpecies,
  putSpecies,
} from '../controllers/speciesControllet';
import {addImageToSpecies} from '../../middlewares';

const router = express.Router();

router.route('/').post(addImageToSpecies, postSpecies).get(getSpecies);

router.route('/area').get(getSpeciesByArea);

router
  .route('/:id')
  .get(getSingleSpecies)
  .put(putSpecies)
  .get(getSpeciesByArea)
  .delete(deleteSpecies);

export default router;
