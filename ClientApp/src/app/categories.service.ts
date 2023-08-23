import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Category } from './data/category';

@Injectable()
export class CategoriesService {
  private baseUrl: string;

  constructor(private restClient: HttpClient,
    @Inject('BASE_URL') baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  getAllCategories(): Promise<Category[]> {
    return this.restClient.get<Category[]>(this.baseUrl + 'api/categories').toPromise();
  }

}
