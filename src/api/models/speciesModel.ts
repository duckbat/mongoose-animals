import mongoose from "mongoose";
import { Species } from "../../types/Species";

const speciesSchema = new mongoose.Schema<Species>({
  species_name: {
    type: String,
    require: true,
    unique: true,
    minlength: 2,
}
});


export default mongoose.model<Species>("Species", speciesSchema);
