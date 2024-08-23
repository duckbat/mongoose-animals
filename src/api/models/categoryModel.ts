import mongoose from 'mongoose'
import { Category } from '../../types/Category'

const categorySchema = new mongoose.Schema<Category>({
  category_name: {
    type: String,
    require: true,
    unique: true,
    minlength: 2,
  }

})


export default mongoose.model<Category>('Category', categorySchema);
