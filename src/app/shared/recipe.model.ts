import { UploadedImage } from './uploadedImage.model';
import { Ingredient } from './ingredient.model';
export class Recipe {
  constructor(
    public name: string,
    public description: string,
    public images: UploadedImage[],
    public ingredients: Ingredient[],
    public imageURL?: string) { }
}
