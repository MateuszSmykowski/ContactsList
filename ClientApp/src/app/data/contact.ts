import { Category } from "./category";
import { Subcategory } from "./subcategory";

export class Contact {
  id!: number;
  firstName!: string;
  lastName!: string;
  email!: string;
  category!: Category;
  subcategory!: Subcategory;
  phoneNumber!: string;
  dateOfBirth!: string;
}

export class ContactToSave {
  id!: number;
  firstName!: string;
  lastName!: string;
  email!: string;
  categoryId!: number;
  subcategoryId!: number;
  phoneNumber!: string;
  dateOfBirth!: string;
}
