import {Types} from 'mongoose'
import {Point} from 'geojson'

type Species = {
  species_name: string;
  image: string;
  category: Types.ObjectId;
  location: Point
}

export {Species}
