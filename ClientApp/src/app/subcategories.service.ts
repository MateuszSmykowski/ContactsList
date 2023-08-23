import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subcategory, SubcategoryToSave } from './data/subcategory';

@Injectable()
export class SubcategoriesService {
  private baseUrl: string;

  constructor(private restClient: HttpClient,
    @Inject('BASE_URL') baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  getAllCategories(): Promise<Subcategory[]> {
    return this.restClient.get<Subcategory[]>(this.baseUrl + 'api/subcategories').toPromise();
  }

  addSubcategory(newSubcategoryData: SubcategoryToSave) {
    return this.restClient.post(this.baseUrl + 'api/subcategories/create', newSubcategoryData);
  }
}
