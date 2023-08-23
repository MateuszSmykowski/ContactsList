import { Category } from "./category";

export class Subcategory {
  id!: number;
  subcategoryName!: string;
  category!: Category;
}

export class SubcategoryToSave {
  id!: number;
  subcategoryName!: string;
  categoryId!: number;
}
