import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ContactsService {
  private baseUrl: string;

  constructor(private restClient: HttpClient,
    @Inject('BASE_URL') baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  getAllContacts(): Promise<object[]> {
    return this.restClient.get<object[]>(this.baseUrl + 'api/contacts').toPromise();
  }
}
