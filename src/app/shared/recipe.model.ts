import { UploadImage } from './uploadImage.model';
import { Ingredient } from './ingredient.model';
export class Recipe {
  constructor(
    public name: string,
    public description: string,
    public images: UploadImage[],
    public ingredients: Ingredient[]) { }
}
